import React, { useState, useRef, FC, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { FaUserTie } from 'react-icons/fa'

import { IStore } from '../../store'

import UserCard from './UserCard'

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
    padding-right: 20px;
`
const MySubjectName = styled.span`
    line-height: 30px;
    text-align: center;
    min-width: 40px;
    height: 30px;
    background-color: #00a6f3;
    color: #fff;
    border-radius: 4px;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 14px;
`
const Avatar = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 50%;
    color: #777;
    font-size: 20px;
`

const Right: FC = () => {
    const { userStore } = useContext<IStore>(MobXProviderContext)
    const [isInfoMenu, setIsInfoMenu] = useState(false)
    const handleClickInfoMenu = () => {
        setIsInfoMenu(!isInfoMenu)
    }
    const handleCloseMenu = () => {
        setIsInfoMenu(false)
    }
    const tagRef = useRef(null)
    useEffect(() => {
        userStore.getUserInfo()
        // eslint-disable-next-line
    }, [])
    return useObserver(() => (
        <Container>
            <MySubjectName>{userStore.userInfo.subjectName}</MySubjectName>
            <Avatar onMouseDown={handleClickInfoMenu} ref={tagRef}>
                <FaUserTie />
            </Avatar>
            {isInfoMenu && <UserCard close={handleCloseMenu} />}
        </Container>
    ))
}

export default Right
