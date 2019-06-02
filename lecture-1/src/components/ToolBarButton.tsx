import React, { Component, createRef, MouseEventHandler, ReactNode, RefObject } from "react";
import classNames from 'classnames';

import { MenuList } from "../definitions/types";
import Menu from "./Menu";


type Props = {
    menuItems?: MenuList
}

type State = {
    menuShow: boolean
}

class ToolBarButton extends Component<Props, State> {
    state = { menuShow: false };
    toolBarButtonRef: RefObject<HTMLDivElement>  = createRef();

    handleOnClick: MouseEventHandler = (): void => {
        this.setState((state: State): State => ({ menuShow: !state.menuShow }))
    };

    handleDocumentOnClick = (event: Event): void => {
        this.setState((state: State): State => {
            // @ts-ignore
            if (state.menuShow && !this.toolBarButtonRef.current.contains(event.target)) {
                return { menuShow: false }
            }

            return state
        });
    };

    componentDidMount(): void {
        document.addEventListener('click', this.handleDocumentOnClick);
    }

    componentWillUnmount(): void {
        document.removeEventListener('click', this.handleDocumentOnClick);
    }

    render(): ReactNode {
        const { menuItems = null } = this.props;
        const { menuShow } = this.state;
        const menuItemsPresence = menuItems && Array.isArray(menuItems) && menuItems.length;

        return (
            <div ref={this.toolBarButtonRef} className={classNames(
                'dropdown',
                { show: menuShow }
            )}>
                <button
                    className={classNames(
                        'btn btn-primary btn-sm',
                        { ['dropdown-toggle']: menuItemsPresence}
                    )}
                    type="button"
                    disabled={!menuItemsPresence}
                    onClick={this.handleOnClick}
                >
                    Menu
                </button>
                { menuItemsPresence && menuShow && <Menu items={menuItems} show={menuShow}/> }
            </div>
        );
    }
}

export default ToolBarButton;