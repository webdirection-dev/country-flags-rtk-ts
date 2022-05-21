import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {RootState} from "../../store";

import {AxiosStatic} from "axios"
import {ApiTypes} from "../../helpers/config"

type CountriesExtra = {
    api: ApiTypes;
    client: AxiosStatic;
}

export type CountryTypes = {
    capital: string;
    flags: { svg: string, png: string };
    independent: boolean;
    name: string;
    population: number;
    region: string;
}

type CountriesState = {
    status: string;
    error: null | string;
    list: CountryTypes[];
}

export const loadCountries = createAsyncThunk<CountryTypes[], undefined, {extra: CountriesExtra, rejectValue: string}>(
    '@@countries/load-countries',

    async (
        _,
        {
            extra: {client, api},
            rejectWithValue
        }
    ) => {
        return await client.get(api.ALL_COUNTRIES)
            .then(({data}) => {
                return data
            })
            .catch(err => {
                return rejectWithValue(err.message)
            })
    }
)

const initialState: CountriesState = {
    status: 'idle', // loading | received | rejected
    error: null,
    list: [],
}

const countriesSlice = createSlice({
    name: '@@countries',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(
                loadCountries.fulfilled,
                (state, action) => {
                    state.status = 'received'
                    state.list = action.payload!
                }
            )

            .addCase(
                loadCountries.pending,
                (state) => {
                    state.status = 'loading'
                    state.error = null
                }
            )

            .addCase(
                loadCountries.rejected,
                (state, action) => {
                    state.status = 'rejected'
                    if (typeof action.payload === 'string') state.error = action.payload
                    // state.error = action.payload || action.meta.error
                }
            )
    },
})

// export const {setCountries, setLoading, setError} = countriesSlice.actions
export const countriesReducer = countriesSlice.reducer

//selectors
export const selectCountriesInfo = (state: RootState) => ({
    status: state.countries.status,
    error: state.countries.error,
    qty: state.countries.list.length
})

export const selectAllCountries = (state: RootState) => state.countries.list

export const selectVisibleCountries = (state: RootState, {search = '', region = ''}) => {
    return state.countries.list
        .filter(i => {
            return(
                i.name.toLowerCase().includes(search.toLowerCase())
                &&
                i.region.includes(region)
            )
        })
}