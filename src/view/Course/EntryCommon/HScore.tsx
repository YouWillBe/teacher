import React, { FC } from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
`
const Left = styled.span`
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 600;
    color: #333;
`
const Right = styled.span<{ Color: string }>`
    font-size: 32px;
    font-family: PingFangSC;
    font-weight: 600;
    text-align: center;
    color: ${props => props.Color};
`
interface IParams {
    data: {
        name: string
        score: number
        Color: string
    }
}
const HScore: FC<IParams> = props => {
    return (
        <Container>
            <Left>{props.data.name}</Left>
            <Right Color={props.data.Color}>{props.data.score}</Right>
        </Container>
    )
}

export default HScore
