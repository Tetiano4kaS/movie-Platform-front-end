import React from 'react';
import Switch from "react-switch";

import {useAppDispatch, useAppSelector} from "../../hooks/useHooks";
import {themeActions} from "../../redux/slices/themeSlice";

const ThemeSwitcher = () => {
    const dispatch = useAppDispatch();
    const {theme} = useAppSelector(state => state.theme)
    return (
        <div>
            <Switch
                onChange={() => dispatch(themeActions.changeTheme({}))}
                checked={theme}
                offColor="#bbb"
                onColor="#000"
                offHandleColor="#fff"
                onHandleColor="#fff"
                uncheckedIcon={false}
                checkedIcon={false}
                className="react-switch"

            />
        </div>
    );
};

export default ThemeSwitcher;
