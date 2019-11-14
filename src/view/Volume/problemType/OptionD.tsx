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
    font-family: PingFangSC;
    font-weight: 100;
    color: rgba(58, 147, 223, 1);
`

const OptionC: FC = props => {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)

    //选项数量
    const handleClickAnswerNumber = (text: string, index: number) => {
        if (text === '加') {
            if (index + 1 > 10) {
                return
            }
            volumeStore.volumeProblem.answerCount = volumeStore.volumeProblem.answerCount + 1
        } else if (text === '减') {
            if (index - 1 < 1) {
                return
            }
            volumeStore.volumeProblem.answerCount = volumeStore.volumeProblem.answerCount - 1
        }
    }

    return useObserver(() => {
        return (
            <MyOptionLeft>
                <MySpanName>小题数量</MySpanName>
                <InputNumber
                    data={{
                        statu: volumeStore.volumeProblem.answerCount >= 10 ? true : false,
                        statu2: volumeStore.volumeProblem.answerCount === 1 ? true : false,
                        len: volumeStore.volumeProblem.answerCount,
                    }}
                    onClickAnswerNumber={handleClickAnswerNumber}
                />
            </MyOptionLeft>
        )
    })
}
export default OptionC
