/*
    未发布试卷
*/
import React, { FC, useContext, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../../store'
import RightWrap from './RightWrap'
import TypeArr from '../../PublishCommon/TypeArr'
import ChoiceProblem from '../../../../components/QuestionType/ChoiceProblem'
import JudgeProblem from '../../../../components/QuestionType/JudgeProblem'
import FillingProblem from '../../../../components/QuestionType/FillingProblem'
import ShortAnswerProblem from '../../../../components/QuestionType/ShortAnswerProblem'

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    margin-top: 20px;
    height: calc(100% - 110px);
`
const ScrollbarWrap = styled.div`
    box-sizing: border-box;
    overflow-y: auto;
    padding: 0 20px;
    height: 100%;
    &::-webkit-scrollbar-button {
        background-color: #fff;
    }
    &::-webkit-scrollbar {
        background-color: #fff;
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(66, 88, 99, 0.4);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #ddd;
    }
`
const ProblemWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 4px;
    border: 3px solid rgba(255, 255, 255, 1);
    margin-top: 20px;
    padding: 20px;
`
const LeftWrap = styled.div`
    flex-grow: 1;
`

const myMap = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const VolumeView: FC = () => {
    const { courseExaminationStore } = useContext<IStore>(MobXProviderContext)
    const [currentStatu, setCurrentStatu] = useState(0)
    useEffect(() => {
        courseExaminationStore.getVolumeLore()
        // eslint-disable-next-line
    }, [])
    //选择类型
    const handleClickType = (id: number) => {
        setCurrentStatu(id)
    }

    //发布
    const handleClickSave = () => {
        if (courseExaminationStore.examination) {
            courseExaminationStore.publishVolume(courseExaminationStore.examination.id, courseExaminationStore.courseId)
        }
    }

    //处理数据
    const problemList = (data: any) => {
        let type = [1, 2]
        let type1 = [4, 5]
        if (typeof data.topic === 'string') {
            data.topic = JSON.parse(data.topic)
        }
        if (typeof data.solution === 'string') {
            data.solution = JSON.parse(data.solution)
        }
        if (type.includes(data.problemType)) {
            if (typeof data.option === 'string') {
                data.option = JSON.parse(data.option)
            }
            data.option.map((item: any, index: number) => {
                item.statu = false
                if (data.answer === myMap[index]) {
                    item.statu = true
                }
                return item
            })
        } else if (type1.includes(data.problemType) && typeof data.answer === 'string') {
            data.answer = JSON.parse(data.answer)
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
            <>
                {courseExaminationStore.examination && (
                    <TypeArr
                        typeArrData={courseExaminationStore.typeArr}
                        data={{
                            currentStatu,
                            totalScore: courseExaminationStore.examination.totalScore,
                            totalProblem: courseExaminationStore.examination.totalProblem,
                        }}
                        onClickSave={handleClickSave}
                        onClick={handleClickType}
                    />
                )}
                <Container>
                    <LeftWrap>
                        <ScrollbarWrap>
                            {courseExaminationStore.examination && (
                                <>
                                    {currentStatu === 0 && (
                                        <>
                                            {courseExaminationStore.examination.choiceProblems.length > 0 ? (
                                                <>
                                                    {courseExaminationStore.examination.choiceProblems.map(
                                                        (item, index) => (
                                                            <ProblemWrap key={item.id}>
                                                                <ChoiceProblem data={problemList({ ...item, index })} />
                                                            </ProblemWrap>
                                                        )
                                                    )}
                                                </>
                                            ) : null}
                                            {courseExaminationStore.examination.checkboxProblems.length > 0 ? (
                                                <>
                                                    {courseExaminationStore.examination.checkboxProblems.map(
                                                        (item, index) => (
                                                            <ProblemWrap key={item.id}>
                                                                <ChoiceProblem data={problemList({ ...item, index })} />
                                                            </ProblemWrap>
                                                        )
                                                    )}
                                                </>
                                            ) : null}
                                            {courseExaminationStore.examination.judgeProblems.length > 0 ? (
                                                <>
                                                    {courseExaminationStore.examination.judgeProblems.map(
                                                        (item, index) => (
                                                            <ProblemWrap key={item.id}>
                                                                <JudgeProblem data={problemList({ ...item, index })} />
                                                            </ProblemWrap>
                                                        )
                                                    )}
                                                </>
                                            ) : null}
                                            {courseExaminationStore.examination.fillingProblems.length > 0 ? (
                                                <>
                                                    {courseExaminationStore.examination.fillingProblems.map(
                                                        (item, index) => (
                                                            <ProblemWrap key={item.id}>
                                                                <FillingProblem
                                                                    data={problemList({ ...item, index })}
                                                                />
                                                            </ProblemWrap>
                                                        )
                                                    )}
                                                </>
                                            ) : null}
                                            {courseExaminationStore.examination.shortAnswerProblems.length > 0 ? (
                                                <>
                                                    {courseExaminationStore.examination.shortAnswerProblems.map(
                                                        (item, index) => (
                                                            <ProblemWrap key={item.id}>
                                                                <ShortAnswerProblem
                                                                    data={problemList({ ...item, index })}
                                                                />
                                                            </ProblemWrap>
                                                        )
                                                    )}
                                                </>
                                            ) : null}
                                        </>
                                    )}
                                    {currentStatu === 1 &&
                                        courseExaminationStore.examination.choiceProblems.map((item, index) => (
                                            <ProblemWrap key={item.id}>
                                                <ChoiceProblem data={problemList({ ...item, index })} />
                                            </ProblemWrap>
                                        ))}
                                    {currentStatu === 2 &&
                                        courseExaminationStore.examination.checkboxProblems.map((item, index) => (
                                            <ProblemWrap key={item.id}>
                                                <ChoiceProblem data={problemList({ ...item, index })} />
                                            </ProblemWrap>
                                        ))}
                                    {currentStatu === 3 &&
                                        courseExaminationStore.examination.judgeProblems.map((item, index) => (
                                            <ProblemWrap key={item.id}>
                                                <JudgeProblem data={problemList({ ...item, index })} />
                                            </ProblemWrap>
                                        ))}
                                    {currentStatu === 4 &&
                                        courseExaminationStore.examination.fillingProblems.map((item, index) => (
                                            <ProblemWrap key={item.id}>
                                                <FillingProblem data={problemList({ ...item, index })} />
                                            </ProblemWrap>
                                        ))}
                                    {currentStatu === 5 &&
                                        courseExaminationStore.examination.shortAnswerProblems.map((item, index) => (
                                            <ProblemWrap key={item.id}>
                                                <ShortAnswerProblem data={problemList({ ...item, index })} />
                                            </ProblemWrap>
                                        ))}
                                </>
                            )}
                        </ScrollbarWrap>
                    </LeftWrap>
                    <RightWrap />
                </Container>
            </>
        )
    })
}

export default VolumeView
