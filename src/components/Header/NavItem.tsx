import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const Container = styled(Link)`
    width: 90px;
    height: 80px;
    cursor: pointer;
    margin-left: 25px;
    margin-right: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`
const Line = styled.span<{ active: boolean }>`
    height: 8px;
    width: 90px;
    border-radius: 8px;
    position: absolute;
    bottom: 6px;
    transition: background-color 0.1s linear;
    background-color: ${props => (props.active ? '#00a6f3' : '#fff')};
`
const Text = styled.div<{ active: boolean }>`
    font-size: 22px;
    font-family: PingFangSC, sans-serif;
    font-weight: 400;
    transition: color 0.1s linear;
    color: ${props => (props.active ? '#00a6f3' : '#3a4760')};
`

interface IProps {
    to: string
    text: string
    active: boolean
}

const NavItem: FC<IProps> = ({ to, active, text }) => {
    return (
        <Container to={to}>
            <Line active={active}/>
            <Text active={active}>{text}</Text>
        </Container>
    )
}

export default NavItem
