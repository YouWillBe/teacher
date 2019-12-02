import React, { FC, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../store'
import VolumeSelector from '../PublishCommon/VolumeSelector'
import Publish from './Publish'
import NotAnnounced from './Detail/NotAnnounced'
import Entry from './Entry'
import Loading from '../../../components/Loading'

import img from '../../../images/blank.png'

interface IProps {
    courseId: string
}

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
const Img = styled.div`
    background-image: url(${img});
    width: 300px;
    height: 300px;
    background-size: 100% 100%;
`
const Text = styled.div`
    color: #666;
    margin-bottom: 20px;
`

const Task: FC<RouteComponentProps<IProps>> = props => {
    const { courseTaskStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        props.courseId && courseTaskStore.getTask(props.courseId)
        // eslint-disable-next-line
    }, [])
    const handleClick = (id: number) => {
        props.courseId && courseTaskStore.bindingTask(props.courseId, id)
    }

    return useObserver(() => {
        if (!courseTaskStore.taskReady || courseTaskStore.gettingTask) {
            return <Loading />
        } else if (courseTaskStore.task === null) {
            return (
                <Container>
                    <Img />
                    <Text>还未添加作业试卷，请在下方选择一个吧</Text>
                    <VolumeSelector handleClick={handleClick} />
                </Container>
            )
        } else if (courseTaskStore.task.status === 0) {
            return <Publish />
        } else if (courseTaskStore.task.status !== 3) {
            return <NotAnnounced />
        } else {
            return <Entry></Entry>
        }
    })
}

export default Task
