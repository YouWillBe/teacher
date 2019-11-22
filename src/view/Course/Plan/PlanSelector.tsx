import React, { FC, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Link } from '@reach/router'

import PlanCard from './PlanCard'

import { IStore } from '../../../store'

interface IProps {
    handleClick(id: number): void
}

const Container = styled.div`
    padding: 18px;
    border: 1px solid #eee;
    max-width: 80%;
    overflow-x: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`
const AddLine = styled(Link)`
    color: #666;
    margin-bottom: 20px;
    :hover {
        color: #00a6f3;
    }
`

const PlanSelector: FC<IProps> = props => {
    const { planStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        planStore.getPlanList(1)
        // eslint-disable-next-line
    }, [])
    return useObserver(() => (
        <>
            {planStore.planList.length > 0 ? (
                <Container>
                    {planStore.planList.slice(0, 4).map(v => (
                        <PlanCard
                            key={v.id}
                            id={v.id}
                            title={v.title}
                            loreList={v.loreList}
                            handleClick={props.handleClick}
                        />
                    ))}
                </Container>
            ) : (
                <AddLine to='/plan'>去教案新增</AddLine>
            )}
        </>
    ))
}

export default PlanSelector
