import React, { FC } from 'react'
import styled from '@emotion/styled'

import Spinner from '../Spinner'

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
    color: #00a6f3;
`

const Loading: FC = () => {
    return (
        <Container>
            <Spinner/>
            <Text>loading ...</Text>
        </Container>
    )
}

export default Loading
