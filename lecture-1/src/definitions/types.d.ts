export type MenuItem = (string | {
    title: string,
    items?: MenuList
});

export type MenuItemStrict = {
    title: string,
    items: MenuListStrict
};

export type MenuListStrict = Array<(MenuItem)>;

export type MenuList = (MenuListStrict | null);