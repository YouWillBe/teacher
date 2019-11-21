/*
    试卷分析
 */
import React, { FC, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../store'
import Ranking from '../AnalysiCommon/Ranking'
import Back from './Back'
import Pie from './Pie'
import LoreNumber from './LoreNumber'

interface IProps {
    id: string
    studentId: string
    courseId: string
    testType: string
}

const Container = styled.div`
    width: 1260px;
    margin: 0 auto;
`
const Header = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const StudentInfo = styled.div`
    display: flex;
`
const Student = styled.div`
    min-width: 180px;
`
const StudentName = styled.span`
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
`
const StudentType = styled.span`
    display: inline-block;
    width: 60px;
    border-right: 1px solid rgba(20, 78, 94, 1);
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(20, 78, 94, 1);
    margin-right: 20px;
`

const KnowledgeWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 240px 1fr;
    grid-column-gap: 20px;
    height: 240px;
    margin: 20px 0;
`
const Knowledge = styled.div`
    padding: 20px;
    box-shadow: 0px 2px 4px 0px rgba(100, 115, 219, 0.09);
    border-radius: 4px;
`

const Package = styled.div`
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 6px;
    padding: 20px;
    margin-bottom: 20px;
`
const LoreName = styled.div`
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-bottom: 20px;
`

const PaperAnalysis: FC<RouteComponentProps<IProps>> = props => {
    const { courseIndexStore } = useContext<IStore>(MobXProviderContext)

    useEffect(() => {
        let data = {
            id: props.location!.state.id,
            studentId: props.location!.state.studentId,
            courseId: props.location!.state.courseId,
            testType: props.location!.state.testType,
        }
        courseIndexStore.getTestAcademicAnalysisVolume(data)
        // eslint-disable-next-line
    }, [props.location!.state.id, props.location!.state.studentId])

    return useObserver(() => {
        return (
            <Container>
                <Header>
                    <Back data={{ url: props.uri }}></Back>
                    <StudentInfo>
                        <Student>
                            <StudentType>学生</StudentType>
                            <StudentName>{courseIndexStore.testAcademicAnalysisVolume.studentName}</StudentName>
                        </Student>
                        <Student>
                            <StudentType>试卷</StudentType>
                            <StudentName>{courseIndexStore.testAcademicAnalysisVolume.testName}</StudentName>
                        </Student>
                    </StudentInfo>
                </Header>
                <KnowledgeWrap>
                    {courseIndexStore.gettingTestAcademicAnalysisVolume ? (
                        <>
                            <Knowledge>
                                <Pie
                                    text='正确率最高的'
                                    data={courseIndexStore.testAcademicAnalysisVolume.bestLore}
                                ></Pie>
                            </Knowledge>
                            <Knowledge>
                                <Pie
                                    text='正确率最低的'
                                    data={courseIndexStore.testAcademicAnalysisVolume.worstLore}
                                ></Pie>
                            </Knowledge>
                        </>
                    ) : null}

                    <Knowledge>
                        <LoreNumber
                            data={{
                                text: '知识点数量',
                                loreCount: courseIndexStore.testAcademicAnalysisVolume.loreCount,
                                typeText: '个',
                                setColor: '#6D8DD2',
                            }}
                        ></LoreNumber>
                        <LoreNumber
                            data={{
                                text: '薄弱知识点',
                                loreCount: courseIndexStore.testAcademicAnalysisVolume.weaknessLoreCount,
                                typeText: '个',
                                setColor: '#996DD2',
                            }}
                        ></LoreNumber>
                    </Knowledge>
                    <Knowledge>
                        <LoreNumber
                            data={{
                                text: '试卷正确率',
                                loreCount: courseIndexStore.testAcademicAnalysisVolume.loreCount,
                                typeText: '%',
                                setColor: '#ED5083',
                            }}
                        ></LoreNumber>
                        <LoreNumber
                            data={{
                                text: '该卷在班里排名',
                                loreCount: courseIndexStore.testAcademicAnalysisVolume.rank,
                                typeText: '/' + courseIndexStore.testAcademicAnalysisVolume.totalRank,
                                setColor: '#3A93DF',
                            }}
                        ></LoreNumber>
                    </Knowledge>
                </KnowledgeWrap>
                <Package>
                    <LoreName>知识点排行（全班平均正确率）</LoreName>
                    {courseIndexStore.testAcademicAnalysisVolume.loreDTOList.map((item, index) => (
                        <Ranking key={index} data={item}></Ranking>
                    ))}
                </Package>
            </Container>
        )
    })
}

export default PaperAnalysis
