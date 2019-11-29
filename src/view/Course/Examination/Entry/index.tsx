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
    const { courseExaminationStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        courseExaminationStore.getPreviewFinished()
        // eslint-disable-next-line
    }, [])

    const handleClickLink = (pathname: string) => {
        navigate(`${pathname}/analysis/${courseExaminationStore.doExaminationInfo!.testId}`)
    }

    const handleClickStudentLink = (studentTestId: number) => {
        if (courseExaminationStore.examination) {
            sessionStorage.removeItem('sessionCurrentType')
            navigate(`/course/${courseExaminationStore.examination.courseId}/examination/${studentTestId}`, {
                state: {
                    testId: studentTestId,
                    id: courseExaminationStore.examination.key.id,
                    courseId: courseExaminationStore.examination.courseId,
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
                        studentAccuracyCount: courseExaminationStore.studentAccuracyCount,
                        testScore: courseExaminationStore.testScore,
                        totalAccuracy: courseExaminationStore.testAccuracy.totalAccuracy,
                        name: courseExaminationStore.examination!.name,
                        title: '测试',
                    }}
                ></Header>
                <Section
                    data={{
                        unfinishedStudentList: courseExaminationStore.unfinishedStudentList,
                        finishedStudentList: courseExaminationStore.finishedStudentList,
                    }}
                    onClickLink={handleClickLink}
                    onClickStudentLink={handleClickStudentLink}
                ></Section>
            </Container>
        )
    })
}

export default EntryIndex
