import React, { Component, MouseEventHandler, ReactNode } from "react";
import classNames from 'classnames';

import { MenuItem, MenuList } from "../definitions/types";
import NestedMenuItem from "./NestedMenuItem";


type Props = {
    items: MenuList,
    show: boolean
}

type State = {
    menuId: (string | null)
}


class Menu extends Component<Props,State> {
    state = { menuId: null };

    handleOnClick: MouseEventHandler = (event): void => {
        const title: (string | null) = event.currentTarget.textContent;

        this.setState(({ menuId }: State): State => {
            const id = menuId === title ? null : title;

            return { menuId: id };

        });
    };

    render(): ReactNode {
        const { items, show } = this.props;
        const { menuId } = this.state;

        return (
            <div className={classNames(
                'dropdown-menu',
                { show: show }
            )}>
                { items && items.map((item: MenuItem) => {
                    const typeofItem: string = typeof item;
                    // @ts-ignore
                    const title: string = typeofItem !== 'string' ? item.title : item;

                    // @ts-ignore
                    return typeofItem === 'object' && Array.isArray(item.items) && item.items.length
                        ? <NestedMenuItem
                            key={title}
                            // @ts-ignore
                            cfg={item}
                            menuShow={menuId === title}
                            onClick={this.handleOnClick}
                          />
                        : <a
                            key={title}
                            className="dropdown-item"
                            href="#"
                            onClick={this.handleOnClick}
                          >
                            {title}
                          </a>;

                })}
            </div>
        )
    }
}

export default Menu;