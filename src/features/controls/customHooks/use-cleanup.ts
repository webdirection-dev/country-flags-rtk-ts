import {useAppDispatch} from "../../../helpers/hook";

import {clearControls} from "../controls-slice";

export const useCleanup = () => {
    const dispatch = useAppDispatch()
    return () => dispatch(clearControls())
}