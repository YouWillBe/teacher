import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../../store'
import Circle1 from './Circle1.png'
import Circle2 from './Circle2.png'
import Circle3 from './Circle3.png'
import Circle4 from './Circle4.png'
import Button from '../../../components/Button'
import Editor from '../../../components/EditorX'

const Container = styled.div``
const Wrap = styled.div``

const Ul = styled.ul`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    margin: 20px 0;
`
const Li = styled.li`
    margin-right: 30px;
`
const Question = styled.div`
    box-sizing: border-box;
    width: 56px;
    height: 38px;
    line-height: 34px;
    text-align: center;
    border-radius: 4px;
    border: 2px solid rgba(7, 46, 132, 1);
    font-size: 18px;
    font-family: PingFangSC, sans-serif;
    font-weight: 600;
    color: rgba(7, 41, 121, 1);
`

const FractionWrap = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`
const TestPaperWrap = styled.div``

const TestPaper = styled.div`
    font-size: 14px;
    font-family: PingFangSC, sans-serif;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
`
const Fraction = styled.div`
    margin-top: 10px;
    font-family: PingFangSC, sans-serif;
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

const FontWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100px;
`
const BgCircle = styled.div<{ bgImage: string }>`
    width: 30px;
    height: 30px;
    background-image: ${props => (props.bgImage === '2' ? `url(${Circle1})` : `url(${Circle2})`)};
    box-shadow: 0px 4px 6px 0px rgba(78, 87, 234, 0.15);
    border-radius: 50%;
    cursor: pointer;
`
const BgCircle1 = styled.div<{ bgImage: string }>`
    width: 30px;
    height: 30px;
    background-image: ${props => (props.bgImage === '3' ? `url(${Circle3})` : `url(${Circle4})`)};
    box-shadow: 0px 4px 6px 0px rgba(78, 87, 234, 0.15);
    border-radius: 50%;
    cursor: pointer;
`
const Package = styled.div`
    background-color: #fff9bd;
    border-radius: 4px;
    margin-bottom: 20px;
`
const ButtonWrap = styled.div`
    button {
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 300;
    }
`
const ProblemText = styled.div`
    box-sizing: border-box;
    height: 50px;
    line-height: 48px;
    border-bottom: 1px solid rgba(151, 151, 151, 0.3);
    padding-left: 20px;
    font-size: 18px;
    font-family: PingFangSC, sans-serif;
    font-weight: 500;
    color: #ed5083;
`
const EditorWrap = styled.div`
    padding-left: 20px;
    padding-bottom: 20px;
`

const FractionListB: FC = props => {
    const { courseIndexStore } = useContext<IStore>(MobXProviderContext)

    //对错
    const handleClick = (text: string, index: number) => {
        if (text === '对') {
            if (courseIndexStore.testProblemDetailData.fractionList[index].fraction === '2') {
                courseIndexStore.testProblemDetailData.fractionList[index].fraction = ''
            } else {
                courseIndexStore.testProblemDetailData.fractionList[index].fraction = '2'
            }
        } else if (text === '错') {
            if (courseIndexStore.testProblemDetailData.fractionList[index].fraction === '3') {
                courseIndexStore.testProblemDetailData.fractionList[index].fraction = ''
            } else {
                courseIndexStore.testProblemDetailData.fractionList[index].fraction = '3'
            }
        }
    }

    //批注
    const handleChangePostilion = (value: Value) => {
        courseIndexStore.testProblemDetailData.teacherPostilion = value
    }

    const getFraction = () => {
        let fraction = 0
        let average = Math.floor(
            courseIndexStore.testProblemDetailData.fraction / courseIndexStore.testProblemDetailData.fractionList.length
        )
        let filterFraction = courseIndexStore.testProblemDetailData.fractionList.filter(item => item.fraction === '2')
        if (filterFraction.length === courseIndexStore.testProblemDetailData.fractionList.length) {
            fraction = courseIndexStore.testProblemDetailData.fraction
        } else if (filterFraction.length === 0) {
            fraction = 0
        } else {
            fraction = filterFraction.length * average
        }
        return fraction
    }

    //保存成绩
    const handleClickSave = () => {
        let isTrue = courseIndexStore.testProblemDetailData.fractionList.every(item => item.fraction === '2')
        let data = {
            id: courseIndexStore.testProblemDetailData.studentProblemTestId,
            studentTestId: courseIndexStore.testProblemDetailData.studentTestId,
            isTrue: isTrue ? 1 : 0,
            testVolumesProblemId: courseIndexStore.testProblemDetailData.id,
            fractionList: JSON.stringify(courseIndexStore.testProblemDetailData.fractionList),
            getFraction: getFraction(),
            teacherPostilion: JSON.stringify(courseIndexStore.testProblemDetailData.teacherPostilion),
        }
        courseIndexStore.testsStudentCheck(data)
    }

    const optionButton = {
        height: '50px',
        bgColor: '#185161',
        shadow: '0px 2px 4px 0px rgba(31,122,171,0.2)',
    }
    return useObserver(() => {
        return (
            <Container>
                <Wrap>
                    <FractionWrap>
                        <TestPaperWrap>
                            <TestPaper>该题得分</TestPaper>
                            <Fraction>
                                <GetTotalScore>{getFraction()}</GetTotalScore>
                                <Skim>/</Skim>
                                <TestTotalScore>{courseIndexStore.testProblemDetailData.fraction}</TestTotalScore>
                            </Fraction>
                        </TestPaperWrap>
                        <ButtonWrap>
                            <Button options={optionButton} onClick={handleClickSave}>
                                保存成绩
                            </Button>
                        </ButtonWrap>
                    </FractionWrap>
                    <Ul>
                        {courseIndexStore.testProblemDetailData.fractionList &&
                            courseIndexStore.testProblemDetailData.fractionList.map((item: any, index: number) => (
                                <Li key={index}>
                                    <Question>{index + 1}</Question>
                                    <FontWrap>
                                        <BgCircle
                                            title='对'
                                            bgImage={item.fraction}
                                            onClick={() => handleClick('对', index)}
                                        />
                                        <BgCircle1
                                            title='错'
                                            bgImage={item.fraction}
                                            onClick={() => handleClick('错', index)}
                                        />
                                    </FontWrap>
                                </Li>
                            ))}
                    </Ul>
                </Wrap>
                <Package>
                    <ProblemText>批注</ProblemText>
                    <EditorWrap>
                        <Editor
                            value={courseIndexStore.testProblemDetailData.teacherPostilion}
                            onChange={handleChangePostilion}
                        ></Editor>
                    </EditorWrap>
                </Package>
            </Container>
        )
    })
}

export default FractionListB
