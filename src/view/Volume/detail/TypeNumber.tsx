import React, { FC } from 'react'
import styled from 'styled-components'

interface IOption {
    bgColor: string
    color: string
    border: string
}

const Container = styled.div<{ option: IOption }>`
    box-sizing: border-box;
    width: 36px;
    height: 36px;
    background-color: ${props => props.option.bgColor || '#fff'};
    border: 1px solid ${props => props.option.border || 'rgba(20, 78, 94, 1)'};
    border-radius: 50%;
    text-align: center;
    line-height: 34px;
    color: ${props => props.option.color || '#fff'};
    cursor: pointer;
`

interface IProps {
    data: {
        text: string
    }
    option: IOption
}

const TypeNumber: FC<IProps> = props => {
    return <Container option={props.option}>{props.data.text}</Container>
}

export default TypeNumber
