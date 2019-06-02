import React, { FC, MouseEventHandler, ReactElement } from "react";
import classNames from 'classnames'

import { MenuItemStrict } from "../../definitions/types";
import Menu from "../Menu";
import style from './style.module.scss';


type Props = {
    cfg: MenuItemStrict,
    menuShow: boolean,
    onClick: MouseEventHandler
}


const NestedMenuItem: FC<Props> = (props: Props): ReactElement => {
    const { cfg: { title, items }, menuShow, onClick } = props;

    return (
        <div className={classNames(
            'dropdown dropright dropdown-item',
            style.nestedMenuItem,
            { show: menuShow }
        )}>
            <a
                className="dropdown-item dropdown-toggle"
                href="#"
                onClick={onClick}
            >
                {title}
            </a>
            { menuShow && <Menu items={items} show={menuShow}/>}
        </div>
    )
};

export default NestedMenuItem;