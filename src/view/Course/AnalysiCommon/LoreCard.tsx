import React, { FC } from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
    height: 50%;
`
const Text = styled.div`
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
`
const NumberWrap = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const LoreCount = styled.span<{ setColor: string }>`
    font-size: 36px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: ${props => props.setColor};
`
const TypeText = styled.span`
    display: inline-block;
    width: 30px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
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
                <TypeText>{props.data.typeText}</TypeText>
            </NumberWrap>
        </Container>
    )
}

export default LoreNumber
