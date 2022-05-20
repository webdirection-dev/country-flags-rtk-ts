import {createSlice, PayloadAction} from "@reduxjs/toolkit"

const themeSlice = createSlice({
    name: '@@theme',
    initialState: 'light',

    reducers: {
        setTheme: (_, action: PayloadAction<string>) => action.payload
    },
})

export const {setTheme} = themeSlice.actions
export const themeReducer = themeSlice.reducer