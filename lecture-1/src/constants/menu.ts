import { MenuList } from "../definitions/types";


export const menuConfig: MenuList = [
    { title: 'JavaScript', items: ['Angular', 'React'] },
    { title: 'Dart', items: ['Angular', 'Polymer'] },
    'Menu item #3 (just a string)',
    { title: 'Menu item #4 (no items)'},
    { title: 'Menu item #5 (items = null)', items: null},
    { title: 'Menu item #6 (items = [])', items: []},
    { title: 'Menu item #7', items: [
        { title: 'JavaScript', items: ['Angular', 'React'] },
        { title: 'Dart', items: ['Angular', 'Polymer'] },
        'SubMenu item #3 (just a string)',
        { title: 'SubMenu item #4 (no items)'},
        { title: 'SubMenu item #5 (items = null)', items: null},
        { title: 'SubMenu item #6 (items = [])', items: []},
        { title: 'SubMenu item #7', items: [
            { title: 'JavaScript', items: ['Angular', 'React'] },
            { title: 'Dart', items: ['Angular', 'Polymer'] },
            'SubSubMenu item #3 (just a string)',
            { title: 'SubSubMenu item #4 (no items)'},
            { title: 'SubSubMenu item #5 (items = null)', items: null},
            { title: 'SubSubMenu item #6 (items = [])', items: []}
        ]}
    ]}
];