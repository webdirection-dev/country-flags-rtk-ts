import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../helpers/hook";
import {loadNeighborsByBorders, selectNeighbors} from "../details-slice";

export const useNeighbors = (borders = []) => {
    const dispatch = useAppDispatch()
    const neighbors = useAppSelector(selectNeighbors)

    useEffect(() => {
        if (borders.length) dispatch(loadNeighborsByBorders(borders))
    }, [borders, dispatch])

    return neighbors
}