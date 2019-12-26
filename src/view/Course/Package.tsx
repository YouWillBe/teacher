import React, { FC } from 'react'
import styled from 'styled-components'
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
            {/* <Index path='/'>{props.children}</Index> */}
            <PreviewAnnounced path='preview/:studentTestId/' />
            <ClassTestAnnounced path='classTest/:studentTestId/' />
            <ExaminationAnnounced path='examination/:studentTestId/' />
            <TaskAnnounced path='task/:studentTestId/' />
            <PreviewAnalysis path='preview/analysis/:testId' />
            <PreviewAnalysis path='task/analysis/:testId' />
            <PreviewAnalysis path='classTest/analysis/:testId' />
            <PreviewAnalysis path='examination/analysis/:testId' />
            <PaperAnalysis path='preview/:testId/paper' />
            <PaperAnalysis path='task/:testId/paper' />
            <PaperAnalysis path='classTest/:testId/paper' />
            <PaperAnalysis path='examination/:testId/paper' />
            <PersonalAnalysis path='preview/:testId/personal' />
            <PersonalAnalysis path='task/:testId/personal' />
            <PersonalAnalysis path='classTest/:testId/personal' />
            <PersonalAnalysis path='examination/:testId/personal' />
        </Content>
    )
}

export default Course
