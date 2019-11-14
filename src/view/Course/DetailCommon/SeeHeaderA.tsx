import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { navigate } from '@reach/router'
import { TiArrowBackOutline } from 'react-icons/ti'
import { RouteComponentProps } from '@reach/router'

import { IStore } from '../../../store'
import Circle from '../../../components/Echarts/Circle'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 320px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    border: 3px solid rgba(255, 255, 255, 1);
    padding: 0 30px;
`

const TitleWrap = styled.div`
    width: 450px;
    display: flex;
    justify-content: space-between;
    margin: 20px 0 10px 0;
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
const FractionContainer = styled.div`
    display: flex;
    height: 240px;
`
const FeaturesWrap = styled.div`
    width: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const RutemWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 56px;
    line-height: 54px;
    box-shadow: 0px 6px 5px 0px rgba(59, 141, 242, 0.2);
    border-radius: 11px;
    border: 1px solid rgba(153, 153, 153, 1);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #999;
    cursor: pointer;
`

const RutemName = styled.span``
const CircleTypeWrap = styled.ul`
    box-sizing: border-box;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 30px;
`
const LiItem = styled.li`
    width: 160px;
    height: 160px;
`
const CircleWrap = styled.div`
    width: 100%;
    height: 100%;
`

const TestPaperWrap = styled.div``
const TotalScoreWrap = styled.div`
    width: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const TestPaper = styled.div`
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
`
const Fraction = styled.div`
    margin-top: 10px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(237, 80, 131, 1);
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
const TestTotalProblem = styled.div``
const TotalProblem = styled.div`
    text-align: center;
    font-size: 20px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(58, 147, 223, 1);
`

interface IProps {
    data: {
        name: string
        urlName: string
        seeName: string
    }
}
const SeeHeaderA: FC<RouteComponentProps<IProps>> = props => {
    const { courseIndexStore } = useContext<IStore>(MobXProviderContext)

    //返回首页/查看该卷分析/查看个人分析
    const handleClickLink = (statu: number) => {
        sessionStorage.removeItem('sessionCurrentType')
        if (statu === 1) {
            navigate(`/course/${courseIndexStore.studentVolume.courseId}/${props.data!.urlName}`)
        } else if (statu === 2) {
            navigate(`/${props.data!.seeName}/paper`, {
                state: {
                    id: courseIndexStore.testAcademicAnalysisVolumeID.id,
                    studentId: courseIndexStore.testAcademicAnalysisVolumeID.studentId,
                    courseId: courseIndexStore.testAcademicAnalysisVolumeID.courseId,
                    testType: courseIndexStore.testAcademicAnalysisVolumeID.testType,
                },
            })
        } else if (statu === 3) {
            navigate(`/${props.data!.seeName}/personal`, {
                state: {
                    studentId: courseIndexStore.testAcademicAnalysisVolumeID.studentId,
                },
            })
        }
    }

    return useObserver(() => {
        return (
            <Container>
                <TitleWrap>
                    <NameWrap>
                        <Title>学生</Title>
                        <Vertical>|</Vertical>
                        <TitleType>
                            {courseIndexStore.studentVolume && courseIndexStore.studentVolume.studentName}
                        </TitleType>
                    </NameWrap>
                    <NameWrap>
                        <Title>{props.data!.name}</Title>
                        <Vertical>|</Vertical>
                        <TitleType>
                            {courseIndexStore.studentVolume && courseIndexStore.studentVolume.testName}
                        </TitleType>
                    </NameWrap>
                </TitleWrap>
                <FractionContainer>
                    <FeaturesWrap>
                        <RutemWrap onClick={() => handleClickLink(1)}>
                            <TiArrowBackOutline></TiArrowBackOutline>
                            <RutemName>返回上一层</RutemName>
                        </RutemWrap>
                        <RutemWrap onClick={() => handleClickLink(2)}>
                            <RutemName>查看该卷分析</RutemName>
                        </RutemWrap>
                        <RutemWrap onClick={() => handleClickLink(3)}>
                            <RutemName>查看个人分析</RutemName>
                        </RutemWrap>
                    </FeaturesWrap>
                    <CircleTypeWrap>
                        {courseIndexStore.testAccuracy.problemAccuracy.map((item, index) => (
                            <LiItem key={index}>
                                <CircleWrap>
                                    <Circle
                                        data={{
                                            ...item,
                                            circleId: 'circle' + index,
                                        }}
                                    ></Circle>
                                </CircleWrap>
                            </LiItem>
                        ))}
                    </CircleTypeWrap>
                    <TotalScoreWrap>
                        <TestPaperWrap>
                            <TestPaper>试卷得分</TestPaper>
                            <Fraction>
                                <GetTotalScore>{courseIndexStore.testAccuracy.getTotalScore}</GetTotalScore>
                                <Skim>/</Skim>
                                <TestTotalScore>{courseIndexStore.testAccuracy.testTotalScore}</TestTotalScore>
                            </Fraction>
                        </TestPaperWrap>
                        <TestTotalProblem>
                            <TestPaper>总题数</TestPaper>
                            <TotalProblem>{courseIndexStore.testAccuracy.testTotalProblem}</TotalProblem>
                        </TestTotalProblem>
                    </TotalScoreWrap>
                </FractionContainer>
            </Container>
        )
    })
}

export default SeeHeaderA
