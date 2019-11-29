import React, { FC, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps } from '@reach/router'

import { IStore } from '../../../store'
import StudentList from './StudentList'
import BarClass from '../../../components/Echarts/BarClass'
import BarStackedStrip from '../../../components/Echarts/BarStackedStrip'
import MultiLine from '../../../components/Echarts/MultiLine'
import LoreList from '../../Course/AnalysiCommon/LoreList'
import Loading from '../../../components/Loading'

const Container = styled.div`
    width: 100%;
    height: 100%;
`
const NoData = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Package = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-height: 200px;
    box-shadow: 0 2px 4px 0 rgba(100, 115, 219, 0.09);
    border-radius: 4px;
    padding: 20px;
    margin-top: 20px;
`
const Package1 = styled.div`
    width: 100%;
    min-height: 200px;
    box-shadow: 0 2px 4px 0 rgba(100, 115, 219, 0.09);
    border-radius: 4px;
    margin-bottom: 20px;
`
const BarStackedStripWrap = styled.div`
    width: 100%;
    height: 200px;
`

const KnowledgeWrap = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    margin: 20px 0;
`

const Overall: FC<RouteComponentProps> = () => {
    const { analysisStore } = useContext<IStore>(MobXProviderContext)

    useEffect(() => {
        analysisStore.getTestTotalAnalysisGrade()
        // eslint-disable-next-line
    }, [])

    return useObserver(() => {
        let latelyClassOneTestAccuracyList: any = {
            yAxisData: [],
            excellent: [],
            fine: [],
            medium: [],
            poor: [],
            bad: [],
        }
        analysisStore.testTotalAnalysisGrade.latelyClassOneTestAccuracyList.map(item => {
            latelyClassOneTestAccuracyList.yAxisData.push(item.className)
            latelyClassOneTestAccuracyList.excellent.push(item.excellent)
            latelyClassOneTestAccuracyList.fine.push(item.fine)
            latelyClassOneTestAccuracyList.medium.push(item.medium)
            latelyClassOneTestAccuracyList.poor.push(item.poor)
            latelyClassOneTestAccuracyList.bad.push(item.bad)
            return item
        })

        let latelyClassTestAccuracyList: any = {
            nameData: [],
            weekList: [],
            metaDate: [],
        }
        analysisStore.testTotalAnalysisGrade.latelyClassTestAccuracyList.map(item => {
            latelyClassTestAccuracyList.nameData.push(item.className)
            latelyClassTestAccuracyList.weekList.push(item.weekAccuracyList.map(t => t.week))
            latelyClassTestAccuracyList.metaDate.push(item.weekAccuracyList.map(t => t.accuracy))
            return item
        })

        return (
            <Container>
                {analysisStore.testTotalAnalysisGradeReady ? (
                    <>
                        <Package>
                            <BarClass
                                data={{
                                    yAxisData: analysisStore.testTotalAnalysisGrade.classAccuracyList.map(
                                        t => t.className
                                    ),
                                    seriesData: analysisStore.testTotalAnalysisGrade.classAccuracyList.map(
                                        t => t.accuracy
                                    ),
                                    titleText: '班级总体正确率',
                                }}
                            ></BarClass>
                        </Package>
                        <Package>
                            <MultiLine
                                data={{
                                    nameData: latelyClassTestAccuracyList.nameData,
                                    xAxisData: latelyClassTestAccuracyList.weekList,
                                    metaDate: latelyClassTestAccuracyList.metaDate,
                                    titleText: '班级最近7周测试情况',
                                }}
                            ></MultiLine>
                        </Package>
                        <Package>
                            <BarStackedStripWrap>
                                <BarStackedStrip
                                    data={{
                                        yAxisData: latelyClassOneTestAccuracyList.yAxisData,
                                        titleText: '最近一次测试 成绩分布',
                                        excellent: latelyClassOneTestAccuracyList.excellent,
                                        fine: latelyClassOneTestAccuracyList.fine,
                                        medium: latelyClassOneTestAccuracyList.medium,
                                        poor: latelyClassOneTestAccuracyList.poor,
                                        bad: latelyClassOneTestAccuracyList.bad,
                                    }}
                                ></BarStackedStrip>
                            </BarStackedStripWrap>
                        </Package>
                        <KnowledgeWrap>
                            <Package>
                                <LoreList
                                    data={{
                                        loreList: analysisStore.testTotalAnalysisGrade.bestLores,
                                        name: '排名最高的知识点',
                                        colorArr: ['#23710C', '#219600', '#29C000', '#6FD554', '#9EE379'],
                                    }}
                                ></LoreList>
                            </Package>
                            <Package>
                                <LoreList
                                    data={{
                                        loreList: analysisStore.testTotalAnalysisGrade.worstLores,
                                        name: '排名最低的知识点',
                                        colorArr: ['#780000', '#AF0F0F', '#E33939', '#F66868', '#F18787'],
                                    }}
                                ></LoreList>
                            </Package>
                        </KnowledgeWrap>
                        <Package1>
                            <StudentList
                                data={{
                                    title: '成绩前列',
                                    Color: '#4CDF78',
                                    url: '',
                                    studentList: analysisStore.testTotalAnalysisGrade.bestStudentList,
                                }}
                            />
                        </Package1>
                        <Package1>
                            <StudentList
                                data={{
                                    title: '成绩后列',
                                    Color: '#ef6666',
                                    url: '',
                                    studentList: analysisStore.testTotalAnalysisGrade.worstStudentList,
                                }}
                            />
                        </Package1>
                    </>
                ) : (
                    <NoData>
                        <Loading></Loading>
                    </NoData>
                )}
            </Container>
        )
    })
}

export default Overall
