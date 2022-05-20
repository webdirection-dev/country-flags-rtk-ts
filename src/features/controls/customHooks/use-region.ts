import {useAppDispatch, useAppSelector} from "../../../helpers/hook";
import {selectRegion, setRegion} from "../controls-slice"

export const useRegion = () => {
    const dispatch = useAppDispatch()
    const region = useAppSelector(selectRegion)

    const handleSelect = (reg: {value: string}) => {
        dispatch(setRegion(reg?.value || ''))
    }

    return [region, handleSelect]
}