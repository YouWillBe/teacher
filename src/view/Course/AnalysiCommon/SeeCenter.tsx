import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps } from '@reach/router'

import { IStore } from '../../../store'
import SeeHeader from './SeeHeader'
import ChoiceProblem from '../../../components/QuestionType/ChoiceProblem'
import JudgeProblem from '../../../components/QuestionType/JudgeProblem'
import FillingProblem from '../../../components/QuestionType/FillingProblem'
import ShortAnswerProblem from '../../../components/QuestionType/ShortAnswerProblem'

export interface IProblems {
    id: number
    problemType: number
    number: number
    mark: number
    studentAnswer: number
    index: number
}

const Container = styled.div`
    width: 100%;
`

export interface IProblems {
    id: number
    problemType: number
    number: number
    mark: number
    studentAnswer: number
    index: number
}

const ACenter: FC<RouteComponentProps> = () => {
    const { courseIndexStore } = useContext<IStore>(MobXProviderContext)

    //处理数据
    const problemList = () => {
        let data = courseIndexStore.testProblemDetailData
        let type = [1, 2]

        if (type.includes(data.problemType)) {
            if (typeof data.option === 'string') {
                data.option = JSON.parse(data.option)
            }
        }

        return {
            id: data.id,
            index: data.number - 1,
            topic: data.topic,
            answer: data.answer,
            studentAnswer: data.studentAnswer,
            fraction: data.fraction,
            option: data.option,
            type: data.problemType,
            loreList: data.loreList,
            solution: data.solution,
            showEditPick: 3,
        }
    }

    return useObserver(() => {
        return (
            <Container>
                <SeeHeader></SeeHeader>
                {(courseIndexStore.testProblemDetailData.problemType === 1 ||
                    courseIndexStore.testProblemDetailData.problemType === 2) && <ChoiceProblem data={problemList()} />}
                {courseIndexStore.testProblemDetailData.problemType === 3 && <JudgeProblem data={problemList()} />}
                {courseIndexStore.testProblemDetailData.problemType === 4 && <FillingProblem data={problemList()} />}
                {courseIndexStore.testProblemDetailData.problemType === 5 && (
                    <ShortAnswerProblem data={problemList()} />
                )}
            </Container>
        )
    })
}

export default ACenter
