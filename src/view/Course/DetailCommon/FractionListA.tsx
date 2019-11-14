import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { IStore } from '../../../store'

const Container = styled.div`
    padding: 0 10px;
    margin: 20px 0;
`

const TestPaper = styled.div`
    font-size: 14px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
`
const Fraction = styled.div`
    margin-top: 10px;
    font-family: PingFangSC;
    font-weight: 500;
    color: #3a93df;
`
const GetTotalScore = styled.span`
    font-size: 36px;
`
const Skim = styled.span`
    display: inline-block;
    padding: 0 10px 0 20px;
`

const TestTotalScore = styled.span`
    font-size: 16px;
`

const FractionListA: FC = props => {
    const { courseIndexStore } = useContext<IStore>(MobXProviderContext)

    return useObserver(() => {
        return (
            <Container>
                <TestPaper>该题得分</TestPaper>
                <Fraction>
                    <GetTotalScore>{courseIndexStore.testProblemDetailData.getFraction || 0}</GetTotalScore>
                    <Skim>/</Skim>
                    <TestTotalScore>{courseIndexStore.testProblemDetailData.fraction}</TestTotalScore>
                </Fraction>
            </Container>
        )
    })
}

export default FractionListA
