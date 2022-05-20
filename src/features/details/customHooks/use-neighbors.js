import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadNeighborsByBorders, selectNeighbors} from "../details-slice";

export const useNeighbors = (borders = []) => {
    const dispatch = useDispatch()
    const neighbors = useSelector(selectNeighbors)

    useEffect(() => {
        if (borders.length) dispatch(loadNeighborsByBorders(borders))
    }, [borders, dispatch])

    return neighbors
}