import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../../store'
import HAccuracy from './HAccuracy'
import HScore from './HScore'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    padding: 20px;
`
const NameWrap = styled.div``

const Title = styled.span`
    display: inline-block;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC, sans-serif;
    font-weight: 500;
    color: rgba(20, 78, 94, 1);
`
const Vertical = styled.span`
    display: inline-block;
    width: 60px;
    text-align: center;
    color: #d4dae8;
`
const TitleType = styled.span`
    font-size: 18px;
    font-family: PingFangSC, sans-serif;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
`

const FractionWrap = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
`
const CorrectWrap = styled.div`
    width: 180px;
`
const TotalScoreWrap = styled.div`
    display: flex;
    height: 130px;
    flex-grow: 1;
    margin-left: 40px;
    padding: 0px 40px;
    border-left: 1px solid #979797;
    border-right: 1px solid #979797;
`
const CorrectRate = styled.div`
    width: 270px;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: center;
`
const CorrectRateName = styled.span`
    font-size: 40px;
    font-family: PingFangSC, sans-serif;
    font-weight: 500;
    color: rgba(70, 176, 178, 1);
`
const CorrectRateScore = styled.span`
    font-size: 20px;
    font-family: PingFangSC, sans-serif;
    font-weight: 500;
    color: rgba(70, 176, 178, 1);
`

const Header: FC = props => {
    const { courseClassTestStore } = useContext<IStore>(MobXProviderContext)

    return useObserver(() => {
        return (
            <Container>
                <NameWrap>
                    <Title>随堂测</Title>
                    <Vertical>|</Vertical>
                    <TitleType>{courseClassTestStore.classTest!.name}</TitleType>
                </NameWrap>
                <FractionWrap>
                    <CorrectWrap>
                        <HAccuracy data={{ name: '正确率', people: '人数', Color: '#6E25D5', Color1: '#6E25D5' }} />
                        <HAccuracy
                            data={{
                                name: '90-100',
                                people: courseClassTestStore.studentAccuracyCount.excellent,
                                Color: '#0A9B47',
                                Color1: '#3A93DF',
                            }}
                        />
                        <HAccuracy
                            data={{
                                name: '70-89',
                                people: courseClassTestStore.studentAccuracyCount.fine,
                                Color: '#46B0B2',
                                Color1: '#3A93DF',
                            }}
                        />
                        <HAccuracy
                            data={{
                                name: '60-69',
                                people: courseClassTestStore.studentAccuracyCount.medium,
                                Color: '#E7AD05',
                                Color1: '#3A93DF',
                            }}
                        />
                        <HAccuracy
                            data={{
                                name: '0 -59',
                                people: courseClassTestStore.studentAccuracyCount.fail,
                                Color: '#F17271',
                                Color1: '#3A93DF',
                            }}
                        />
                    </CorrectWrap>
                    <TotalScoreWrap>
                        <HScore
                            data={{ name: '总分', score: courseClassTestStore.testScore.totalScore, Color: '#527DD7' }}
                        />
                        <HScore
                            data={{ name: '平均分', score: courseClassTestStore.testScore.avgScore, Color: '#68DCE7' }}
                        />
                        <HScore
                            data={{ name: '最高分', score: courseClassTestStore.testScore.maxScore, Color: '#9EE379' }}
                        />
                        <HScore
                            data={{ name: '最低分', score: courseClassTestStore.testScore.minScore, Color: '#FF8C8C' }}
                        />
                    </TotalScoreWrap>
                    <CorrectRate>
                        <CorrectRateName>{courseClassTestStore.testAccuracy.totalAccuracy}%</CorrectRateName>
                        <CorrectRateScore>总正确率</CorrectRateScore>
                    </CorrectRate>
                </FractionWrap>
            </Container>
        )
    })
}

export default Header
