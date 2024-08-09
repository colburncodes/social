import {Shortcut, ShortcutId} from "~/src/shortcuts/types";


export const shortcuts: Shortcut[] = [
    {
        keys: [],
        name: "Toggle Dark Theme",
        description: "Toggle the dark theme on and off",
        isGlobal: true,
        id: ShortcutId.ToggleDarkTheme
    },
    {
        keys: [],
        name: "Toggle Blog Posts",
        description: "Toggle the blog posts on and off",
        isGlobal: false,
        id: ShortcutId.ToggleBlogPosts
    },
    {
        keys: [],
        name: "Print",
        description: "Print current page",
        isGlobal: true,
        id: ShortcutId.PrintThingie
    },
    {
        keys: [],
        name: "Toggle Spotlight",
        description: "Toggle the spotlight search",
        isGlobal: true,
        id: ShortcutId.ToggleSpotlight
    },
]