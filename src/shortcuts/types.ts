export enum ShortcutId {
    ToggleDarkTheme,
    ToggleBlogPosts,
    ToggleSpotlight,
    PrintThingie
}

export type Shortcut = {
    keys: string[];
    name: string;
    description: string;
    isGlobal: boolean;
    id: ShortcutId;
}

export type SpecialKey = {
    key: string;
    name: string;
    mac: string;
    windows: string
}