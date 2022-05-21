import React from "react"
import {NavigateFunction} from 'react-router-dom'

import {useDetails} from "./customHooks/use-details"
import {Info} from "./Info"

interface IDetails {
    name: string;
    navigate: NavigateFunction;
}

const CountryDetails: React.FC<IDetails> = ({name = '', navigate}) => {
    const {status, error, currentCountry} = useDetails(name)


    return(
        <>
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>{error}</h2>}
            {currentCountry && <Info push={navigate} {...currentCountry} />}
        </>
    )
}

export default CountryDetails