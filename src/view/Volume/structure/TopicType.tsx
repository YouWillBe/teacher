import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
`
const Type = styled.span<{ bgColor: string }>`
    display: inline-block;
    width: 36px;
    height: 36px;
    background-color: ${props => props.bgColor};
    border-radius: 50%;
    line-height: 36px;
    color: rgba(255, 255, 255, 1);
`
const TopicTypeNumber = styled.span<{ color: string }>`
    width: 36px;
    height: 30px;
    margin-top: 10px;
    color: ${props => props.color};
`

interface IProps {
    data: {
        text: string
        count: number
    }
    option: {
        bgColor: string
        color: string
    }
}

function TopicType(props: IProps) {
    return (
        <Container>
            <Type bgColor={props.option.bgColor}>{props.data.text}</Type>
            <TopicTypeNumber color={props.option.color}>{props.data.count}</TopicTypeNumber>
        </Container>
    )
}

export default TopicType
