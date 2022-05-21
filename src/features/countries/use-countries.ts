import {useEffect} from "react"
import {useAppDispatch, useAppSelector} from "../../helpers/hook";
import {selectControls} from "../controls/controls-slice"
import {loadCountries, selectCountriesInfo, selectVisibleCountries} from "./countries-slice"

export const useCountries = () => {
    const dispatch = useAppDispatch()

    const controls = useAppSelector(selectControls)
    const countries = useAppSelector(state => selectVisibleCountries(state, controls))
    const {status, error, qty} = useAppSelector(selectCountriesInfo)

    useEffect(() => {
        if (!qty) dispatch(loadCountries())
    }, [dispatch, qty])

    return [countries, status, error]
}