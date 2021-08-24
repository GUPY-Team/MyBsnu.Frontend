interface Breakpoints {
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
    readonly xl: string;
}

export const AppBreakpoints: Breakpoints = {
    sm: '(min-width: 600px)',
    md: '(min-width: 960px)',
    lg: '(min-width: 1280px)',
    xl: '(min-width: 1920px)'
};
