import React, { FC } from 'react'
import styled from 'styled-components'

import boy from '../../../images/boy.png'
import girl from '../../../images/girl.png'
import Total from '../../../components/Toast'

const Container = styled.ul`
    display: grid;
    grid-template-columns: repeat(7, 90px);
    grid-column-gap: 32px;
    justify-content: space-between;
`
const TestDTOS = styled.li`
    width: 90px;
    height: 156px;
    margin-bottom: 20px;
    cursor: pointer;
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
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(79, 157, 252, 1);
`
interface IProps {
    data: {
        id: number
        studentId: number
        studentName: string
        studentSex: number
        studentStatus: number
        testStatus: number
        studentTestId: number
    }[]
}
const Student: FC<IProps> = props => {
    const handleClickLink = () => {
        Total.warning('需要收卷才能看学生作答')
    }
    return (
        <Container>
            {props.data.map((v, i) => (
                <TestDTOS key={i} onClick={handleClickLink} title={v.studentStatus === 3 ? '已交卷' : '未交卷'}>
                    <StudentImg bgColor={v.studentStatus === 3 ? '#4CDF78' : '#ef6666'} Image={v.studentSex} />
                    <StudentName>{v.studentName}</StudentName>
                </TestDTOS>
            ))}
        </Container>
    )
}

export default Student
