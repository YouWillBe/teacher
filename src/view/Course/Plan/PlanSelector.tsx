import React, { FC, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import PlanCard from './PlanCard'

import { IStore } from '../../../store'

interface IProps {
    handleClick(id: number): void
}

const Container = styled.div<{ scroll: boolean }>`
    padding: 18px;
    border: 1px solid #eee;
    max-width: 80%;
    overflow-x: ${props => (props.scroll ? 'scroll' : 'auto')};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`

const PlanSelector: FC<IProps> = props => {
    const { planStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        planStore.getPlanList(1)
        // eslint-disable-next-line
    }, [])
    return useObserver(() => (
        <Container scroll={planStore.planList.length >= 5}>
            {planStore.planList.map(v => (
                <PlanCard key={v.id} id={v.id} title={v.title} loreList={v.loreList} handleClick={props.handleClick} />
            ))}
        </Container>
    ))
}

export default PlanSelector
