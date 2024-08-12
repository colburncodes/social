import {Card, Group, Kbd, Stack, Title} from "@mantine/core";
import React from "react";
import {shortcuts, specialKeys} from "~/src/core/components/shortcuts/shortcut-list";
import {groupBy} from "@chevrotain/utils";
import {Shortcut} from "~/src/shortcuts/types";
import {find} from "lodash";

const ShortcutKeys: React.FC<{ keys: string[]}> = ({ keys }) => {
    return (
        <Group>
            {keys.map((key) => {
                const isSpecialKey = find(specialKeys, (sk) => sk.key === key);
                if (isSpecialKey) {
                    return <Kbd key={key}>{isSpecialKey.mac}</Kbd>
                }
                return <Kbd key={key}>{key}</Kbd>
            })}
        </Group>
    )
}

const ShortcutView = ({ shortcut }) => {
    return (
        <Group>
            <ShortcutKeys keys={shortcut.keys}/>
            <div>{shortcut.name}</div>
        </Group>
    )
}

const ShortcutList: React.FC<{ shortcuts: Shortcut[]}> = ({ shortcuts }) => {
    return(
        <Group>
            {shortcuts.map(shortcut => (
                <ShortcutView key={shortcut.name} shortcut={shortcut} />
            ))}
        </Group>
    );
}

const ShortcutGroup: React.FC<{
    title: string;
    shortcuts: Shortcut[]
}> = ({ title, shortcuts  }) => {
    return (
        <Stack>
            <Title order={3}>{title}</Title>
            <ShortcutList shortcuts={shortcuts}/>
        </Stack>
    )
}

export const Shortcuts: React.FC<{}> = () =>{
    const { global = [], local = [] } = groupBy(shortcuts, s => s.isGlobal ? 'global' : 'local');
    return(
        <Stack ml={10}>
            <ShortcutGroup title={"Global"} shortcuts={global}/>
            <ShortcutGroup title={"Local"} shortcuts={local}/>
        </Stack>
    )
}