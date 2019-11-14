import React, { FC } from 'react'
import styled from '@emotion/styled'
import { FaSpinner } from 'react-icons/fa'

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: #999;
    flex-direction: column;
`
const Text = styled.div`
    font-size: 14px;
    margin-top: 30px;
    color: #999;
`

const Loading: FC = () => {
    return (
        <Container>
            <FaSpinner />
            <Text>loading ...</Text>
        </Container>
    )
}

export default Loading
