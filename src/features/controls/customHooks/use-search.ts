import React from "react";

import {useAppDispatch, useAppSelector} from "../../../helpers/hook"
import {selectSearch, setSearch} from "../controls-slice"

export const useSearch = () => {
    const dispatch = useAppDispatch()
    const search = useAppSelector(selectSearch)

    const handleSearch = (e:  React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.target.value))
    }

    return [search, handleSearch]
}