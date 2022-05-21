import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {RootState} from "../../store";

import {AxiosStatic} from "axios"
import {ApiTypes} from "../../helpers/config"

type DetailsExtra = {
    api: ApiTypes;
    client: AxiosStatic;
}

type NeighborTypes = string

export type CurrentCountryTypes = {
    name: string;
    nativeName: string;
    flag: string;
    capital: string;
    population: number;
    region: string;
    subregion: string;
    topLevelDomain: string[];
    currencies: [{code: string, name: string, symbol: string}];
    languages: [{name: string}];
    borders: never[];
} | null

type DetailsState = {
    currentCountry: CurrentCountryTypes;
    neighbors: NeighborTypes[];
    status: string;
    error: null | string;
}

export const loadCountryByName = createAsyncThunk<CurrentCountryTypes, string, {extra: DetailsExtra, rejectValue: string}>(
    '@@details/load-country-by-name',

    async (
        name,
        {
            extra: {client, api},
            rejectWithValue,
        }
    ) => {
        return await client.get(api.searchByCountry(name))
            .then(({data}) => data[0])
            .catch(err => {
                return rejectWithValue(err.message)
            })
    }

)

export const loadNeighborsByBorders = createAsyncThunk<NeighborTypes[], string[], {extra: DetailsExtra, rejectValue: string}>(
    '@@details/load-neighbors',

    async (
        borders,
        {
            extra: {client, api},
            rejectWithValue,
        }
    ) => {
        return await client.get(api.filterByCode(borders))
            .then(({data}) => {
                return data.map((i: {name: string}) => i.name)
            })
            .catch(err => {
                return rejectWithValue(err.message)
            })
    }
)

const initialState: DetailsState = {
    currentCountry: null,
    neighbors: [],
    status: 'idle', // loading | received | rejected
    error: null,
}

const detailsSlice = createSlice({
    name: '@@details',
    initialState,

    reducers: {
        clearDetails: () => initialState
    },

    extraReducers: (builder) => {
        builder
            .addCase(
                loadCountryByName.fulfilled,
                (state, action) => {
                    state.status = 'received'
                    state.currentCountry = action.payload
                }
            )
            .addCase(
                loadCountryByName.pending,
                (state) => {
                    state.status = 'loading'
                    state.error = null
                }
            )
            .addCase(
                loadCountryByName.rejected,
                (state, action) => {
                    state.status = 'rejected'
                    if (typeof action.payload === 'string') state.error = action.payload
                    // state.error = action.payload || action.meta.error
                }
            )

            .addCase(
                loadNeighborsByBorders.fulfilled,
                (state, action) => {
                    state.neighbors = action.payload
                }
            )
    },
})

export const detailsReducer = detailsSlice.reducer
export const {clearDetails} = detailsSlice.actions

//selectors
export const selectCurrentCountry = (state: RootState) => state.details.currentCountry
export const selectDetails = (state: RootState) => state.details
export const selectNeighbors = (state: RootState) => state.details.neighbors