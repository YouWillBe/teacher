import React, { FC } from 'react'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { Link } from '@reach/router'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`
const CourseWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`
const TagWrap = styled.div`
    width: 24px;
    height: 24px;
    background-color: #00a6f3;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: -40px;
    top: 16px;
`
const Tag = styled.div`
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
`
const Course = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Time = styled.div`
    color: #00a6f3;
`
const Line = styled.div`
    width: 125px;
    height: 1px;
    background-color: #ccc;
    margin-top: 5px;
    margin-bottom: 5px;
`
const Section = styled.div`
    color: #00a6f3;
`
const Triangle = styled.span`
    position: absolute;
    top: 7px;
    right: -5px;
    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-left: 8px solid #00a6f3;
    border-bottom: 4px solid transparent;
    z-index: 10;
`
const Class = styled.div`
    margin-top: 20px;
    text-align: center;
    color: #9b2ee5;
`
const MyLink = styled(Link)`
    padding: 6px 20px;
    background-color: #00a6f3;
    color: #fff;
    border-radius: 4px;
    margin-top: 20px;
`

dayjs.locale('zh-cn')

interface IProps {
    color: string
    date: number
    section: number
    index: number
    nameOfClass: string
    courseId: number
}

const sectionList = ['上午', '下午', '晚间']

const CourseInfo: FC<IProps> = props => (
    <Container>
        <CourseWrap>
            <Course>
                <TagWrap>
                    <Triangle></Triangle>
                    <Tag></Tag>
                </TagWrap>
                <Time>周{dayjs(props.date).format('dd　MM-DD')}</Time>
                <Line></Line>
                <Section>
                    {sectionList[props.section]}　第 {props.index} 节
                </Section>
            </Course>
        </CourseWrap>
        <Class>{props.nameOfClass}</Class>
        <MyLink to={`course/${props.courseId}/plan`}>查　看</MyLink>
    </Container>
)

export default CourseInfo
