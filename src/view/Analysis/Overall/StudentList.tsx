import React, { FC } from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'

import boy from '../../Course/boy.png'
import girl from '../../Course/girl.png'

const Container = styled.div`
    width: 100%;
`
const Title = styled.div`
    box-sizing: border-box;
    font-size: 24px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid #979797;
    padding: 20px;
`
const Wrap = styled.div`
    display: grid;
    grid-template-columns: repeat(9, 90px);
    grid-column-gap: 10px;
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
`
const StudentName = styled.span`
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Regular;
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

interface IParams {
    data: {
        title: string
        Color: string
        url: string
        studentList: ITestDTOS[]
    }
}
interface ITestDTOS {
    accuracy: number
    studentId: number
    studentName: string
    sex: number
}

const StudentList: FC<IParams> = props => {
    const handleClickLink = (data: ITestDTOS) => {
        navigate(`/analysis/student/${data.studentId}`, {
            state: { studentId: data.studentId, returnLine: `${props.data.url}` },
        })
    }
    return (
        <Container>
            <Title>{props.data.title}</Title>
            <Wrap>
                {props.data.studentList.length ? (
                    props.data.studentList.map((v, i) => (
                        <TestDTOS
                            key={i}
                            onClick={() => handleClickLink(v)}
                            title={`${v.studentName} 正确率：${v.accuracy} %`}
                        >
                            <StudentImg bgColor={props.data.Color} Image={v.sex} />
                            <ScheduleWrap>
                                <Article bgColor={v.accuracy} />
                            </ScheduleWrap>
                            <StudentName>{v.studentName}</StudentName>
                        </TestDTOS>
                    ))
                ) : (
                    <NoData></NoData>
                )}
            </Wrap>
        </Container>
    )
}

export default StudentList
