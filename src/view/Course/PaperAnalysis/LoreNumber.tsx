import React, { FC } from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
    height: 50%;
`
const Text = styled.div`
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
`
const NumberWrap = styled.div`
    width: 100%;
    height: 76px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const LoreCount = styled.span<{ setColor: string }>`
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC, sans-serif;
    font-weight: 600;
    color: ${props => props.setColor};
`
const TypeText = styled.span<{ setColor: string }>`
    display: inline-block;
    width: 30px;
    text-align: center;
    font-size: ${props => (props.setColor === '个' ? '14px' : '20px')};
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    color: ${props =>
        props.setColor === '个' ? 'rgba(153, 153, 153, 1)' : props.setColor === '%' ? '#ED5083' : '#3A93DF'};
`

interface IProps {
    data: {
        text: string
        loreCount: number
        typeText: string
        setColor: string
    }
}

const LoreNumber: FC<IProps> = props => {
    return (
        <Container>
            <Text>{props.data.text}</Text>
            <NumberWrap>
                <LoreCount setColor={props.data.setColor}>{props.data.loreCount}</LoreCount>
                <TypeText setColor={props.data.typeText}>{props.data.typeText}</TypeText>
            </NumberWrap>
        </Container>
    )
}

export default LoreNumber
