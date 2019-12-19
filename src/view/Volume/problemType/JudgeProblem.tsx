import React, { FC, useContext } from 'react'
import styled from 'styled-components'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../../store'
import Editor from '../../../components/EditorX'
import Knowledge from '../../../components/Knowledge'
import OptionB from './OptionB'
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
    box-shadow: 0 2px 4px 0 rgba(31, 122, 171, 0.2);
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
    font-family: PingFangSC, sans-serif;
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
    padding-bottom: 10px;
    min-height: 60px;
    font-size: 16px;
    font-family: PingFangSC-Light, sans-serif;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    padding-left: 22px;
    flex-grow: 1;
`
const OptionWrap = styled.div`
    padding-left: 40px;
`
const SolutionWrap = styled.div`
    padding-left: 20px;
    padding-bottom: 10px;
    font-size: 14px;
    font-family: PingFangSC, sans-serif;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`

const JudgeProblem: FC = () => {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)

    const handleSelectPoint = (data: { id: number; name: string }) => {
        volumeStore.selectPoint(data)
    }

    //题干
    const handleChangeTopic = (value: Value) => {
        volumeStore.volumeProblem.topic = value
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
                        <PlusKnowledge />
                        {volumeStore.selectedPoints.map(item => (
                            <Knowledge key={item.id} data={item} closable={true} onClickDeleted={handleSelectPoint} />
                        ))}
                    </KnowledgeWrap>
                </Package>
                <Package>
                    <ProblemText>题目</ProblemText>
                    <TopicWrap>
                        <Editor value={Value.fromJSON(volumeStore.volumeProblem.topic)} onChange={handleChangeTopic} />
                    </TopicWrap>
                </Package>
                <Package>
                    <ProblemText>选项</ProblemText>
                    <OptionWrap>
                        <OptionB />
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

export default JudgeProblem
