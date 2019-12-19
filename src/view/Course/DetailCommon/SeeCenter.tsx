import React, { FC, useContext } from 'react'
import styled from 'styled-components'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../store'
import SeeHeaderB from './SeeHeaderB'
import ChoiceProblem from '../../../components/QuestionType/ChoiceProblem'
import JudgeProblem from '../../../components/QuestionType/JudgeProblem'
import FillingProblem from '../../../components/QuestionType/FillingProblem'
import ShortAnswerProblem from '../../../components/QuestionType/ShortAnswerProblem'
import FractionListA from './FractionListA'
import FractionListB from './FractionListB'
import FractionListC from './FractionListC'
import NoEntry from './NoEntry'

const Container = styled.div`
    width: 100%;
    margin-bottom: 20px;
`

const Package = styled.div`
    padding: 20px;
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 4px;
`

const ACenter: FC = () => {
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
                <SeeHeaderB></SeeHeaderB>
                {(courseIndexStore.testProblemDetailData.problemType === 1 ||
                    courseIndexStore.testProblemDetailData.problemType === 2) && (
                    <>
                        <FractionListA />
                        <Package>
                            <ChoiceProblem data={problemList()} />
                        </Package>
                    </>
                )}
                {courseIndexStore.testProblemDetailData.problemType === 3 && (
                    <>
                        <FractionListA />
                        <Package>
                            <JudgeProblem data={problemList()} />
                        </Package>
                    </>
                )}
                {courseIndexStore.testProblemDetailData.problemType === 4 && (
                    <>
                        {courseIndexStore.studentVolume.studentTestStatus !== 4 ? <NoEntry /> : <FractionListB />}
                        <Package>
                            <FillingProblem data={problemList()} />
                        </Package>
                    </>
                )}
                {courseIndexStore.testProblemDetailData.problemType === 5 && (
                    <>
                        {courseIndexStore.studentVolume.studentTestStatus !== 4 ? <NoEntry /> : <FractionListC />}
                        <Package>
                            <ShortAnswerProblem data={problemList()} />
                        </Package>
                    </>
                )}
            </Container>
        )
    })
}

export default ACenter
