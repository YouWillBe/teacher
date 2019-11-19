// @ts-nocheck

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
import WhiteBoard from '../view/Course/WhiteBoard'
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
            <WhiteBoard path='/course/:courseId/white-board' />
            <Course path='/course/'>
                <Index path=':courseId'>
                    <Plan path='plan' />
                    <Preparation path='preparation' />
                    <Preview path='preview' />
                    <ClassTest path='classTest' />
                    <Task path='task' />
                    <Examination path='examination' />
                </Index>
            </Course>
            <VolumeDetail path='see/volume/:id' />
            <NewPreparation path='/course/:courseId/preparation/new' />
            <KnowledgeAnalysis path='/analysis/knowledge' />
            <Analysis path='/analysis'>
                <OverallAnalysis path='/' />
                <PersonalAnalysis path='student/:studentId' />
                <ClassAnalysis path='class/:studentId' />
            </Analysis>
        </MyRouter>
    )
}

export default App
