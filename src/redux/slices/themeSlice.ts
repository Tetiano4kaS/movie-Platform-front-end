import {createSlice} from "@reduxjs/toolkit";

type themeType = {
    theme: boolean
}
const initialState: themeType = {
    theme: !!JSON.parse(localStorage.getItem('theme'))
}

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        changeTheme(state, action) {
            state.theme = !state.theme
            localStorage.setItem('theme', `${state.theme}`)
        }
    }
})

const {reducer: themeReducer, actions} = themeSlice;

const {changeTheme} = actions;

const themeActions = {...actions}

export {themeReducer, themeActions}