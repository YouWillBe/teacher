import React, { FC, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../store'

import Header from '../../components/Header'
import ClassTable from './ClassTable'
import Status from './Status'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding-top: 80px;
    position: relative;
`
const Content = styled.div`
    display: flex;
    padding-top: 20px;
    justify-content: center;
`
const NoData = styled.div`
    width: 950px;
    height: 800px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.12) 0 3px 13px 1px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 5px 25px 25px;
    user-select: none;
`

const Main: FC = () => {
    const { classTableStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        classTableStore.getClassTable()
        classTableStore.getProcessingCourse()
        // eslint-disable-next-line
    }, [])
    return useObserver(() => (
        <Container>
            <Header />
            <Content>
                <Status />
                {/* todo 重写课程表部分*/}
                {classTableStore.classTableReady ? <ClassTable /> : <NoData />}
            </Content>
        </Container>
    ))
}

export default Main
