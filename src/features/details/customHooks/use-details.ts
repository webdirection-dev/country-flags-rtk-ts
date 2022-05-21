import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../helpers/hook";

import {clearDetails, loadCountryByName, selectDetails} from "../details-slice";

export const useDetails = (name: string) => {
    const dispatch = useAppDispatch()
    const details = useAppSelector(selectDetails);

    useEffect(() => {
        dispatch(loadCountryByName(name))
        return () => {
            //componentDidUnmount
            dispatch(clearDetails())
        }
    }, [dispatch, name])

    return details
}