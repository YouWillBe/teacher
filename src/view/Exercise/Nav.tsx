import React, { FC } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import NavItem from './NavItem'

const MyItemWrap = styled.div`
    width: 1260px;
    height: 49px;
    margin: 20px auto 0;
    display: flex;
    border-bottom: 1px solid #ccc;
    padding-left: 15px;
    box-sizing: border-box;
`

const Nav: FC = () => {
    const location = useLocation()
    return (
        <MyItemWrap>
            <NavItem to='/exercise' active={location.pathname === '/exercise' || location.pathname === '/exercise/new'}>
                我的题库
            </NavItem>
            <NavItem to='/exercise/net' active={location.pathname === '/exercise/net'}>
                网络题库
            </NavItem>
        </MyItemWrap>
    )
}

export default Nav
