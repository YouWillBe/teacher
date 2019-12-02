import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { oc } from 'ts-optchain'
import { isNil } from 'ramda'

import { IStore } from '../../store'
import Loading from '../../components/Loading'
import CourseInfo from './CourseInfo'

import blank from '../Plan/blank.png'

const Container = styled.div`
    height: 250px;
    width: 100%;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.12) 0 3px 13px 1px;
    background-color: #fff;
    margin-bottom: 30px;
`
const Title = styled.div`
    color: #749611;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-top: 30px;
`
const Blank = styled.div`
    background-image: url(${blank});
    width: 200px;
    height: 200px;
    background-size: contain;
    margin: 20px auto;
`
const Text = styled.div`
    text-align: center;
    font-size: 12px;
    color: #666;
`

const ComingCourse: FC = () => {
    const { classTableStore } = useContext<IStore>(MobXProviderContext)
    return useObserver(() => (
        <Container>
            <Title>准备上的课</Title>
            {classTableStore.gettingProcessingCourse ? (
                <Loading />
            ) : isNil(classTableStore.comingCourse) ? (
                <>
                    <Blank />
                    <Text>没有正在进行的课程</Text>
                </>
            ) : (
                <CourseInfo
                    color='#749611'
                    date={oc(classTableStore).comingCourse.courseClassTime(0) * 1000}
                    section={oc(classTableStore).comingCourse.courseType(0) - 1}
                    index={oc(classTableStore).comingCourse.courseSection(0)}
                    nameOfClass={oc(classTableStore).comingCourse.teamFullName('')}
                    courseId={oc(classTableStore).comingCourse.courseId(0)}
                />
            )}
        </Container>
    ))
}

export default ComingCourse
