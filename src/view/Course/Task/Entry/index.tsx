import React, { FC, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { navigate } from '@reach/router'

import { IStore } from '../../../../store'
import Header from '../../EntryCommon/Header'
import Section from '../../EntryCommon/Section'

const Container = styled.section`
    width: 100%;
    margin: 20px auto 0;
`
interface IParams {
    id: string
    testId: string
    courseId: string
    key: string
}
const EntryIndex: FC<RouteComponentProps<IParams>> = props => {
    const { courseTaskStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        courseTaskStore.getPreviewFinished()
        // eslint-disable-next-line
    }, [])

    const handleClickLink = (pathname: string) => {
        navigate(`${pathname}/analysis/${courseTaskStore.doTaskInfo!.testId}`)
    }

    const handleClickStudentLink = (studentTestId: number) => {
        if (courseTaskStore.task) {
            sessionStorage.removeItem('sessionCurrentType')
            navigate(`/course/${courseTaskStore.task.courseId}/task/${studentTestId}`, {
                state: {
                    testId: studentTestId,
                    id: courseTaskStore.task.key.id,
                    courseId: courseTaskStore.task.courseId,
                    status: true,
                },
            })
        }
    }

    return useObserver(() => {
        return (
            <Container>
                <Header
                    data={{
                        studentAccuracyCount: courseTaskStore.studentAccuracyCount,
                        testScore: courseTaskStore.testScore,
                        totalAccuracy: courseTaskStore.testAccuracy.totalAccuracy,
                        name: courseTaskStore.task!.name,
                        title: '作业',
                    }}
                ></Header>
                <Section
                    data={{
                        unfinishedStudentList: courseTaskStore.unfinishedStudentList,
                        finishedStudentList: courseTaskStore.finishedStudentList,
                    }}
                    onClickLink={handleClickLink}
                    onClickStudentLink={handleClickStudentLink}
                ></Section>
            </Container>
        )
    })
}

export default EntryIndex
