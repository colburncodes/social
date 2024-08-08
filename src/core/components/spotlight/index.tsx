import { Button } from '@mantine/core';
import { Spotlight, spotlight } from '@mantine/spotlight';
import { IconSearch, IconHome, IconDashboard, IconFileText } from '@tabler/icons-react';
import { rem } from '@mantine/core';

export function SpotlightWrapper({ children }) {
    const actions = [
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
            description: 'Visit documentation to learn more about all features',
            onClick: () => console.log('Documentation'),
            leftSection: <IconFileText style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
        },
    ];

    return (
        <>
            <Spotlight
                actions={actions}
                highlightQuery
                searchProps={{
                    leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
                    placeholder: "Search...",
                }}
                shortcut="mod + K"
            />
            <Button onClick={() => spotlight.open()}>Open Spotlight</Button>
            {children}
        </>
    );
}