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

import blank from '../Plan/blank.png'

dayjs.locale('zh-cn')

const Container = styled.div`
    height: 250px;
    width: 100%;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 13px 1px;
    background-color: #fff;
`
const Title = styled.div`
    color: #ff7875;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-top: 30px;
`
const Course = styled.div``
const Time = styled.div``
const Section = styled.div``
const Class = styled.div``
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

const sectionList = ['上午', '下午', '晚间']

const ProcessingCourse: FC = () => {
    const { classTableStore } = useContext<IStore>(MobXProviderContext)
    return useObserver(() => (
        <Container>
            <Title>正在进行</Title>
            {classTableStore.gettingProcessingCourse ? (
                <Loading></Loading>
            ) : isNil(classTableStore.processingCourse) ? (
                <>
                    <Blank />
                    <Text>没有正在进行的课程</Text>
                </>
            ) : (
                <>
                    <Course>
                        <Time>
                            周{dayjs(oc(classTableStore).processingCourse.courseClassTime(0) * 1000).format('dd MM-DD')}
                        </Time>
                        <Section>
                            {sectionList[oc(classTableStore).processingCourse.courseType(0) - 1]} 第
                            {oc(classTableStore).processingCourse.courseSection()}节
                        </Section>
                    </Course>
                    <Class>{oc(classTableStore).processingCourse.teamFullName()}</Class>
                </>
            )}
        </Container>
    ))
}

export default ProcessingCourse
