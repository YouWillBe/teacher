import React, { FC } from 'react'
import styled from '@emotion/styled'

const Input = styled.div``

const Label = styled.label<{ isToggle: boolean }>`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    background-color: ${props => (props.isToggle ? '#072979' : 'rgba(0, 0, 0, 0.25)')};
    border-radius: 20px;
    transition: all 0.3s;
    cursor: pointer;
    & ::after {
        content: '';
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius: 18px;
        top: 1px;
        left: 1px;
        transition: all 0.3s;
        transform: ${props => (props.isToggle ? 'translateX(20px)' : 'translateX(0px)')};
        background-color: #fff;
    }
`

interface IProps {
    isToggle: boolean
    onClickToggle(): void
}

const Toggle: FC<IProps> = props => {
    return (
        <>
            <Input></Input>
            <Label isToggle={props.isToggle} onClick={props.onClickToggle}></Label>
        </>
    )
}

export default Toggle
