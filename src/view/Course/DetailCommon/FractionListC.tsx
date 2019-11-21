import React, { FC, useContext, useEffect, useState, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../../store'
import Button from '../../../components/Button'
import Editor from '../../../components/EditorX'

const Container = styled.div``
const Wrap = styled.div``

const Ul = styled.ul`
    width: 100%;
    /* height: 80px; */
    box-sizing: border-box;
    display: flex;
    margin: 20px 0;
`
const Li = styled.li`
    margin-right: 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const Question = styled.div`
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
`
const FractionWrap = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`
const TestPaperWrap = styled.div``

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

const Input = styled.input`
    width: 92px;
    height: 50px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px 0px rgba(78, 140, 247, 0.14);
    border-radius: 10px;
    padding: 0 6px;
    margin-top: 20px;
    outline: none;
    border: none;
    font-size: 24px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(237, 80, 131, 1);
    text-align: center;
`

const Package = styled.div`
    background-color: #fff9bd;
    border-radius: 4px;
    margin-bottom: 20px;
`
const ButtonWrap = styled.div``
const ProblemText = styled.div`
    box-sizing: border-box;
    height: 50px;
    line-height: 48px;
    border-bottom: 1px solid rgba(151, 151, 151, 0.3);
    padding-left: 20px;
    font-size: 18px;
    font-family: PingFangSC;
    font-weight: 500;
    color: #ed5083;
`
const EditorWrap = styled.div`
    padding-left: 20px;
    padding-bottom: 20px;
`

const FractionListC: FC = props => {
    const { courseIndexStore } = useContext<IStore>(MobXProviderContext)
    const [fraction, setFraction] = useState(0)
    const [currentFraction, setCurrentFraction] = useState(0)

    useEffect(() => {
        let num = 0
        courseIndexStore.testProblemDetailData.fractionList.map((item, index) => {
            num += Number(item.fraction)
            return item
        })
        setFraction(num)
        // eslint-disable-next-line
    }, [courseIndexStore.testProblemDetailData.id])

    //批注
    const handleChangePostilion = (value: Value) => {
        courseIndexStore.testProblemDetailData.teacherPostilion = value
    }

    //分值
    const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        let num = 0

        courseIndexStore.testProblemDetailData.fractionList.map((item, index) => {
            if (index === i) {
                item.fraction = e.target.value
                num += Number(e.target.value)
            } else {
                num += Number(item.fraction)
            }
            return item
        })
        setFraction(num)
        setCurrentFraction(Number(e.target.value))
    }
    const handleBlur = (i: number) => {
        let num = 0
        courseIndexStore.testProblemDetailData.fractionList.map((item, index) => {
            if (index === i) {
                if (fraction > courseIndexStore.testProblemDetailData.fraction) {
                    item.fraction = (
                        courseIndexStore.testProblemDetailData.fraction -
                        (fraction - currentFraction)
                    ).toString()
                    num += Number(courseIndexStore.testProblemDetailData.fraction - (fraction - currentFraction))
                } else {
                    num += Number(item.fraction)
                }
            } else {
                num += Number(item.fraction)
            }
            setFraction(num)
            return item
        })
        courseIndexStore.testProblemDetailData.getFraction = num
    }

    //保存成绩
    const handleClickSave = () => {
        let isTrue = 0
        if (courseIndexStore.testProblemDetailData.fraction === fraction) {
            isTrue = 1
        } else {
            isTrue = 0
        }
        let data = {
            id: courseIndexStore.testProblemDetailData.studentProblemTestId,
            studentTestId: courseIndexStore.testProblemDetailData.studentTestId,
            isTrue,
            fractionList: JSON.stringify(courseIndexStore.testProblemDetailData.fractionList),
            getFraction: fraction,
            teacherPostilion: JSON.stringify(courseIndexStore.testProblemDetailData.teacherPostilion),
        }
        courseIndexStore.testsStudentCheck(data)
    }

    const buttonOption = {
        width: '170px',
        height: '50px',
        bgColor: '#185161',
        size: '16px',
        family: 'PingFangSC',
        weight: '300',
        radius: '10px',
        shadow: '0px 2px 4px 0px rgba(31,122,171,0.2)',
        border: '3px solid rgba(255,255,255,1)',
    }
    return useObserver(() => {
        return (
            <Container>
                <Wrap>
                    <FractionWrap>
                        <TestPaperWrap>
                            <TestPaper>该题得分</TestPaper>
                            <Fraction>
                                <GetTotalScore>{courseIndexStore.testProblemDetailData.getFraction || 0}</GetTotalScore>
                                <Skim>/</Skim>
                                <TestTotalScore>{courseIndexStore.testProblemDetailData.fraction}</TestTotalScore>
                            </Fraction>
                        </TestPaperWrap>
                        <ButtonWrap>
                            <Button options={buttonOption} onClick={handleClickSave}>
                                保存成绩
                            </Button>
                        </ButtonWrap>
                    </FractionWrap>
                    <Ul>
                        {courseIndexStore.testProblemDetailData.fractionList.map((item: any, index: number) => (
                            <Li key={index}>
                                <Question>第{index + 1}题</Question>
                                <Input
                                    type='text'
                                    value={item.fraction}
                                    onChange={e => handleChange(e, index)}
                                    onBlur={() => handleBlur(index)}
                                />
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

export default FractionListC
