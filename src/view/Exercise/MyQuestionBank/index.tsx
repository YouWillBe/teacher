import React, { FC, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

import { IStore } from '../../../store'
import List from './List'
import Filter from './Filter'
import Loading from '../../../components/Loading'

const Container = styled.div`
    width: 100%;
    height: 100%;
`
const Header = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
`
const New = styled(Link)`
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 6px 10px;
    font-size: 12px;
    color: #666;
    transition: all 0.1s linear;
    cursor: pointer;
    &:hover {
        border-color: #00a6f3;
        color: #00a6f3;
    }
`

const MyQuestionBank: FC = () => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)
    const handleChangeType = (index: number) => {
        exerciseStore.changeCurrentType(index)
    }
    useEffect(() => {
        !exerciseStore.questionListInitialized && exerciseStore.initialQuestionList()
        // eslint-disable-next-line
    }, [])
    return useObserver(() => {
        if (!exerciseStore.questionListInitialized) {
            return <Loading />
        }
        return (
            <Container>
                <Header>
                    <Filter changeType={handleChangeType} currentType={exerciseStore.currentType} />
                    <New to='/exercise/new'>新增题目</New>
                </Header>
                <List />
            </Container>
        )
    })
}

export default MyQuestionBank
