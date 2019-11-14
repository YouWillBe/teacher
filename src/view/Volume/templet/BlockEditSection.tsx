import React, { useContext, useState } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import styled from '@emotion/styled'

import { IStore } from '../../../store'
import TObjective from './TObjective'
import TSubjective from './TSubjective'

const Container = styled.div`
    box-sizing: border-box;
`

const Columns = styled.div`
    display: grid;
    grid-template-columns: 120px 120px 1fr 1fr 200px;
    margin-bottom: 10px;
`

const FractionWrap = styled.div`
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
`

const Font = styled.div`
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    text-align: center;
`
const AmountWrap = styled(Font)``
const TotalWrap = styled(Font)``
const ScoreWrap = styled(Font)``

interface IProps {
    totalScore(): { totalScore: number; totalNumber: number }
}
function BlockEditSection(props: IProps) {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)
    const [typeArr] = useState([
        { type: '单', bgColor: '#145869' },
        { type: '多', bgColor: '#F96C3B' },
        { type: '判', bgColor: '#FF9A3C' },
    ])

    return useObserver(() => {
        return (
            <Container>
                <Columns>
                    <FractionWrap>总分 {props.totalScore().totalScore}</FractionWrap>
                    <FractionWrap>总题数 {props.totalScore().totalNumber}</FractionWrap>
                </Columns>
                <Columns>
                    <div></div>
                    <AmountWrap>数量</AmountWrap>
                    <ScoreWrap>每题分值</ScoreWrap>
                    <TotalWrap>题总分数</TotalWrap>
                    <div></div>
                </Columns>
                {volumeStore.templateDetail.objectiveProblems.map((item, index) => (
                    <TObjective
                        key={item.id}
                        data={{
                            index,
                            bgColor: typeArr[index].bgColor,
                            type: typeArr[index].type,
                            problemCount: item.problemCount,
                            problemScore: item.problemScore,
                        }}
                    ></TObjective>
                ))}
                <TSubjective
                    data={{
                        bgColor: '#E92A68',
                        type: '填',
                        problem: volumeStore.templateDetail.fillingProblems,
                    }}
                ></TSubjective>
                <TSubjective
                    data={{
                        bgColor: '#005691',
                        type: '答',
                        problem: volumeStore.templateDetail.shortAnswerProblems,
                    }}
                ></TSubjective>
            </Container>
        )
    })
}

export default BlockEditSection
