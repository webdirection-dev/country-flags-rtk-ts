import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const loadCountries = createAsyncThunk(
    '@@countries/load-countries',

    async (
        _,
        {
            extra: {client, api},
            rejectWithValue
        }
    ) => {

        try {
            return await client.get(api.ALL_COUNTRIES)
                .then(({data}) => data)
                .catch(err => err.message)
        } catch (e) {
            return rejectWithValue({e})
        }
    }
)

const initialState = {
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
                    state.list = action.payload
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
                    state.error = action.payload || action.meta.error
                }
            )
    },
})

// export const {setCountries, setLoading, setError} = countriesSlice.actions
export const countriesReducer = countriesSlice.reducer

//selectors
export const selectCountriesInfo = (state) => ({
    status: state.countries.status,
    error: state.countries.error,
    qty: state.countries.list.length
})

export const selectAllCountries = (state) => state.countries.list

export const selectVisibleCountries = (state, {search = '', region = ''}) => {
    return state.countries.list
        .filter(i => {
            return(
                i.name.toLowerCase().includes(search.toLowerCase())
                &&
                i.region.includes(region)
            )
        })
}