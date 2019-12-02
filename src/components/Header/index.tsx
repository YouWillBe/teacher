import React, { FC } from 'react'
import styled from '@emotion/styled'

import Right from './Right'
import Nav from './Nav'

import logo from '../../images/logo.png'

const Container = styled.div`
    top: 0;
    width: 100%;
    height: 80px;
    background-color: #fff;
    box-shadow: 0 2px 20px 0 rgba(225, 226, 240, 0.5);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Logo = styled.div`
    height: 64px;
    width: 174px;
    margin-left: 20px;
    background-image: url(${logo});
    background-size: 100% 100%;
`

const Header: FC = () => {
    return (
        <Container>
            <Logo />
            <Nav />
            <Right />
        </Container>
    )
}

export default Header
