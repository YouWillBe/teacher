import React, { FC } from 'react'
import styled from 'styled-components'
import { FaSpinner } from 'react-icons/fa'
import { keyframes } from 'styled-components'

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(359deg);
    }
`

const Container = styled.div`
    height: 40px;
    width: 40px;
    animation: ${spin} 2s infinite linear;
    font-size: 40px;
    color: #00a6f3;
`

const Spinner: FC = () => {
    return (
        <Container>
            <FaSpinner/>
        </Container>
    )
}

export default Spinner
