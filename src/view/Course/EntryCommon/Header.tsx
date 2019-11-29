import React, { FC } from 'react'
import styled from '@emotion/styled'

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
    font-family: PingFangSC;
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
    font-family: PingFangSC;
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
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(70, 176, 178, 1);
`
const CorrectRateScore = styled.span`
    font-size: 20px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(70, 176, 178, 1);
`

interface IProps {
    data: {
        studentAccuracyCount: {
            excellent: number
            fine: number
            medium: number
            fail: number
        }
        testScore: {
            totalScore: number
            avgScore: number
            maxScore: number
            minScore: number
        }
        totalAccuracy: {}
        name: string
        title: string
    }
}
const Header: FC<IProps> = props => {
    return (
        <Container>
            <NameWrap>
                <Title>{props.data.title}</Title>
                <Vertical>|</Vertical>
                <TitleType>{props.data.name}</TitleType>
            </NameWrap>
            <FractionWrap>
                <CorrectWrap>
                    <HAccuracy
                        data={{ name: '正确率', people: '人数', Color: '#6E25D5', Color1: '#6E25D5' }}
                    ></HAccuracy>
                    <HAccuracy
                        data={{
                            name: '90-100',
                            people: props.data.studentAccuracyCount.excellent,
                            Color: '#0A9B47',
                            Color1: '#3A93DF',
                        }}
                    ></HAccuracy>
                    <HAccuracy
                        data={{
                            name: '70-89',
                            people: props.data.studentAccuracyCount.fine,
                            Color: '#46B0B2',
                            Color1: '#3A93DF',
                        }}
                    ></HAccuracy>
                    <HAccuracy
                        data={{
                            name: '60-69',
                            people: props.data.studentAccuracyCount.medium,
                            Color: '#E7AD05',
                            Color1: '#3A93DF',
                        }}
                    ></HAccuracy>
                    <HAccuracy
                        data={{
                            name: '0 -59',
                            people: props.data.studentAccuracyCount.fail,
                            Color: '#F17271',
                            Color1: '#3A93DF',
                        }}
                    ></HAccuracy>
                </CorrectWrap>
                <TotalScoreWrap>
                    <HScore data={{ name: '总分', score: props.data.testScore.totalScore, Color: '#527DD7' }}></HScore>
                    <HScore data={{ name: '平均分', score: props.data.testScore.avgScore, Color: '#68DCE7' }}></HScore>
                    <HScore data={{ name: '最高分', score: props.data.testScore.maxScore, Color: '#9EE379' }}></HScore>
                    <HScore data={{ name: '最低分', score: props.data.testScore.minScore, Color: '#FF8C8C' }}></HScore>
                </TotalScoreWrap>
                <CorrectRate>
                    <CorrectRateName>{props.data.totalAccuracy}%</CorrectRateName>
                    <CorrectRateScore>总正确率</CorrectRateScore>
                </CorrectRate>
            </FractionWrap>
        </Container>
    )
}

export default Header
