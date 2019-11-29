import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../store'
import Dialog from '../../../components/Dialog'
import Section from './Section'

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`
const TotalScoreWrpa = styled.div`
    display: flex;
`
const TotalScore = styled.div`
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
`
const TipsWrap = styled.div`
    display: flex;
    align-items: center;
`
const Tips = styled.div`
    font-size: 18px;
    font-family: PingFangSC-Light, PingFangSC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
`
const Tips1 = styled.div`
    font-size: 16px;
    font-family: PingFangSC-Light, PingFangSC;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`

interface IProps {
    onClickClose(): void
}

function PreviewList(props: IProps) {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)

    //总分/总题数
    const totalScore = () => {
        let choiceTotal = 0
        let choiceTotalNumber = 0
        let checkboxTotal = 0
        let checkboxTotalNumber = 0
        let judgeTotal = 0
        let judgeTotalNumber = 0
        let fillingTotal = 0
        let fillingTotalNumber = 0
        let shortAnswerTotal = 0
        let shortAnswerTotalNumber = 0
        let fraction = volumeStore.volumeOutline.problemFraction
        if (volumeStore.volumeOutline.choiceProblems.length) {
            choiceTotalNumber = volumeStore.volumeOutline.choiceProblems.length
            if (fraction) {
                choiceTotal = fraction.chioceFraction * volumeStore.volumeOutline.choiceProblems.length
            }
        }
        if (volumeStore.volumeOutline.checkboxProblems.length) {
            checkboxTotalNumber = volumeStore.volumeOutline.checkboxProblems.length
            if (fraction) {
                checkboxTotal = fraction.checkboxFraction * volumeStore.volumeOutline.checkboxProblems.length
            }
        }
        if (volumeStore.volumeOutline.judgeProblems.length) {
            judgeTotalNumber = volumeStore.volumeOutline.judgeProblems.length
            if (fraction) {
                judgeTotal = fraction.judgeFraction * volumeStore.volumeOutline.judgeProblems.length
            }
        }
        if (volumeStore.volumeOutline.fillingProblems.length) {
            fillingTotalNumber = volumeStore.volumeOutline.fillingProblems.length
            fillingTotal = volumeStore.volumeOutline.fillingProblems.reduce(
                (total, num) => total + (num.fraction || 0),
                0
            )
        }
        if (volumeStore.volumeOutline.shortAnswerProblems.length) {
            shortAnswerTotalNumber = volumeStore.volumeOutline.shortAnswerProblems.length
            shortAnswerTotal = volumeStore.volumeOutline.shortAnswerProblems.reduce(
                (total, num) => total + (num.fraction || 0),
                0
            )
        }
        return {
            totalScore: choiceTotal + checkboxTotal + judgeTotal + fillingTotal + shortAnswerTotal,
            totalNumber:
                choiceTotalNumber +
                checkboxTotalNumber +
                judgeTotalNumber +
                fillingTotalNumber +
                shortAnswerTotalNumber,
            choiceTotal,
            checkboxTotal,
            judgeTotal,
            fillingTotal,
            shortAnswerTotal,
        }
    }

    return useObserver(() => {
        return (
            <Dialog title='修改试卷结构' onClickClose={props.onClickClose}>
                <Header>
                    <TotalScoreWrpa>
                        <TotalScore>总分：{totalScore().totalScore}</TotalScore>
                        <TotalScore>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总题：{totalScore().totalNumber}</TotalScore>
                    </TotalScoreWrpa>
                    <TipsWrap>
                        <Tips>提示：</Tips>
                        <Tips1>1.数字为黑色的题目为题目</Tips1>
                        <Tips1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.数字为红的题目为空题目</Tips1>
                    </TipsWrap>
                </Header>
                <Section totalScore={totalScore} onClickClose={props.onClickClose}></Section>
            </Dialog>
        )
    })
}

export default PreviewList
