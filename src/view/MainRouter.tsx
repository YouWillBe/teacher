import React, { FC, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { Router, RouteComponentProps } from '@reach/router'

import { IStore } from '../store'

import Main from './Main'
import Plan from './Plan'
import Header from '../components/Header'
import Volume from './Volume'
import VolumeTemplet from './Volume/templet'
import Exercise from './Exercise'
import NetExercise from './Exercise/net'
import NewExercise from './Exercise/new'

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 80px;
    background-color: #fff;
    position: relative;
`
const Content = styled(Router)`
    width: 100%;
    height: 100%;
`

const MainRouter: FC<RouteComponentProps> = () => {
    const { userStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        userStore.getUserInfo()
    })
    return (
        <Container>
            <Header />
            <Content>
                <Main path='/' />
                <Plan path='plan' />
                <Volume path='volume'>
                    <VolumeTemplet path='templet'></VolumeTemplet>
                </Volume>
                <Exercise path='exercise'>
                    <NetExercise path='net'></NetExercise>
                    <NewExercise path='new'></NewExercise>
                </Exercise>
            </Content>
        </Container>
    )
}

export default MainRouter
