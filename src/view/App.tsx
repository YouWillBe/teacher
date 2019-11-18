import React, { FC } from 'react'
import { Router } from '@reach/router'
import styled from '@emotion/styled'

import MainRouter from './MainRouter'
import PlanEditor from '../view/PlanEditor'
import NewPlan from '../view/NewPlan'
import Course from '../view/Course/Package'
import Index from '../view/Course'
import Plan from '../view/Course/Plan'
import Preparation from '../view/Course/Preparation'
import NewPreparation from '../view/Course/Preparation/NewPreparation'
import Preview from '../view/Course/Preview'
import ClassTest from '../view/Course/ClassTest'
import Task from '../view/Course/Task'
import Examination from '../view/Course/Examination'
import VolumeDetail from './Volume/detail'
import Analysis from './Analysis'
import OverallAnalysis from './Analysis/Overall'
import PersonalAnalysis from './Course/PersonalAnalysis'
import ClassAnalysis from './Analysis/Overall/Class'
import KnowledgeAnalysis from './Analysis/Knowledge'

const MyRouter = styled(Router)`
    height: 100%;
`

const App: FC = () => {
    return (
        <MyRouter>
            <MainRouter path='/*' />
            <PlanEditor path='plan/:planId' />
            <NewPlan path='plan/new' />
            <Course path='/course/'>
                <Index path=':courseId'>
                    <Plan path='plan'></Plan>
                    <Preparation path='preparation'></Preparation>
                    <Preview path='preview'></Preview>
                    <ClassTest path='classTest'></ClassTest>
                    <Task path='task'></Task>
                    <Examination path='examination'></Examination>
                </Index>
            </Course>
            <VolumeDetail path='see/volume/:id'></VolumeDetail>
            <NewPreparation path='/course/:courseId/preparation/new'></NewPreparation>
            <KnowledgeAnalysis path='/analysis/knowledge'></KnowledgeAnalysis>
            <Analysis path='/analysis'>
                <OverallAnalysis path='/'></OverallAnalysis>
                <PersonalAnalysis path='student/:studentId'></PersonalAnalysis>
                <ClassAnalysis path='class/:studentId'></ClassAnalysis>
            </Analysis>
        </MyRouter>
    )
}

export default App
