import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

export const loadCountryByName = createAsyncThunk(
    '@@details/load-country-by-name',

    async (
        name,
        {
            extra: {client, api},
            rejectedWithValue,
        }
    ) => {
        try {
            return await client.get(api.searchByCountry(name))
                .then(({data}) => data[0])
        } catch (e) {
            rejectedWithValue(e.message)
        }
    }

)

export const loadNeighborsByBorders = createAsyncThunk(
    '@@details/load-neighbors',

    async (
        borders,
        {
            extra: {client, api},
            rejectedWithValue,
        }
    ) => {
        try {
            return await client.get(api.filterByCode(borders))
                .then(({data}) => data.map(i => i.name))
        } catch (e) {
            rejectedWithValue(e.message)
        }
    }
)

const initialState = {
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
                    state.error = action.payload || action.meta.error
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
export const selectCurrentCountry = state => state.details.currentCountry
export const selectDetails = state => state.details
export const selectNeighbors = state => state.details.neighbors