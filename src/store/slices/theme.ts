import { createSlice } from '@reduxjs/toolkit';

export type ThemeState = {
    theme: 'dark' | 'light';
}

const initialState: ThemeState = {
    theme: 'light'
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, { payload }) => {
            state.theme = payload;
        },
    },
});
export const { setTheme } = themeSlice.actions;
export const authReducer = themeSlice.reducer;