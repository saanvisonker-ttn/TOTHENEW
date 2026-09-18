const MOBILE_PROJECTS = new Set([
    'local-iphone',
    'local-android',
    'local-ipad',
    'iphone',
    'android',
    'ipad'
]);

export function isMobileProject(projectName: string): boolean {
    return MOBILE_PROJECTS.has(projectName);
}
