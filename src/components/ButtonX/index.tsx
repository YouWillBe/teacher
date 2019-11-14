import React, { FC, MouseEvent } from 'react'
import styled from '@emotion/styled'

export const Container = styled.button<{ active: boolean }>`
    height: 24px;
    line-height: 24px;
    position: relative;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    border: 1px solid ${props => (props.active ? '#1890ff' : '#d9d9d9')};
    color: ${props => (props.active ? '#fff' : 'rgba(0, 0, 0, 0.65)')};
    background-color: #fff;
    touch-action: manipulation;
    font-size: 12px;
    border-radius: 4px;
    cursor: pointer;
    outline: none;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    background-color: ${props => (props.active ? '#1890ff' : '#fff')};
    &:hover {
        z-index: 2;
        color: ${props => (props.active ? '#fff' : '#1890ff')};
        background-color: ${props => (props.active ? '#40a9ff' : '#fff')};
        border-color: ${props => (props.active ? '#40a9ff' : '#1890ff')};
    }
`

interface IProps {
    title: string
    active: boolean
    onClick(event: MouseEvent): void
}

const Button: FC<IProps> = props => {
    return (
        <Container title={props.title} onMouseDown={props.onClick} active={props.active}>
            {props.children}
        </Container>
    )
}

export default Button
