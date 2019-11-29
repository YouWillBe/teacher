import React, { FC, useContext, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../store'

import ClassTable from './ClassTable'
import Status from './Status'

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 20px;
`
const Nodata = styled.div`
    width: 950px;
    height: 800px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 13px 1px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 5px 25px 25px;
    user-select: none;
`

const Main: FC<RouteComponentProps> = () => {
    const { classTableStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        classTableStore.getClassTable()
        classTableStore.getProcessingCourse()
        // eslint-disable-next-line
    }, [])
    return useObserver(() => (
        <Container>
            <Status />
            {classTableStore.classTableReady ? <ClassTable /> : <Nodata></Nodata>}
        </Container>
    ))
}

export default Main
