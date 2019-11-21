import { observable, action } from 'mobx'

import api from '../api'

interface Point {
    x: number
    y: number
}

interface Node {
    id: number
    index: number
    name: string
    path: string
    rotate: number
    absoluteCorner: Point
    absoluteDelta: Point
    parentAbsoluteDelta: Point
    parentId: number
    avgAccuracy: number
}

interface IStudentList {
    studentId: number
    studentName: string
    accuracy: number
    sex: number
}

interface ILores {
    id: number
    name: string
    avgAccuracy: number
    path: string
    parentId: number
}

interface ITestTotalAnalysisGrade {
    classAccuracyList: {
        accuracy: number
        className: string
    }[]
    latelyClassTestAccuracyList: {
        weekAccuracyList: { week: number; accuracy: number }[]
        className: string
    }[]
    latelyClassOneTestAccuracyList: {
        excellent: number
        fine: number
        medium: number
        poor: number
        bad: number
        className: string
    }[]
    worstLores: ILores[]
    bestLores: ILores[]
    worstStudentList: IStudentList[]
    bestStudentList: IStudentList[]
}

interface ITeacherTeams {
    id: number
    className: string
}

interface ITeacherTotalAnalysis {
    classAccuracy: number
    teamRanking: number
    latelyClassTestAccuracy: {
        weekAccuracyList: { week: number; accuracy: number }[]
        className: string
    }
    bestAccuracy: number
    sectionLoreAccuracy: {
        max: number
        name: string
        accuracy: number
    }[]
    classStudentRanking: IStudentList[]
    weaknessLoreCount: number
    loreCount: number
    worstLores: ILores[]
    bestLores: ILores[]
}

export interface IAnalysisStore {
    nodes: Node[]
    nodesReady: boolean
    getKnowleggePoint(): Promise<void>

    testTotalAnalysisGrade: ITestTotalAnalysisGrade
    testTotalAnalysisGradeReady: boolean
    getTestTotalAnalysisGrade(): Promise<void>

    teacherTeams: ITeacherTeams[]
    teacherTeamsReady: boolean
    getTeacherTeams(): Promise<void>

    teacherTotalAnalysis: ITeacherTotalAnalysis
    teacherTotalAnalysisReady: boolean
    getTeacherTotalAnalysis(teamId: number): Promise<void>
}

class AnalysisStore implements IAnalysisStore {
    @observable nodesReady = false
    @observable nodes: Node[] = []

    @observable testTotalAnalysisGradeReady = false
    @observable testTotalAnalysisGrade: ITestTotalAnalysisGrade = {
        classAccuracyList: [],
        latelyClassTestAccuracyList: [],
        latelyClassOneTestAccuracyList: [],
        worstLores: [],
        bestLores: [],
        worstStudentList: [],
        bestStudentList: [],
    }

    @observable teacherTeams: ITeacherTeams[] = []
    @observable teacherTeamsReady = false

    @observable teacherTotalAnalysis: ITeacherTotalAnalysis = {
        classAccuracy: 0,
        teamRanking: 0,
        latelyClassTestAccuracy: {
            weekAccuracyList: [],
            className: '',
        },
        bestAccuracy: 0,
        sectionLoreAccuracy: [],
        classStudentRanking: [],
        weaknessLoreCount: 0,
        loreCount: 0,
        worstLores: [],
        bestLores: [],
    }
    @observable teacherTotalAnalysisReady = false

    @action async getKnowleggePoint() {
        if (!this.nodesReady) {
            try {
                const res = await api.analysis.getKnowledgePoints()
                if (res.success) {
                    this.nodes = res.data
                    this.nodesReady = true
                }
            } catch (error) {}
        }
    }

    //总体分析
    @action async getTestTotalAnalysisGrade() {
        this.testTotalAnalysisGradeReady = false
        if (!this.testTotalAnalysisGradeReady) {
            try {
                const res = await api.analysis.getTestTotalAnalysisGrade()
                if (res.success) {
                    this.testTotalAnalysisGrade = res.data
                    this.testTotalAnalysisGradeReady = true
                    this.getTeacherTeams()
                }
            } catch (error) {}
        }
    }

    //全部班级
    @action async getTeacherTeams() {
        if (!this.teacherTeamsReady) {
            try {
                const res = await api.analysis.getTeacherTeams()
                if (res.success) {
                    this.teacherTeams = res.data
                    this.teacherTeamsReady = true
                }
            } catch (error) {}
        }
    }

    //班级分析
    @action async getTeacherTotalAnalysis(teamId: number) {
        this.teacherTotalAnalysisReady = false
        try {
            const res = await api.analysis.getTeacherTotalAnalysis({ teamId })
            if (res.success) {
                this.teacherTotalAnalysis = res.data
                this.teacherTotalAnalysisReady = true
            }
        } catch (error) {}
    }
}

export const analysisStore = new AnalysisStore()
