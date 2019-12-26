import React, { FC, useContext, useEffect } from 'react'
import { MobXProviderContext } from 'mobx-react'
import styled from 'styled-components'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'
import { FaSpinner } from 'react-icons/fa'
import { useParams } from 'react-router-dom'

import { IStore } from '../../../store'
import PlanSelector from './PlanSelector'
import Editor from '../../../components/EditorX'

const Container = styled.div`
    width: 100%;
    flex-grow: 1;
    margin-top: 15px;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`
const Package = styled.div`
    box-shadow: 0 4px 11px 0 rgba(64, 158, 255, 0.1);
    border-radius: 4px;
    margin-top: 20px;
    height: calc(100% - 40px);
    padding: 20px;
`
const Img = styled.div`
    background-image: url(https://img2.heartdynamic.cn/static/blank.png);
    width: 300px;
    height: 300px;
    background-size: 100% 100%;
`
const Text = styled.div`
    color: #666;
    margin-bottom: 20px;
`
const Spinner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Plan: FC = () => {
    const { courseId } = useParams()
    const { coursePlanStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        coursePlanStore.getPlan(courseId as string)
        // eslint-disable-next-line
    }, [])
    const handleClick = (id: number) => {
        coursePlanStore.bindingPlan(courseId as string, id)
    }
    return useObserver(() => {
        if (!coursePlanStore.planReady || coursePlanStore.gettingPlan) {
            return (
                <Spinner>
                    <FaSpinner />
                </Spinner>
            )
        } else if (coursePlanStore.plan === null) {
            return (
                <Container>
                    <Img />
                    <Text>还未添加教案，请在下方选择一个吧</Text>
                    <PlanSelector handleClick={handleClick} />
                </Container>
            )
        } else {
            return (
                <Package>
                    <Editor value={Value.fromJSON(coursePlanStore.plan.content)} readonly />
                </Package>
            )
        }
    })
}

export default Plan
