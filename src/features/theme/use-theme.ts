import {useAppDispatch, useAppSelector} from "../../helpers/hook";
import {useEffect} from "react"

import {setTheme} from "./theme-slice"

export const useTheme = () => {
    const dispatch = useAppDispatch()
    const {theme} = useAppSelector(state => state)

    const toggleTheme = () => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    // return [theme]
    return [theme, toggleTheme]
}