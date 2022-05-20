import {useDetails} from "./customHooks/use-details";
import {Info} from "./Info";

const CountryDetails = ({name = '', navigate}) => {
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