import React from "react"
import styled from 'styled-components'
import { Container } from './Container'

const Wrapper = styled.main`
  padding: 2rem 0;

  @media (min-width: 767px) {
    padding: 4rem 0;
  }
`;

interface IMain {
    children: React.ReactNode
}

export const Main: React.FC<IMain> = ({ children }) => {
    return (
        <Wrapper>
            <Container>{children}</Container>
        </Wrapper>
    );
};
