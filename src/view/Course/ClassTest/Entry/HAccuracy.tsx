import React, { FC } from 'react'
import styled from '@emotion/styled'
import { useObserver } from 'mobx-react-lite'

const Container = styled.div`
    width: 100%;
    height: 34px;
    line-height: 34px;
    display: flex;
    justify-content: space-between;
`
const Left = styled.span<{ Color: string }>`
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 600;
    color: ${props => props.Color};
`
const Right = styled.span<{ Color: string }>`
    width: 60px;
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 600;
    text-align: center;
    color: ${props => props.Color};
`
interface IParams {
    data: {
        name: string
        people: string | number
        Color: string
        Color1: string
    }
}
const HAccuracy: FC<IParams> = props => {
    return useObserver(() => {
        return (
            <Container>
                <Left Color={props.data.Color}>{props.data.name}</Left>
                <Right Color={props.data.Color1}>{props.data.people}</Right>
            </Container>
        )
    })
}

export default HAccuracy
