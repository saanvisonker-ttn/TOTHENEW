import fs from 'fs';
import path from 'path';
import type { Page, TestInfo } from '@playwright/test';

const OVERLAY_ID = 'pw-visual-state';

function sanitizeFileName(value: string): string {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 80);
}

export function isVisualDebugEnabled(testInfo: TestInfo): boolean {
    return process.env.VISUAL_DEBUG === 'true' || testInfo.project.name === 'local-chrome';
}

async function renderOverlay(page: Page, label: string): Promise<void> {
    await page.evaluate(({ overlayId, text }) => {
        const root = document.body ?? document.documentElement;
        if (!root) {
            return;
        }

        let overlay = document.getElementById(overlayId);

        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = overlayId;
            overlay.style.cssText = [
                'position: fixed',
                'top: 12px',
                'left: 12px',
                'z-index: 2147483647',
                'max-width: min(520px, calc(100vw - 24px))',
                'padding: 10px 14px',
                'background: rgba(17, 24, 39, 0.92)',
                'color: #ffffff',
                'font: 600 14px/1.4 Segoe UI, sans-serif',
                'border-radius: 8px',
                'box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35)',
                'pointer-events: none',
                'white-space: pre-wrap'
            ].join(';');
            root.appendChild(overlay);
        }

        overlay.textContent = text;
    }, { overlayId: OVERLAY_ID, text: label });
}

async function captureStepScreenshot(
    page: Page,
    label: string,
    testInfo: TestInfo,
    stepIndex: number
): Promise<void> {
    const screenshotDir = path.join(testInfo.outputDir, 'visual-state');
    fs.mkdirSync(screenshotDir, { recursive: true });

    const screenshotPath = path.join(
        screenshotDir,
        `${String(stepIndex).padStart(2, '0')}-${sanitizeFileName(label)}.png`
    );

    await page.screenshot({ path: screenshotPath, fullPage: false });
    await testInfo.attach(`visual:${label}`, {
        path: screenshotPath,
        contentType: 'image/png'
    });
}

export async function showVisualStep(
    page: Page,
    label: string,
    testInfo: TestInfo,
    stepIndex: number
): Promise<void> {
    if (!isVisualDebugEnabled(testInfo)) {
        return;
    }

    const timestamp = new Date().toLocaleTimeString();
    const overlayLabel = `[${timestamp}] ${label}`;

    try {
        if (!page.isClosed()) {
            await renderOverlay(page, overlayLabel);
        }
    } catch {
        // Skip overlay while the page is navigating or reloading.
    }

    if (process.env.VISUAL_DEBUG === 'true') {
        await captureStepScreenshot(page, label, testInfo, stepIndex);
    }
}

const HIGHLIGHT_LAYER_ID = 'pw-visual-highlights';

export async function clearElementHighlights(page: Page): Promise<void> {
    try {
        if (page.isClosed()) {
            return;
        }

        await page.evaluate((layerId) => {
            document.getElementById(layerId)?.remove();
        }, HIGHLIGHT_LAYER_ID);
    } catch {
        // Ignore highlight cleanup failures during navigation.
    }
}

export async function highlightElements(
    page: Page,
    boxes: Array<{ x: number; y: number; width: number; height: number; label: string }>
): Promise<void> {
    await page.evaluate(
        ({ layerId, boxes: highlightBoxes }) => {
            const root = document.body ?? document.documentElement;
            if (!root) {
                return;
            }

            let layer = document.getElementById(layerId);
            if (!layer) {
                layer = document.createElement('div');
                layer.id = layerId;
                layer.style.cssText = [
                    'position: fixed',
                    'inset: 0',
                    'z-index: 2147483646',
                    'pointer-events: none'
                ].join(';');
                root.appendChild(layer);
            }

            layer.innerHTML = '';

            for (const box of highlightBoxes) {
                if (box.width <= 0 || box.height <= 0) {
                    continue;
                }

                const outline = document.createElement('div');
                outline.style.cssText = [
                    'position: fixed',
                    `top: ${Math.max(0, box.y - 4)}px`,
                    `left: ${Math.max(0, box.x - 4)}px`,
                    `width: ${box.width + 8}px`,
                    `height: ${box.height + 8}px`,
                    'border: 3px solid #22d3ee',
                    'border-radius: 10px',
                    'box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.35), 0 8px 24px rgba(0, 0, 0, 0.25)',
                    'background: rgba(34, 211, 238, 0.08)',
                    'box-sizing: border-box'
                ].join(';');

                const tag = document.createElement('div');
                tag.textContent = box.label;
                tag.style.cssText = [
                    'position: absolute',
                    'top: -28px',
                    'left: 0',
                    'padding: 4px 8px',
                    'background: rgba(17, 24, 39, 0.92)',
                    'color: #22d3ee',
                    'font: 600 12px/1 Segoe UI, sans-serif',
                    'border-radius: 6px',
                    'white-space: nowrap'
                ].join(';');

                outline.appendChild(tag);
                layer.appendChild(outline);
            }
        },
        { layerId: HIGHLIGHT_LAYER_ID, boxes }
    );
}
