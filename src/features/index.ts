import {combineReducers} from "@reduxjs/toolkit"

import {themeReducer} from "./theme/theme-slice"
import {controlsReducer} from "./controls/controls-slice"
import {countriesReducer} from "./countries/countries-slice"
import {detailsReducer} from "./details/details-slice"

export const rootReducer = combineReducers({
    theme: themeReducer,
    controls: controlsReducer,
    countries: countriesReducer,
    details: detailsReducer,
})