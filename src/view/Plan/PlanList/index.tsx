import React, { FC, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import styled from 'styled-components'

import { IStore } from '../../../store'

import Loading from '../../../components/Loading'
import Paging from '../../../components/Paging'
import PlanCard from './PlanCard'
import Header from '../../../components/Header'
import NoContent from './NoContent'

const ListWrap = styled.div`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding-top: 80px;
    position: relative;
`

const Container = styled.div`
    width: 1000px;
    margin: 0 auto;
    height: 500px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
`

const Wrap = styled.div`
    margin: 0 auto;
    width: 1000px;
    height: 100%;
    padding-top: 30px;
    padding-bottom: 30px;
    box-sizing: border-box;
`
const NewButtonWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
const NewButton = styled(Link)`
    border: 1px solid #999;
    color: #777;
    margin-right: 5px;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.1s linear;
    &:hover {
        color: #00a6f3;
        border-color: #00a6f3;
    }
`
const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: #ddd;
    margin-top: 10px;
`
const PagingWrap = styled.div`
    margin-top: 20px;
`

const PlanList: FC = () => {
    const { planStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        planStore.getPlanList(1)
        // eslint-disable-next-line
    }, [])

    //分页
    const handleChangePaging = (value: number) => {
        planStore.getPlanList(value)
    }

    return useObserver(() => (
        <ListWrap>
            <Header />
            {!planStore.planListReady ? (
                <Loading />
            ) : planStore.planList.length === 0 ? (
                <NoContent />
            ) : (
                <Wrap>
                    <NewButtonWrap>
                        <NewButton to='/plan/new'>添加教案</NewButton>
                    </NewButtonWrap>
                    <Line />
                    <Container>
                        {planStore.planList.map((v, i) => (
                            <PlanCard data={v} key={i} deletePlan={id => planStore.deletePlan(id)} />
                        ))}
                    </Container>
                    {planStore.pageInfo.total > 8 && (
                        <PagingWrap>
                            <Paging
                                onChange={handleChangePaging}
                                current={planStore.pageInfo.page}
                                total={Math.ceil(planStore.pageInfo.total / planStore.pageInfo.limit)}
                            />
                        </PagingWrap>
                    )}
                </Wrap>
            )}
        </ListWrap>
    ))
}

export default PlanList
