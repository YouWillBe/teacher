/*
    试卷情况分析
*/

import React, { FC, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../store'
import Ranking from './Ranking'
import SeeCenter from './SeeCenter'
import BarCylindrical from '../../../components/Echarts/BarCylindrical'
import CirclePie from '../../../components/Echarts/CirclePie'
import Back from './Back'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: auto;
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
const Container1 = styled.div`
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding-right: 5px;
`
const Wrap = styled.div`
    box-sizing: border-box;
    width: 1260px;
    margin: 0 auto;
`

const Package = styled.div`
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 6px;
    padding: 20px;
    margin-bottom: 20px;
`
const Package1 = styled(Package)`
    height: 320px;
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`
const TestName = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
`

const NameType = styled.span`
    width: 60px;
    text-align: center;
    border-right: 1px solid rgba(20, 78, 94, 0.1);
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC, sans-serif;
    font-weight: 500;
    color: rgba(20, 78, 94, 1);
    margin-right: 20px;
`
const Name = styled.span`
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
`

const NumberPeopleWrap = styled.div`
    width: 200px;
    display: flex;
    justify-content: space-between;
`
const NumberPeople = styled.div`
    text-align: center;
`
const NumberPeopleName = styled.div`
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-bottom: 10px;
`
const TotalCount = styled.span`
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC, sans-serif;
    font-weight: 500;
    color: rgba(237, 80, 131, 1);
`
const PassCount = styled.span`
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC, sans-serif;
    font-weight: 500;
    color: rgba(58, 147, 223, 1);
`
const ChartWrap = styled.div`
    display: flex;
`
const ChartLeft = styled.div`
    flex: 1;
    min-height: 200px;
`
const ChartRight = styled.div`
    width: 400px;
`

const LoreName = styled.div`
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-bottom: 20px;
`

interface IProps {
    testId: string
}

const PreviewAnalysis: FC<RouteComponentProps<IProps>> = props => {
    const { courseIndexStore } = useContext<IStore>(MobXProviderContext)

    useEffect(() => {
        courseIndexStore.getTestAccuracy(Number(props.testId))
        // eslint-disable-next-line
    }, [])

    return useObserver(() => {
        return (
            <Container1>
                <Container>
                    <Wrap>
                        <Package1>
                            <Header>
                                <Back data={{ url: props.uri }} />
                                <TestName>
                                    <NameType>试卷</NameType>
                                    <Name>{courseIndexStore.volumeDTO.name}</Name>
                                </TestName>
                                <NumberPeopleWrap>
                                    <NumberPeople>
                                        <NumberPeopleName>按时交卷人数</NumberPeopleName>
                                        <TotalCount>
                                            {courseIndexStore.gradeDataDTO.punctualCount}/
                                            {courseIndexStore.gradeDataDTO.totalCount}
                                        </TotalCount>
                                    </NumberPeople>
                                    <NumberPeople>
                                        <NumberPeopleName>合格人数</NumberPeopleName>
                                        <PassCount> {courseIndexStore.gradeDataDTO.passCount}</PassCount>
                                    </NumberPeople>
                                </NumberPeopleWrap>
                            </Header>
                            <ChartWrap>
                                <ChartLeft>
                                    {courseIndexStore.gettingTestAccuracy ? (
                                        <BarCylindrical
                                            data={{
                                                name: { text: '成绩情况', subtext: '正确率' },
                                                yAxisName: ['0-40', '40-60', '60-80', '80-90', '90-100'],
                                                seriesData: [
                                                    courseIndexStore.gradeDataDTO.bad,
                                                    courseIndexStore.gradeDataDTO.poor,
                                                    courseIndexStore.gradeDataDTO.medium,
                                                    courseIndexStore.gradeDataDTO.fine,
                                                    courseIndexStore.gradeDataDTO.excellent,
                                                ],
                                                totalCount: courseIndexStore.gradeDataDTO.totalCount,
                                            }}
                                        />
                                    ) : null}
                                </ChartLeft>
                                <ChartRight>
                                    {courseIndexStore.gettingTestAccuracy ? (
                                        <CirclePie
                                            data={{
                                                name: { text: '全班平均正确率' },
                                                seriesData: [
                                                    { value: courseIndexStore.gradeDataDTO.avgAccuracy, name: '正确' },
                                                    {
                                                        value: 100 - courseIndexStore.gradeDataDTO.avgAccuracy,
                                                        name: '错误',
                                                    },
                                                ],
                                            }}
                                        />
                                    ) : null}
                                </ChartRight>
                            </ChartWrap>
                        </Package1>
                        <Package>
                            <LoreName>知识点排行（全班平均正确率）</LoreName>
                            {courseIndexStore.loreDTOList.map((item, index) => (
                                <Ranking key={index} data={item} />
                            ))}
                        </Package>
                        <Package>
                            <SeeCenter />
                        </Package>
                    </Wrap>
                </Container>
            </Container1>
        )
    })
}

export default PreviewAnalysis
