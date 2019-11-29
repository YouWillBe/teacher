import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../../store'
import Editor from '../../../components/EditorX'
import Knowledge from '../../../components/Knowledge'
import OptionC from './OptionC'
import PlusKnowledge from './PlusKnowledge'

const ScrollbarWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 0 20px 20px;
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
const Package = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 10px;
    border: 3px solid rgba(255, 255, 255, 0.8178);
    margin-top: 20px;
`
const ProblemText = styled.div`
    box-sizing: border-box;
    height: 50px;
    line-height: 48px;
    border-bottom: 1px solid #c4def5;
    padding-left: 10px;
    font-size: 18px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(58, 147, 223, 1);
`

const KnowledgeWrap = styled.div`
    padding-left: 40px;
    min-height: 60px;
    display: flex;
    align-items: center;
`
const TopicWrap = styled.div`
    min-height: 60px;
    padding-bottom: 10px;
    font-size: 16px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    padding-left: 22px;
    flex-grow: 1;
`
const OptionWrap = styled.div`
    min-height: 60px;
    padding-left: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(7, 41, 121, 1);
`
const SolutionWrap = styled.div`
    padding-bottom: 10px;
    min-height: 60px;
    padding-left: 20px;
    font-size: 14px;
    font-family: PingFangSC;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`

interface Iprops {
    id: string
}

interface IAnswer {
    id: number
    value: Value
}

const FillingProblem: FC<RouteComponentProps<Iprops>> = props => {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)

    //题干/插入空位
    const handleChangeTopic = (value: Value) => {
        volumeStore.volumeProblem.topic = value
        let data: any = {
            value: value.toJS().document,
        }
        let answer: any = []
        let answerCount = 0

        let newData = data.value.nodes.map((item: any) => {
            return item.nodes.filter((t: any) => t.type === 'space').length
        })

        let total = newData.reduce((total: number, num: number) => {
            return total + num
        })

        for (let i = 0; i < total; i++) {
            if (i < volumeStore.volumeProblem.answer.length) {
                answer[i] = {
                    id: i + 1,
                    value: volumeStore.volumeProblem.answer[i].value,
                }
                answerCount += 1
            } else {
                answer[i] = {
                    id: i + 1,
                    value: Value.fromJSON({
                        document: {
                            nodes: [
                                {
                                    object: 'block',
                                    type: 'paragraph',
                                    nodes: [
                                        {
                                            object: 'text',
                                            text: '',
                                        },
                                    ],
                                },
                            ],
                        },
                    }),
                }
            }
        }
        volumeStore.volumeProblem.answer = answer
        volumeStore.volumeProblem.answerCount = answerCount
    }

    //解析
    const handleChangeSolution = (value: Value) => {
        volumeStore.volumeProblem.solution = value
    }

    return useObserver(() => {
        return (
            <ScrollbarWrap>
                <Package>
                    <ProblemText>知识点</ProblemText>
                    <KnowledgeWrap>
                        <PlusKnowledge></PlusKnowledge>
                        {volumeStore.selectedPoints.map((item, index) => (
                            <Knowledge key={item.id} data={item}></Knowledge>
                        ))}
                    </KnowledgeWrap>
                </Package>
                <Package>
                    <ProblemText>题目</ProblemText>
                    <TopicWrap>
                        <Editor
                            value={Value.fromJSON(volumeStore.volumeProblem.topic)}
                            onChange={handleChangeTopic}
                            showVacancy={true}
                        />
                    </TopicWrap>
                </Package>
                <Package>
                    <ProblemText>答案</ProblemText>
                    <OptionWrap>
                        {volumeStore.volumeProblem.answer.map((item: IAnswer, index: number) => (
                            <OptionC key={item.id} data={{ value: Value.fromJSON(item.value), index }}></OptionC>
                        ))}
                    </OptionWrap>
                </Package>
                <Package>
                    <ProblemText>解析</ProblemText>
                    <SolutionWrap>
                        <Editor
                            value={Value.fromJSON(volumeStore.volumeProblem.solution)}
                            onChange={handleChangeSolution}
                        />
                    </SolutionWrap>
                </Package>
            </ScrollbarWrap>
        )
    })
}

export default FillingProblem
