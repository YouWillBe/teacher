import React, { FC } from 'react'
import styled from '@emotion/styled'

interface IOptions {
    width?: string
    height?: string
    lHeight?: string
    border?: string
    radius?: string
    size?: string
    sizeSvg?: string
    faily?: string
    weight?: string
    color?: string
    bgColor?: string
    shadow?: string
    spacing?: string
    cursor?: string
    HbgColor?: string
    HBorder?: string
    HColor?: string
}

interface IButton {
    title?: string
    options?: IOptions
    onClick?(): void
}

const MyButton = styled.button<{ option: IOptions }>`
    box-sizing: border-box;
    display: block;
    width: ${props => props.option.width || ''};
    height: ${props => props.option.height || '28px'};
    display: flex;
    align-items: center;
    justify-content: center;
    border: ${props => props.option.border || 'none'};
    border-radius: ${props => props.option.radius || '4px'};
    font-size: ${props => props.option.size || '12px'};
    font-family: ${props => props.option.faily || 'PingFang-SC-Medium'};
    font-weight: ${props => props.option.weight || '500'};
    color: ${props => props.option.color || '#fff'};
    background-color: ${props => props.option.bgColor || '#fff'};
    padding: 0px 16px;
    outline: none;
    box-shadow: ${props => props.option.shadow || ''};
    letter-spacing: ${props => props.option.spacing || ''};
    cursor: ${props => props.option.cursor || 'pointer'};
    svg {
        font-size: ${props => props.option.sizeSvg || '16px'};
    }
    &:hover {
        background-color: ${props => props.option.HbgColor || ''};
        border: ${props => props.option.HBorder || ''};
        color: ${props => props.option.HColor || ''};
    }
`

const Button: FC<IButton> = props => {
    const handleClick = () => {
        props.onClick && props.onClick()
    }
    return (
        <MyButton type='button' title={props.title} onClick={handleClick} option={props.options || {}}>
            {props.children}
        </MyButton>
    )
}
export default Button
