import React, { FC, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../store'
import StudentList from './StudentList'
import Pie from '../../Course/PersonalAnalysis/Pie'
import LoreNumber from '../../Course/PersonalAnalysis/LoreNumber'
import LoreList from '../../Course/PersonalAnalysis/LoreList'
import Radar from '../../../components/Echarts/Radar'
import Line from '../../../components/Echarts/Line'

const Container = styled.div`
    width: 100%;
    height: 100%;
`
const KnowledgeWrap = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 240px 1fr;
    grid-column-gap: 20px;
    margin: 20px 0;
`
const Knowledge = styled.div`
    box-sizing: border-box;
    height: 300px;
    padding: 20px;
    box-shadow: 0 2px 4px 0 rgba(100, 115, 219, 0.09);
    border-radius: 4px;
`

const RadarWrap = styled.div`
    box-sizing: border-box;
    width: 510px;
    height: 300px;
    box-shadow: 0 2px 4px 0 rgba(100, 115, 219, 0.09);
    border-radius: 4px;
    padding: 20px;
`
const Package = styled.div`
    width: 100%;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 4px 0 rgba(31, 122, 171, 0.2);
    border-radius: 6px;
    padding: 20px;
    margin-bottom: 20px;
`
const Package1 = styled.div`
    width: 100%;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 4px 0 rgba(31, 122, 171, 0.2);
    border-radius: 6px;
    margin-bottom: 20px;
`
const LoreName = styled.div`
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-bottom: 20px;
`
const LineWrap = styled.div`
    width: 100%;
    height: 250px;
`
const KnowledgeWrap1 = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    margin: 20px 0;
`

interface IProps {
    studentId: string
}

const Class: FC<RouteComponentProps<IProps>> = props => {
    const { analysisStore } = useContext<IStore>(MobXProviderContext)

    useEffect(() => {
        analysisStore.getTeacherTeams()
        analysisStore.getTeacherTotalAnalysis(Number(props.studentId))
        // eslint-disable-next-line
    }, [props.studentId])

    return useObserver(() => {
        return (
            <Container>
                <KnowledgeWrap>
                    <Knowledge>
                        {analysisStore.teacherTotalAnalysisReady ? (
                            <Pie
                                text='班级正确率'
                                data={{
                                    avgAccuracy: analysisStore.teacherTotalAnalysis.classAccuracy,
                                }}
                            ></Pie>
                        ) : null}
                    </Knowledge>
                    <Knowledge>
                        <LoreNumber
                            data={{
                                text: '测试 班级排名',
                                loreCount: analysisStore.teacherTotalAnalysis.teamRanking,
                                typeText: '名',
                                setColor: '#FFC821',
                            }}
                        />
                        <LoreNumber
                            data={{
                                text: '测试 最高正确率',
                                loreCount: analysisStore.teacherTotalAnalysis.bestAccuracy,
                                typeText: '%',
                                setColor: '#42C3D0',
                            }}
                        />
                    </Knowledge>
                    <Knowledge>
                        <LoreNumber
                            data={{
                                text: '知识点数量',
                                loreCount: analysisStore.teacherTotalAnalysis.loreCount,
                                typeText: '个',
                                setColor: '#6D8DD2',
                            }}
                        />
                        <LoreNumber
                            data={{
                                text: '薄弱知识点',
                                loreCount: analysisStore.teacherTotalAnalysis.weaknessLoreCount,
                                typeText: '个',
                                setColor: '#996DD2',
                            }}
                        />
                    </Knowledge>
                    <RadarWrap>
                        {analysisStore.teacherTotalAnalysisReady ? (
                            <Radar
                                data={{
                                    indicator: analysisStore.teacherTotalAnalysis.sectionLoreAccuracy.map(item => {
                                        return { max: item.max, name: item.name }
                                    }),
                                    series: analysisStore.teacherTotalAnalysis.sectionLoreAccuracy.map(item => {
                                        return item.accuracy
                                    }),
                                    labels: analysisStore.teacherTotalAnalysis.sectionLoreAccuracy.map(item => {
                                        return item.name
                                    }),
                                    textStyle: {
                                        titleText: '章节知识点正确率雷达图',
                                    },
                                }}
                            ></Radar>
                        ) : null}
                    </RadarWrap>
                </KnowledgeWrap>
                <Package>
                    <LoreName>班级最近7周正确率情况</LoreName>
                    <LineWrap>
                        {analysisStore.teacherTotalAnalysisReady ? (
                            <Line
                                data={analysisStore.teacherTotalAnalysis.latelyClassTestAccuracy.weekAccuracyList}
                            ></Line>
                        ) : null}
                    </LineWrap>
                </Package>
                <KnowledgeWrap1>
                    <Knowledge>
                        {analysisStore.teacherTotalAnalysis.bestLores.map((item, index) => (
                            <LoreList
                                key={index}
                                data={{
                                    ...item,
                                    index,
                                    colorArr: ['#23710C', '#219600', '#29C000', '#6FD554', '#9EE379'],
                                }}
                            />
                        ))}
                    </Knowledge>
                    <Knowledge>
                        {analysisStore.teacherTotalAnalysis.worstLores.map((item, index) => (
                            <LoreList
                                key={index}
                                data={{
                                    ...item,
                                    index,
                                    colorArr: ['#780000', '#AF0F0F', '#E33939', '#F66868', '#F18787'],
                                }}
                            />
                        ))}
                    </Knowledge>
                </KnowledgeWrap1>
                <Package1>
                    <StudentList
                        data={{
                            title: '班级排名',
                            Color: '#4CDF78',
                            url: `${props.uri}`,
                            studentList: analysisStore.teacherTotalAnalysis.classStudentRanking,
                        }}
                    />
                </Package1>
            </Container>
        )
    })
}

export default Class
