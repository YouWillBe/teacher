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
    const { courseClassTestStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        courseClassTestStore.getPreviewFinished()
        // eslint-disable-next-line
    }, [])

    const handleClickLink = (pathname: string) => {
        navigate(`${pathname}/analysis/${courseClassTestStore.doClassTestInfo!.testId}`)
    }

    const handleClickStudentLink = (studentTestId: number) => {
        if (courseClassTestStore.classTest) {
            sessionStorage.removeItem('sessionCurrentType')
            navigate(`/course/${courseClassTestStore.classTest.courseId}/classTest/${studentTestId}`, {
                state: {
                    testId: studentTestId,
                    id: courseClassTestStore.classTest.key.id,
                    courseId: courseClassTestStore.classTest.courseId,
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
                        studentAccuracyCount: courseClassTestStore.studentAccuracyCount,
                        testScore: courseClassTestStore.testScore,
                        totalAccuracy: courseClassTestStore.testAccuracy.totalAccuracy,
                        name: courseClassTestStore.classTest!.name,
                        title: '随堂测',
                    }}
                ></Header>
                <Section
                    data={{
                        unfinishedStudentList: courseClassTestStore.unfinishedStudentList,
                        finishedStudentList: courseClassTestStore.finishedStudentList,
                    }}
                    onClickLink={handleClickLink}
                    onClickStudentLink={handleClickStudentLink}
                ></Section>
            </Container>
        )
    })
}

export default EntryIndex
