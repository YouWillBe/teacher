import React, { FC, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../../store'
import InputNumber from './InputNumber'

const MyTopicTEditor = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
`

const MyOptionLeft = styled.div`
    display: flex;
    align-items: center;
    margin-right: 100px;
`
const MySpanName = styled.span`
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 100;
    color: rgba(58, 147, 223, 1);
`

const MyOptionRight = styled.div`
    display: flex;
    align-items: center;
`
const MyAnswerOption = styled.div`
    margin-left: 30px;
`
const MyAnswerOptionName = styled.span<{ isSelected: boolean }>`
    display: inline-block;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    line-height: 40px;
    box-shadow: 0px 3px 5px 0px rgba(221, 235, 250, 1);
    border-radius: 2px;
    text-align: center;
    margin-right: 10px;
    cursor: pointer;
    background-color: ${props => (props.isSelected ? '#3A93DF' : '#fff')};
    color: ${props => (props.isSelected ? '#fff' : '#333')};
    user-select: none;
`

interface ICurrentAnswer {
    statu: boolean
    name: string
}

const OptionA: FC = props => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)
    const [answerOption] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])

    //选项数量
    const handleClickAnswerNumber = (text: string, index: number) => {
        if (text === '加') {
            if (index + 1 > 10) {
                return
            }
            exerciseStore.currentAnswer.push({
                statu: false,
                name: answerOption[index],
            })
            exerciseStore.setOption({
                id: index + 1,
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
            })
        } else if (text === '减') {
            if (index - 1 < 1) {
                return
            }
            exerciseStore.currentAnswer.splice(index - 1, 1)
            exerciseStore.problemData.option.splice(index - 1, 1)
        }
    }

    //选择答案
    const handleClickAnswer = (index: number) => {
        exerciseStore.problemData.option.map((x: ICurrentAnswer, y: number) => {
            if (exerciseStore.problemData.type === 1) {
                if (y === index) {
                    x.statu = !x.statu
                } else {
                    x.statu = false
                }
            } else {
                if (y === index) {
                    x.statu = !x.statu
                }
            }
            return x
        })
    }

    return useObserver(() => {
        return (
            <MyTopicTEditor>
                <MyOptionLeft>
                    <MySpanName>选项数量</MySpanName>
                    <InputNumber
                        data={{
                            statu: exerciseStore.problemData.option.length >= 10 ? true : false,
                            statu2: exerciseStore.problemData.option.length === 1 ? true : false,
                            len: exerciseStore.problemData.option.length,
                        }}
                        onClickAnswerNumber={handleClickAnswerNumber}
                    />
                </MyOptionLeft>
                <MyOptionRight>
                    <MySpanName>正确选项</MySpanName>
                    <MyAnswerOption>
                        {exerciseStore.problemData.option.map((item: any, index: number) => (
                            <MyAnswerOptionName
                                key={index}
                                isSelected={item.statu}
                                title={`选择${answerOption[index]}`}
                                onClick={() => handleClickAnswer(index)}
                            >
                                {answerOption[index]}
                            </MyAnswerOptionName>
                        ))}
                    </MyAnswerOption>
                </MyOptionRight>
            </MyTopicTEditor>
        )
    })
}
export default OptionA
