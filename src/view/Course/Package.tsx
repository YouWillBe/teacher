import React, { FC } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps, Router } from '@reach/router'

import Index from './index'
import PreviewAnnounced from './Preview/Detail/Announced'
import ClassTestAnnounced from './ClassTest/Detail/Announced'
import ExaminationAnnounced from './Examination/Detail/Announced'
import TaskAnnounced from './Task/Detail/Announced'
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
            <PreviewAnnounced path=':courseId/preview/:studentTestId/'></PreviewAnnounced>
            <ClassTestAnnounced path=':courseId/classTest/:studentTestId/'></ClassTestAnnounced>
            <ExaminationAnnounced path=':courseId/examination/:studentTestId/'></ExaminationAnnounced>
            <TaskAnnounced path=':courseId/task/:studentTestId/'></TaskAnnounced>
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
        </Content>
    )
}

export default Course
