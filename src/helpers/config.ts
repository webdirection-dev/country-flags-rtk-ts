const BASE_URL = 'https://restcountries.com/v2/';

export const ALL_COUNTRIES = BASE_URL + 'all?fields=name,capital,flags,population,region';

export const searchByCountry = (name: string) => BASE_URL + 'name/' + name;

export const filterByCode = (codes: string[]) => BASE_URL + 'alpha?codes=' + codes.join(',');

export type ApiTypes = {
    ALL_COUNTRIES: string;
    searchByCountry: (name: string) => string;
    filterByCode: (codes: string[]) => string;
}
