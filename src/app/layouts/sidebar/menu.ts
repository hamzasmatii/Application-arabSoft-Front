import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        badge: {
            variant: 'info',
            text: 'MENUITEMS.DASHBOARDS.BADGE',
        },
        subItems: [
            {
                id: 3,
                label: 'SERVICE',
                link: '/dashboard',
                parentId: 2
            },
            {
                id: 4,
                label: 'Chef service',
                link: '/dashboards/chefdequipe',
                parentId: 2
            },
            {
                id: 5,
                label: 'EMPLOYE',
                link: '/dashboards/employe',
                parentId: 2
            },
            
        ]
    },
    {
        id: 6,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        badge: {
            variant: 'info',
            text: 'MENUITEMS.DASHBOARDS.BADGE',
        },
        subItems: [
            {
                id: 7,
                label: 'Profile',
                link: '/dashboard',
                parentId: 6
            },
            {
                id: 8,
                label: 'Service',
                link: '/dashboards/chefdequipe',
                parentId: 6
            },
            
        ]
    },

    {
        id: 10,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        badge: {
            variant: 'info',
            text: 'MENUITEMS.DASHBOARDS.BADGE',
        },
        subItems: [
            {
                id: 11,
                label: 'Profile',
                link: '/dashboard',
                parentId: 10
            },
           
            
        ]
    },
    
];

