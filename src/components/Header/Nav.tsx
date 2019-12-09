import React, { FC } from 'react'
import styled from '@emotion/styled'
import { useLocation } from 'react-router-dom'

import NavItem from './NavItem'

const Container = styled.div`
    height: 100%;
    display: flex;
`

const Nav: FC = () => {
    const location = useLocation()
    return (
        <Container>
            <NavItem to='/' active={location.pathname === '/'} text='首页' />
            <NavItem to='/plan' active={location.pathname === '/plan'} text='教案' />
            <NavItem to='/volume' active={location.pathname === '/volume'} text='试卷' />
            <NavItem to='/exercise' active={location.pathname === '/exercise'} text='题库' />
            <NavItem to='/analysis' active={location.pathname === '/analysis'} text='学情分析' />
            <NavItem to='/knowledge' active={location.pathname === '/knowledge'} text='知识结构' />
        </Container>
    )
}

export default Nav
