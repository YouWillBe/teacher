import React, { FC } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps, Router } from '@reach/router'

import Index from './index'
import PreviewIndex from './Preview/Detail/SeeIndex'
import ClassTest from './ClassTest/Detail/SeeIndex'
import ExaminationIndex from './Examination/Detail/SeeIndex'
import TaskIndex from './Task/Detail/SeeIndex'
import PreviewAnalysis from './AnalysiCommon'
import PaperAnalysis from './PaperAnalysis'
import PersonalAnalysis from './PersonalAnalysis'

const Content = styled(Router)`
    width: 100%;
    height: 100%;
`

interface IParams {
    courseId: string
}

const Course: FC<RouteComponentProps<IParams>> = props => {
    return (
        <Content>
            <Index path=':courseId'>{props.children}</Index>
            <PreviewIndex path=':courseId/preview/:studentTestId/'></PreviewIndex>
            <ClassTest path=':courseId/classTest/:studentTestId/'></ClassTest>
            <ExaminationIndex path=':courseId/examination/:studentTestId/'></ExaminationIndex>
            <TaskIndex path=':courseId/task/:studentTestId/'></TaskIndex>
            <PreviewAnalysis path=':courseId/preview/analysis/:testId'></PreviewAnalysis>
            <PreviewAnalysis path=':courseId/task/analysis/:testId'></PreviewAnalysis>
            <PreviewAnalysis path=':courseId/classTest/analysis/:testId'></PreviewAnalysis>
            <PreviewAnalysis path=':courseId/examination/analysis/:testId'></PreviewAnalysis>
            <PaperAnalysis path=':courseId/preview/:testId/paper'></PaperAnalysis>
            <PaperAnalysis path=':courseId/task/:testId/paper'></PaperAnalysis>
            <PaperAnalysis path=':courseId/classTest/:testId/paper'></PaperAnalysis>
            <PaperAnalysis path=':courseId/examination/:testId/paper'></PaperAnalysis>
            <PersonalAnalysis path=':courseId/preview/:testId/personal'></PersonalAnalysis>
            <PersonalAnalysis path=':courseId/task/:testId/personal'></PersonalAnalysis>
            <PersonalAnalysis path=':courseId/classTest/:testId/personal'></PersonalAnalysis>
            <PersonalAnalysis path=':courseId/examination/:testId/personal'></PersonalAnalysis>
            {/* <PreviewAnalysis path=':courseId/preview/:studentTestId/analysis/:testId'></PreviewAnalysis> */}
        </Content>
    )
}

export default Course
