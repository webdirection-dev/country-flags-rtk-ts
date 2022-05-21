import { useNavigate } from 'react-router-dom'
import {useCountries} from "./use-countries"

import {Card} from "../../components/Card"
import {List} from "../../components/List"

export interface ICountryInfo {
    img: string;
    name: string;
    info: [
        {
            title: string;
            description: string;
        },
        {
            title: string;
            description: string;
        },
        {
            title: string;
            description: string;
        },
    ],
}

const CountryList = () => {
    const navigate = useNavigate()
    const [countries, status, error] = useCountries()

    return(
        <>
            {error && <h2>Can't fetch data: {error as string}</h2>}
            {status === 'loading' && <h2>Loading...</h2>}

            {status === 'received' && (
                <List>
                    {
                        typeof countries === 'object' && countries !== null &&
                        countries.map((c: any) => {
                        const countryInfo: ICountryInfo = {
                            img: c.flags.png,
                            name: c.name,
                            info: [
                                {
                                    title: 'Population',
                                    description: c.population.toLocaleString(),
                                },
                                {
                                    title: 'Region',
                                    description: c.region,
                                },
                                {
                                    title: 'Capital',
                                    description: c.capital,
                                },
                            ],
                        };

                        return (
                            <Card
                                key={c.name}
                                onClick={() => navigate(`/country/${c.name}`)}
                                {...countryInfo}
                            />
                        );
                    })}
                </List>
            )}
        </>
    )
}

export default CountryList