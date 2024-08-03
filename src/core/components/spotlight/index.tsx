//https://mantine.dev/x/spotlight/
import { rem } from '@mantine/core';
import { Spotlight, SpotlightActionData } from '@mantine/spotlight';
import { IconHome, IconDashboard, IconFileText, IconSearch } from '@tabler/icons-react';
import React from 'react';

const actions: SpotlightActionData[] = [
    {
        id: 'home',
        label: 'Home',
        description: 'Get to home page',
        onClick: () => console.log('Home'),
        leftSection: <IconHome style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
    },
    {
        id: 'dashboard',
        label: 'Dashboard',
        description: 'Get full information about current system status',
        onClick: () => console.log('Dashboard'),
        leftSection: <IconDashboard style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
    },
    {
        id: 'documentation',
        label: 'Documentation',
        description: 'Visit documentation to lean more about all features',
        onClick: () => console.log('Documentation'),
        leftSection: <IconFileText style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
    },
];

export function SpotlightWrapper({ children }) {
    const [query, setQuery] = React.useState('');
    const items = actions
        .filter((item) => item.label?.toLowerCase().includes(query.toLowerCase()))
        .map((item) => <Spotlight.Action />);
    return (
        <>
            <Spotlight.Root
                shortcut="mod + shift + 1"
            >
                <Spotlight.Search
                    placeholder="Search..."
                    leftSection={<IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}/>
                <Spotlight.ActionsList>
                    {children}
                </Spotlight.ActionsList>
            </Spotlight.Root>
        </>
    );
}