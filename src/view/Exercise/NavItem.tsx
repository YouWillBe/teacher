import React, { FC } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled(Link)`
    display: block;
`
const Wrap = styled.div<{ active: boolean }>`
    color: ${props => (props.active ? 'rgb(0, 166, 243)' : '#666')};
    box-sizing: border-box;
    width: 110px;
    height: 100%;
    position: relative;
    top: 1px;
    background-color: #fff;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid transparent;
    border-color: ${props => props.active ? '#e9e9e9' : 'transparent'};
    border-bottom-color: ${props => props.active ? 'transparent' : '#e9e9e9'};
    transition: all 0.1s linear;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`

interface IProps {
    to: string
    active: boolean
}
const NavItem: FC<IProps> = ({ to, active, children }) => {
    return (
        <Container to={to}>
            <Wrap active={active}>{children}</Wrap>
        </Container>
    )
}

export default NavItem
