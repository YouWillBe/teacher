import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { oc } from 'ts-optchain'
import { isNil } from 'ramda'

import { IStore } from '../../store'
import Loading from '../../components/Loading'
import CourseInfo from './CourseInfo'

import blank from '../../images/blank.png'

dayjs.locale('zh-cn')

const Container = styled.div`
    height: 250px;
    width: 100%;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.12) 0 3px 13px 1px;
    background-color: #fff;
`
const Title = styled.div`
    color: #ff7875;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-top: 30px;
`

const Blank = styled.div`
    background-image: url(${blank});
    width: 100px;
    height: 100px;
    background-size: contain;
    margin: 20px auto;
`
const Text = styled.div`
    text-align: center;
    font-size: 12px;
    color: #666;
`

const ProcessingCourse: FC = () => {
    const { classTableStore } = useContext<IStore>(MobXProviderContext)
    return useObserver(() => (
        <Container>
            <Title>正在进行</Title>
            {classTableStore.gettingProcessingCourse ? (
                <Loading />
            ) : isNil(classTableStore.processingCourse) ? (
                <>
                    <Blank />
                    <Text>没有正在进行的课程</Text>
                </>
            ) : (
                <CourseInfo
                    color='#749611'
                    date={oc(classTableStore).processingCourse.courseClassTime(0) * 1000}
                    section={oc(classTableStore).processingCourse.courseType(0) - 1}
                    index={oc(classTableStore).processingCourse.courseSection(0)}
                    nameOfClass={oc(classTableStore).processingCourse.teamFullName('')}
                    courseId={oc(classTableStore).processingCourse.courseId(0)}
                />
            )}
        </Container>
    ))
}

export default ProcessingCourse
