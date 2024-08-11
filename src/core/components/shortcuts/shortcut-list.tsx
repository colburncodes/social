import {Shortcut, ShortcutId} from "~/src/shortcuts/types";

export const shortcuts: Shortcut[] = [
    {
        keys: ['mod', 'X'],
        name: "Toggle Dark Theme",
        description: "Toggle the dark theme on and off",
        isGlobal: true,
        id: ShortcutId.ToggleDarkTheme
    },
    {
        keys: ['mod', 'J'],
        name: "Toggle Blog Posts",
        description: "Toggle the blog posts on and off",
        isGlobal: false,
        id: ShortcutId.ToggleBlogPosts
    },
    {
        keys: ['mod', 'P'],
        name: "Print",
        description: "Print current page",
        isGlobal: true,
        id: ShortcutId.PrintThingie
    },
    {
        keys: ['mod', 'S'],
        name: "Toggle Spotlight",
        description: "Toggle the spotlight search",
        isGlobal: true,
        id: ShortcutId.ToggleSpotlight
    },
]

export const getShortcutKeys = (shortcutId: ShortcutId) => {
    const shortcut = shortcuts.find((s) => s.id === shortcutId);
    if (!shortcut) return '';
    return shortcut.keys.join('+');
}