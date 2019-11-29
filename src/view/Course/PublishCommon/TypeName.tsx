import React, { FC } from 'react'
import styled from '@emotion/styled'
import { FiHelpCircle } from 'react-icons/fi'

import Toggle from '../../../components/Toggle'

const TextWrap = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
`
const Text = styled.span`
    font-size: 20px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(7, 41, 121, 1);
    & ::before {
        content: '';
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: #072979;
    }
`
const Type = styled.div`
    display: flex;
    margin-left: 10px;
    svg {
        font-size: 20px;
        color: #9098a8;
        cursor: pointer;
    }
`

interface IProps {
    text: string
    type: string
    isToggle?: boolean
    onClickToggle?(): void
}

const TypeName: FC<IProps> = props => {
    return (
        <TextWrap>
            <Text>{props.text}</Text>
            {props.type === '1' ? (
                <Type>
                    <FiHelpCircle title='帮助'></FiHelpCircle>
                </Type>
            ) : (
                <Type>
                    <Toggle onClickToggle={props.onClickToggle!} isToggle={props.isToggle || false}></Toggle>
                </Type>
            )}
        </TextWrap>
    )
}

export default TypeName
