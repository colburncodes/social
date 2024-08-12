import {Shortcut, ShortcutId} from "~/src/shortcuts/types";

export const specialKeys = {
    mod: {
        key: 'mod',
        name: 'Command',
        mac: "⌘",
        windows: "Ctrl"
    },
    shift: {
        key: 'shift',
        name: 'Shift',
        mac: "⇧",
        windows: "Shift"
    },
    alt: {
        key: 'alt',
        name: 'Option',
        mac: '⌥',
        windows: 'Alt'
    },
    ctrl: {
        key: 'ctrl',
        name: 'Control',
        mac: '⌃',
        windows: 'Ctrl'
    }
}


export const shortcuts: Shortcut[] = [
    {
        keys: [specialKeys.mod.key, 'X'],
        name: "Toggle Dark Theme",
        description: "Toggle the dark theme on and off",
        isGlobal: true,
        id: ShortcutId.ToggleDarkTheme
    },
    {
        keys: [specialKeys.mod.key, 'J'],
        name: "Toggle Blog Posts",
        description: "Toggle the blog posts on and off",
        isGlobal: false,
        id: ShortcutId.ToggleBlogPosts
    },
    {
        keys: [specialKeys.mod.key, 'P'],
        name: "Print",
        description: "Print current page",
        isGlobal: true,
        id: ShortcutId.PrintThingie
    },
    {
        keys: [specialKeys.mod.key, 'S'],
        name: "Toggle Spotlight",
        description: "Toggle the spotlight search",
        isGlobal: false,
        id: ShortcutId.ToggleSpotlight
    },
]

export const getShortcutKeys = (shortcutId: ShortcutId) => {
    const shortcut = shortcuts.find((s) => s.id === shortcutId);
    if (!shortcut) return '';
    return shortcut.keys.join('+');
}