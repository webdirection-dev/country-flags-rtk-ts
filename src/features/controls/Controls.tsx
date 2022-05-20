import React, {FC} from "react";

import {useRegion} from "./customHooks/use-region"
import styled from 'styled-components'

import { Search } from './Search'
import { CustomSelect } from './CustomSelect'

interface IRegion {
    value: string;
    label: string;
}

interface IOptionMap {
    [key: string]: IRegion
}

const optionsMap: IOptionMap = {
  'Africa': { value: 'Africa', label: 'Africa' },
  'America': { value: 'America', label: 'America' },
  'Asia': { value: 'Asia', label: 'Asia' },
  'Europe': { value: 'Europe', label: 'Europe' },
  'Oceania': { value: 'Oceania', label: 'Oceania' },
}
const options = Object.values(optionsMap);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 767px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

export const Controls: FC = () => {
    const [region, handleSelect] = useRegion()

    const handleControls = (e: IRegion) => {
        if (typeof handleSelect === 'function') {
            handleSelect(e)
        }
    }

    return (
        <Wrapper>
            <Search />

            <CustomSelect
                options={options}
                placeholder="Filter by Region"
                isClearable
                isSearchable={false}
                value={region !== '' ? optionsMap[region as string] : ''}
                onChange={(e) => handleControls(e as IRegion)}
            />

        </Wrapper>
    );
};
