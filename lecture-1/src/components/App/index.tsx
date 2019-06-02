import React, { ReactElement } from 'react';

import ToolBarButton from "../ToolBarButton";
import style from './style.module.scss';

import { menuConfig } from '../../constants/menu'


const App: React.FC = (): ReactElement => (
    <div className={style.container}>
        <div className={style.innerContainer}>
            <div className={style.content}>
                <header className={style.header}>
                    <ToolBarButton menuItems={menuConfig} />
                </header>
                <div className={style.content} />
            </div>
        </div>
    </div>
);

export default App;