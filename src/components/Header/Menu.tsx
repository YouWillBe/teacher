import React, { useRef, FC, useContext } from 'react'
import { Link } from '@reach/router'
import styled from '@emotion/styled'
import useOnClickOutside from 'use-onclickoutside'
import { FaUserTie } from 'react-icons/fa'
import { MobXProviderContext } from 'mobx-react'

import { IStore } from '../../store'

const Container = styled.div`
    width: 240px;
    position: absolute;
    z-index: 20;
    top: 64px;
    right: 6px;
    user-select: none;
    box-shadow: rgba(16, 36, 94, 0.4) 0 2px 6px 0;
    border-radius: 4px;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: #fff;
    background-color: #fff;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    box-sizing: border-box;
    padding: 15px 20px;
    border-bottom: 1px solid #ddd;
`
const Triangle = styled.span`
    position: absolute;
    top: -7px;
    right: 24px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid #fff;
    z-index: 10;
`
const TriangleShadow = styled.span`
    position: absolute;
    top: -8px;
    right: 24px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid #ddd;
    z-index: 9;
`
const Avatar = styled.div`
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: contain;
    border: 1px solid #ccc;
    border-radius: 50%;
    font-size: 40px;
    color: #777;
`
const InfoBox = styled.div`
    flex-grow: 1;
    height: 60px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const Realname = styled.div`
    font-size: 14px;
    font-weight: bold;
    color: #000;
`
const Username = styled(Realname)`
    font-size: 12px;
    color: #00a6f3;
    font-weight: normal;
`
const SchoolName = styled(Username)`
    color: #666;
`

const Bottom = styled.footer`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #f8f8f8;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding-top: 10px;
    padding-bottom: 10px;
`
const MyLink = styled(Link)`
    display: block;
    line-height: 28px;
    border: 1px solid #c6c6c6;
    border-radius: 6px;
    font-size: 12px;
    color: #666;
    padding: 0 12px;
    background-color: #fff;
    transition: all 0.1s linear;
    &:hover {
        border-color: #00a6f3;
        color: #00a6f3;
    }
`
const MyLogOut = styled.button`
    line-height: 28px;
    text-align: center;
    border: 1px solid #c6c6c6;
    border-radius: 6px;
    font-size: 12px;
    color: #666;
    padding: 0 12px;
    outline: none;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.1s linear;
    &:hover {
        border-color: #cb1d32;
        color: #cb1d32;
    }
`
interface IProps {
    close(): void
}

const Menu: FC<IProps> = props => {
    const ref = useRef(null)
    const { userStore } = useContext<IStore>(MobXProviderContext)
    useOnClickOutside(ref, props.close)
    const handleClickLogOut = () => {
        userStore.logOut()
    }
    return (
        <Container ref={ref}>
            <Triangle />
            <TriangleShadow />
            <Top>
                <Avatar>
                    <FaUserTie />
                </Avatar>
                <InfoBox>
                    <Realname>{userStore.userInfo.realName}</Realname>
                    <SchoolName>{userStore.userInfo.schoolName}</SchoolName>
                    <Username>{userStore.userInfo.username}</Username>
                </InfoBox>
            </Top>
            <Bottom>
                <MyLink to='/password-reset'>个人中心</MyLink>
                <MyLogOut onClick={handleClickLogOut}>退出登录</MyLogOut>
            </Bottom>
        </Container>
    )
}

export default Menu
