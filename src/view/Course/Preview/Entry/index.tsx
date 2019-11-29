/*
    老师已公布答案
*/
import React, { FC, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
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
const EntryIndex: FC = () => {
    const { coursePreviewStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        coursePreviewStore.getPreviewFinished()
        // eslint-disable-next-line
    }, [])

    const handleClickLink = (pathname: string) => {
        navigate(`${pathname}/analysis/${coursePreviewStore.doPreviewInfo!.testId}`)
    }

    const handleClickStudentLink = (studentTestId: number) => {
        if (coursePreviewStore.preview) {
            sessionStorage.removeItem('sessionCurrentType')
            navigate(`/course/${coursePreviewStore.preview.courseId}/preview/${studentTestId}`, {
                state: {
                    testId: studentTestId,
                    id: coursePreviewStore.preview.key.id,
                    courseId: coursePreviewStore.preview.courseId,
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
                        studentAccuracyCount: coursePreviewStore.studentAccuracyCount,
                        testScore: coursePreviewStore.testScore,
                        totalAccuracy: coursePreviewStore.testAccuracy.totalAccuracy,
                        name: coursePreviewStore.preview!.name,
                        title: '预习',
                    }}
                ></Header>
                <Section
                    data={{
                        unfinishedStudentList: coursePreviewStore.unfinishedStudentList,
                        finishedStudentList: coursePreviewStore.finishedStudentList,
                    }}
                    onClickLink={handleClickLink}
                    onClickStudentLink={handleClickStudentLink}
                ></Section>
            </Container>
        )
    })
}

export default EntryIndex
