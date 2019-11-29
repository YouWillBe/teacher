import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../../store'
import boy from '../../boy.png'
import girl from '../../girl.png'

const Container = styled.div`
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    margin-top: 20px;
`
const Title = styled.div`
    box-sizing: border-box;
    height: 54px;
    line-height: 53px;
    font-size: 24px;
    font-family: PingFangSC, sans-serif;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid #979797;
    padding: 0 20px;
`
const Wrap = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 90px);
    grid-column-gap: 32px;
    justify-content: space-between;
    padding: 0 20px;
`

const TestDTOS = styled.li`
    width: 90px;
    height: 156px;
    padding: 10px 0;
    cursor: pointer;
`
const NoData = styled.li`
    width: 90px;
    height: 156px;
    padding: 10px 0;
`
const StudentImg = styled.div<{ bgColor: string; Image: number }>`
    width: 90px;
    height: 90px;
    background-image: url(${props => (props.Image ? boy : girl)});
    position: relative;
    ::before {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        background-color: ${props => props.bgColor};
        border-radius: 10px;
        position: absolute;
        bottom: 0;
        right: 0;
    }
`
const StudentName = styled.span`
    display: inline-block;
    width: 100%;
    height: 66px;
    line-height: 66px;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Regular, sans-serif;
    font-weight: 400;
    color: rgba(79, 157, 252, 1);
`

const ScheduleWrap = styled.div`
    width: 100%;
    height: 10px;
    background-color: rgba(239, 239, 239, 1);
    border-radius: 9px;
    margin-top: 10px;
    position: relative;
`
const Article = styled.div<{ bgColor: number }>`
    position: absolute;
    width: ${props => Math.ceil(props.bgColor) + '%'};
    transition: width 2s;
    height: 10px;
    border-radius: 9px;
    background-color: #0a9b47;
`

interface IUnfinishedStudentList {
    id: number
    testStatus: number
    studentId: number
    studentTestId: number
    studentStatus: number
    studentName: string
    studentSex: number
    accuracy: number
}
interface IParams {
    data: {
        title: string
        Color: string
        url: string
        studentList: IUnfinishedStudentList[]
    }
}
interface ITestDTOS {
    id: number
    studentId: number
    studentName: string
    studentSex: number
    studentStatus: number
    testStatus: number
    studentTestId: number
}
const StudentList: FC<IParams> = props => {
    const { courseExaminationStore } = useContext<IStore>(MobXProviderContext)

    const handleClickLink = (data: ITestDTOS) => {
        if (courseExaminationStore.examination) {
            sessionStorage.removeItem('sessionCurrentType')
            navigate(`/course/${courseExaminationStore.examination.courseId}/examination/${data.studentTestId}`, {
                state: {
                    testId: data.studentTestId,
                    id: courseExaminationStore.examination.key.id,
                    courseId: courseExaminationStore.examination.courseId,
                    status: true,
                },
            })
        }
    }
    return useObserver(() => {
        return (
            <Container>
                <Title>{props.data.title}</Title>
                <Wrap>
                    {props.data.studentList.length ? (
                        props.data.studentList.map((v, i) => (
                            <TestDTOS key={i} onClick={() => handleClickLink(v)} title={'正确率：' + v.accuracy + '%'}>
                                <StudentImg bgColor={props.data.Color} Image={v.studentSex} />
                                <ScheduleWrap>
                                    <Article bgColor={v.accuracy} />
                                </ScheduleWrap>
                                <StudentName>{v.studentName}</StudentName>
                            </TestDTOS>
                        ))
                    ) : (
                        <NoData />
                    )}
                </Wrap>
            </Container>
        )
    })
}

export default StudentList
