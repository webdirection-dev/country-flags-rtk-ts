import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {RootState} from "../../store";

type controlsState = {
    search: string;
    region: string;
}

const initialState: controlsState = {
    search: '',
    region: ''
}
const controlsSlice = createSlice({
    name: '@@controls',
    initialState,

    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },

        setRegion: (state, action: PayloadAction<string>) => {
            state.region = action.payload
        },

        clearControls: () => initialState
    },
})

export const {setSearch, setRegion, clearControls} = controlsSlice.actions
export const controlsReducer = controlsSlice.reducer

//selectors
export const selectSearch = (state: RootState) => state.controls.search
export const selectRegion = (state: RootState) => state.controls.region
export const selectControls = (state: RootState) => state.controls