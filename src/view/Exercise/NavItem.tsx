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
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.active ? '#ccc' : 'transparent'};
    border-bottom-color: ${props => props.active ? '#f5f5f5' : '#ccc'};
    transition: all 0.1s linear;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    //background-color: ${props => props.active ? '#fff' : '#f5f5f5'};
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
