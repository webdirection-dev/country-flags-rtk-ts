import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectControls} from "../controls/controls-slice";
import {loadCountries, selectCountriesInfo, selectVisibleCountries} from "./countries-slice";

export const useCountries = () => {
    const dispatch = useDispatch()

    const controls = useSelector(selectControls)
    const countries = useSelector(state => selectVisibleCountries(state, controls))
    const {status, error, qty} = useSelector(selectCountriesInfo)


    useEffect(() => {
        if (!qty) dispatch(loadCountries())
    }, [dispatch, qty])

    return [countries, {status, error}]
}