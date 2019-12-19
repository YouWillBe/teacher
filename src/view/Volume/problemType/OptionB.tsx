import React, { FC, useContext } from 'react'
import styled from 'styled-components'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { FaCheck, FaTimes } from 'react-icons/fa'

import { IStore } from '../../../store'

const MyOptionWrap = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
`

const MySpanName = styled.span`
    font-size: 16px;
    font-family: PingFangSC-Thin, sans-serif;
    font-weight: 100;
`
const MyAnswerOption = styled.div`
    margin-left: 30px;
`
const MyAnswerOptionName = styled.span<{ isStatu: boolean }>`
    display: inline-block;
    width: 40px;
    height: 40px;
    box-shadow: 0 3px 5px 0 rgba(221, 235, 250, 1);
    border-radius: 2px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
    background-color: ${props => (props.isStatu ? '#3A93DF' : '#fff')};
    color: ${props => (props.isStatu ? '#fff' : '#333')};
    user-select: none;
    svg {
        font-size: 20px;
    }
`

const OptionB: FC = () => {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)

    //答案
    const handleClickJudgeOption = (id: string) => {
        volumeStore.volumeProblem.answer = id
    }

    return useObserver(() => {
        return (
            <MyOptionWrap>
                <MySpanName>正确选项</MySpanName>
                <MyAnswerOption>
                    <MyAnswerOptionName
                        isStatu={volumeStore.volumeProblem.answer === '1'}
                        onClick={() => handleClickJudgeOption('1')}
                    >
                        <FaCheck />
                    </MyAnswerOptionName>
                    <MyAnswerOptionName
                        isStatu={volumeStore.volumeProblem.answer === '0'}
                        onClick={() => handleClickJudgeOption('0')}
                    >
                        <FaTimes />
                    </MyAnswerOptionName>
                </MyAnswerOption>
            </MyOptionWrap>
        )
    })
}
export default OptionB
