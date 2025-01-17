import React from 'react';
import {Outlet} from "react-router-dom";
import cn from "classnames";

import {useAppSelector} from "../hooks/useHooks";
import HeaderComponent from "../components/Header/HeaderComponent";
import styles from "./MainLayout.module.css"

const MainLayout = () => {
    const {theme} = useAppSelector(state => state.theme)
    return (

        <div className={cn(styles.container, {
            [styles.container_dark!]: theme
        })}>
            <HeaderComponent/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;
