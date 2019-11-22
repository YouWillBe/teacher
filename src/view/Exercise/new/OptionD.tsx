import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../store'
import InputNumber from './InputNumber'

const MyOptionLeft = styled.div`
    display: flex;
    align-items: center;
    margin-right: 100px;
    margin-left: 20px;
`
const MySpanName = styled.span`
    font-size: 16px;
    font-family: PingFangSC, sans-serif;
    font-weight: 100;
    color: rgba(58, 147, 223, 1);
`

const OptionC: FC = () => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)

    //选项数量
    const handleClickAnswerNumber = (text: string, index: number) => {
        if (text === '加') {
            if (index + 1 > 10) {
                return
            }
            exerciseStore.problemData.answerCount = exerciseStore.problemData.answerCount + 1
        } else if (text === '减') {
            if (index - 1 < 1) {
                return
            }
            exerciseStore.problemData.answerCount = exerciseStore.problemData.answerCount - 1
        }
    }

    return useObserver(() => {
        return (
            <MyOptionLeft>
                <MySpanName>小题数量</MySpanName>
                <InputNumber
                    data={{
                        statu: exerciseStore.problemData.answerCount >= 10,
                        statu2: exerciseStore.problemData.answerCount === 1,
                        len: exerciseStore.problemData.answerCount,
                    }}
                    onClickAnswerNumber={handleClickAnswerNumber}
                />
            </MyOptionLeft>
        )
    })
}
export default OptionC
