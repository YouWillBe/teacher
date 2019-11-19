import { observable, action } from 'mobx'
// import { navigate } from '@reach/router'
import { Value } from 'slate'

import api from '../../api'
import Toast from '../../components/Toast'

interface ITypeArrData {
    id: number
    key: string
    name: string
    long: number
}

interface IProblemAccuracy {
    accuracy: number
    type: string
}
interface ITestAccuracy {
    getTotalScore: number
    problemAccuracy: IProblemAccuracy[]
    testTotalProblem: number
    testTotalScore: number
    totalAccuracy: number
}
interface ITestProblemList {
    id: number
    ifEntering: number
    problemType: number
    number: number
    mark: number
    ifStudentAnswer: number
}

interface IProblemTypeIsExit {
    name: string
    type: number
    typeName: string
}

interface ITestProblem {
    id: number
    courseId: number
    testId: number
    testName: string
    studentName: string
    studentTestStatus: number
    choiceProblems: ITestProblemList[]
    checkboxProblems: ITestProblemList[]
    judgeProblems: ITestProblemList[]
    fillingProblems: ITestProblemList[]
    shortAnswerProblems: ITestProblemList[]
    problemTypeIsExit: IProblemTypeIsExit[]
    key: {
        id: number
        type: string
    }
}

interface ICurrentProblemDetail {
    id: number
    number: number
    type: string
}
interface ILoreList {
    id: number
    name: string
}
interface IFractionList {
    fraction: string
}
interface ITestProblemDetail {
    id: number
    volumeId: number
    problemType: number
    number: number
    topic: any
    option: any
    answer: any
    solution: any
    teacherPostilion: any
    fraction: number
    getFraction: number
    isTrue: number
    studentProblemTestId: number
    studentTestId: number
    loreList: ILoreList[]
    fractionList: IFractionList[]
    studentTestProblemId: number
    mark: number
    studentAnswer: any
}

interface IProblemDetailId {
    id: number
    testId: number
}

interface ITestsStudentCheck {
    id: number
    studentTestId: number
    getFraction: number
    isTrue: number
    fractionList: string
    teacherPostilion: string
}

interface IGradeDataDTO {
    avgAccuracy: number
    bad: number
    excellent: number
    fine: number
    medium: number
    poor: number
    passCount: number
    punctualCount: number
    totalCount: number
}
interface ILoreDTOList {
    avgAccuracy: number
    id: number
    name: string
}
interface IVolumeDTO {
    id: number
    name: string
    choiceProblems: ITestProblemList[]
    checkboxProblems: ITestProblemList[]
    judgeProblems: ITestProblemList[]
    fillingProblems: ITestProblemList[]
    shortAnswerProblems: ITestProblemList[]
    problemTypeIsExit: IProblemTypeIsExit[]
    key: {
        id: number
        type: string
    }
}

interface ITestAcademicAnalysisVolumeID {
    id: number
    studentId: number
    courseId: number
    testType: number
}
interface IBestLore {
    id: number
    name: string
    avgAccuracy: number
    trueLoreCount: number
    totalLoreCount: number
}
interface IBestLore {
    id: number
    name: string
    avgAccuracy: number
    trueLoreCount: number
    totalLoreCount: number
}
interface ITestAcademicAnalysisVolume {
    bestLore: IBestLore
    loreAccuracy: number
    loreCount: number
    loreDTOList: ILoreDTOList[]
    rank: number
    studentName: string
    testName: string
    totalRank: number
    weaknessLoreCount: number
    worstLore: IBestLore
}
interface ITestAcademicAnalysisStudent {
    bestLores: IBestLore[]
    loreCount: number
    sectionLoreAccuracy: { name: string; accuracy: number; max: number }[]
    loreAccuracyChange: { week: number; accuracy: number }[]
    studentName: string
    totalAccuracy: number
    weaknessLoreCount: number
    classRanking: number
    gradeRanking: number
    worstLores: IBestLore[]
}

interface IWhiteBoard {
    courseId: number
    content: string
}

export interface ICourseIndexStore {
    typeArrData: ITypeArrData[]

    gettingTestProblem: boolean
    testProblemReady: boolean
    studentVolume: ITestProblem
    testAccuracy: ITestAccuracy

    gettingTestProblemDetail: boolean
    testProblemDetailReady: boolean
    testProblemDetailData: ITestProblemDetail

    getTestProblem(data: IProblemDetailId): Promise<void>

    currentProblemDetailData: ICurrentProblemDetail

    getTestProblemEntering(id: number): Promise<void>
    getStudentTestProblem(data: IProblemDetailId): Promise<void>

    testsStudentCheck(data: ITestsStudentCheck): Promise<void>

    gettingTestAccuracy: boolean
    getTestAccuracyReady: boolean
    gradeDataDTO: IGradeDataDTO
    loreDTOList: ILoreDTOList[]
    volumeDTO: IVolumeDTO
    getTestAccuracy(id: number): Promise<void>
    DataProcessing(data: any): any

    gettingTestAcademicAnalysisVolume: boolean
    testAcademicAnalysisVolumeReady: boolean
    testAcademicAnalysisVolume: ITestAcademicAnalysisVolume
    testAcademicAnalysisVolumeID: ITestAcademicAnalysisVolumeID
    getTestAcademicAnalysisVolume(
        data: ITestAcademicAnalysisVolumeID
    ): Promise<void>

    gettingTestAcademicAnalysisStudent: boolean
    testAcademicAnalysisStudentReady: boolean
    testAcademicAnalysisStudent: ITestAcademicAnalysisStudent
    getTestAcademicAnalysisStudent(studentId: number): Promise<void>

    getWhiteBoard(courseId: number): Promise<void>
    whiteBoardReady: boolean
    upsertWhiteBoard(data: IWhiteBoard): Promise<void>
    whiteBoard: string
}

class CourseIndexStore implements ICourseIndexStore {
    @observable typeArrData: ITypeArrData[] = []

    @observable gettingTestProblem = false
    @observable testProblemReady = false
    @observable studentVolume: ITestProblem = {
        id: 0,
        courseId: 0,
        studentTestStatus: 0,
        testName: '',
        studentName: '',
        testId: 0,
        choiceProblems: [],
        checkboxProblems: [],
        judgeProblems: [],
        fillingProblems: [],
        shortAnswerProblems: [],
        problemTypeIsExit: [],
        key: {
            id: 0,
            type: '',
        },
    }
    @observable testAccuracy: ITestAccuracy = {
        getTotalScore: 0,
        problemAccuracy: [],
        testTotalProblem: 0,
        testTotalScore: 0,
        totalAccuracy: 0,
    }

    @observable currentProblemDetailData: ICurrentProblemDetail = {
        id: 0,
        number: 1,
        type: 'choiceProblems',
    }

    @observable gettingTestProblemDetail = false
    @observable testProblemDetailReady = false
    @observable testProblemDetailData: ITestProblemDetail = {
        id: 0,
        volumeId: 0,
        problemType: 0,
        number: 1,
        isTrue: 0,
        topic: {},
        option: {},
        answer: {},
        solution: {},
        teacherPostilion: '',
        fraction: 0,
        getFraction: 0,
        loreList: [],
        fractionList: [],
        studentTestProblemId: 0,
        mark: 0,
        studentTestId: 0,
        studentProblemTestId: 0,
        studentAnswer: '',
    }

    @observable gettingTestAccuracy = false
    @observable getTestAccuracyReady = false
    @observable gradeDataDTO: IGradeDataDTO = {
        avgAccuracy: 0,
        bad: 0,
        excellent: 0,
        fine: 0,
        medium: 0,
        poor: 0,
        passCount: 0,
        punctualCount: 0,
        totalCount: 0,
    }
    @observable loreDTOList: ILoreDTOList[] = []
    @observable volumeDTO: IVolumeDTO = {
        id: 0,
        name: '',
        choiceProblems: [],
        checkboxProblems: [],
        judgeProblems: [],
        fillingProblems: [],
        shortAnswerProblems: [],
        problemTypeIsExit: [],
        key: {
            id: 0,
            type: '',
        },
    }

    @observable gettingTestAcademicAnalysisVolume = false
    @observable testAcademicAnalysisVolumeReady = false
    @observable testAcademicAnalysisVolume = {
        bestLore: {
            id: 0,
            name: '',
            avgAccuracy: 0,
            trueLoreCount: 0,
            totalLoreCount: 0,
        },
        loreAccuracy: 0,
        loreCount: 0,
        loreDTOList: [],
        rank: 0,
        studentName: '',
        testName: '',
        totalRank: 0,
        weaknessLoreCount: 0,
        worstLore: {
            id: 0,
            name: '',
            avgAccuracy: 0,
            trueLoreCount: 0,
            totalLoreCount: 0,
        },
    }
    @observable testAcademicAnalysisVolumeID = {
        id: 0,
        studentId: 0,
        courseId: 0,
        testType: 0,
    }

    @observable gettingTestAcademicAnalysisStudent = false
    @observable testAcademicAnalysisStudentReady = false
    @observable testAcademicAnalysisStudent = {
        bestLores: [],
        loreAccuracy: 0,
        loreCount: 0,
        sectionLoreAccuracy: [],
        loreAccuracyChange: [],
        studentName: '',
        totalAccuracy: 0,
        weaknessLoreCount: 0,
        classRanking: 0,
        gradeRanking: 0,
        worstLores: [],
    }

    @observable whiteBoardReady = false
    @observable whiteBoard = ''

    @action DataProcessing(data: any) {
        let res = data
        let problemType = [1, 2]
        let problemType2 = [4, 5]
        if (typeof res.topic === 'string') {
            res.topic = JSON.parse(res.topic)
        }
        if (typeof res.solution === 'string') {
            res.solution = JSON.parse(res.solution)
        }
        if (problemType.includes(res.problemType)) {
            if (typeof res.option === 'string') {
                res.option = JSON.parse(res.option)
            }
        } else if (problemType2.includes(res.problemType)) {
            if (typeof res.answer === 'string') {
                res.answer = JSON.parse(res.answer)
            }
            if (typeof res.fractionList === 'string') {
                res.fractionList = JSON.parse(res.fractionList)
            }
            if (res.studentAnswer && res.studentAnswer.length > 0) {
                res.studentAnswer = JSON.parse(res.studentAnswer)
            }

            if (typeof res.teacherPostilion === 'string') {
                res.teacherPostilion = Value.fromJSON(
                    JSON.parse(res.teacherPostilion)
                )
            } else {
                res.teacherPostilion = Value.fromJSON({
                    document: {
                        nodes: [
                            {
                                object: 'block',
                                type: 'paragraph',
                                nodes: [],
                            },
                        ],
                    },
                })
            }
        }
        return res
    }

    //试卷详情
    @action async getTestProblemEntering(id: number) {
        this.gettingTestProblem = true
        const res = await api.course.getStudentTest(id)
        if (res.success) {
            let sessionCurrentType = sessionStorage.getItem(
                'sessionCurrentType'
            )
            if (sessionCurrentType) {
                let datas = JSON.parse(sessionCurrentType)
                if (
                    (res.data.studentVolume as any)[datas.type][
                        datas.number - 1
                    ]
                ) {
                    let id = (res.data.studentVolume as any)[datas.type][
                        datas.number - 1
                    ].id
                    this.getStudentTestProblem({
                        id,
                        testId: res.data.studentVolume.id,
                    })
                    this.currentProblemDetailData = {
                        id: datas.id,
                        number: datas.number,
                        type: datas.type,
                    }
                } else {
                    this.getStudentTestProblem({
                        id: res.data.studentVolume.key.id,
                        testId: res.data.studentVolume.id,
                    })
                }
            } else {
                this.getStudentTestProblem({
                    id: res.data.studentVolume.key.id,
                    testId: res.data.studentVolume.id,
                })
                this.currentProblemDetailData = {
                    id: res.data.studentVolume.key.id,
                    number: 1,
                    type: res.data.studentVolume.key.type,
                }
            }
            this.testAcademicAnalysisVolumeID = {
                id: res.data.studentVolume.id,
                studentId: res.data.studentVolume.studentId,
                courseId: res.data.studentVolume.courseId,
                testType: res.data.studentVolume.testType,
            }
            this.gettingTestProblem = false
            this.studentVolume = res.data.studentVolume
            this.testAccuracy = res.data.testAccuracy
            this.testProblemReady = true
        }
    }

    //点击学生头像题目详情（老师公布答案）
    @action async getStudentTestProblem(data: IProblemDetailId) {
        this.gettingTestProblemDetail = true
        const res = await api.course.getStudentTestProblem({
            id: data.id,
            testId: data.testId,
        })
        if (res.success) {
            this.gettingTestProblemDetail = false
            this.testProblemDetailData = this.DataProcessing(res.data)
            this.testProblemDetailReady = true
        }
    }

    //点击查看分析题目详情（）
    @action async getTestProblem(data: IProblemDetailId) {
        this.gettingTestProblemDetail = true
        const res = await api.course.getTestProblem({
            id: data.id,
            testId: data.testId,
        })
        if (res.success) {
            this.gettingTestProblemDetail = false
            this.testProblemDetailData = this.DataProcessing(
                res.data.testProblem
            )
            this.testProblemDetailReady = true
        }
    }

    //保存成绩
    @action async testsStudentCheck(data: ITestsStudentCheck) {
        const res = await api.course.testsStudentCheck(data)
        if (res.success) {
            Toast.success('保存分数成功')
        }
    }

    //试卷情况-题目分析
    @action async getTestAccuracy(id: number) {
        const res = await api.course.getTestAccuracy(id)
        if (res.success) {
            this.gradeDataDTO = res.data.gradeDataDTO
            this.loreDTOList = res.data.loreDTOList
            this.volumeDTO = res.data.volumeDTO
            this.studentVolume = res.data.volumeDTO
            let sessionCurrentType = sessionStorage.getItem(
                'sessionCurrentType'
            )
            if (sessionCurrentType) {
                let datas = JSON.parse(sessionCurrentType)
                if ((res.data.volumeDTO as any)[datas.type][datas.number - 1]) {
                    let id = (res.data.volumeDTO as any)[datas.type][
                        datas.number - 1
                    ].id
                    this.getTestProblem({ id, testId: res.data.volumeDTO.id })
                    this.currentProblemDetailData = {
                        id: datas.id,
                        number: datas.number,
                        type: datas.type,
                    }
                } else {
                    this.getTestProblem({
                        id: res.data.volumeDTO.key.id,
                        testId: res.data.volumeDTO.id,
                    })
                }
            } else {
                this.getTestProblem({
                    id: res.data.volumeDTO.key.id,
                    testId: res.data.volumeDTO.id,
                })
                this.currentProblemDetailData = {
                    id: res.data.volumeDTO.key.id,
                    number: 1,
                    type: res.data.volumeDTO.key.type,
                }
            }
        }
    }

    //学情分析（试卷）
    @action async getTestAcademicAnalysisVolume(
        data: ITestAcademicAnalysisVolumeID
    ) {
        this.gettingTestAcademicAnalysisVolume = true
        const res = await api.course.getTestAcademicAnalysisVolume(data)
        if (res.success) {
            this.testAcademicAnalysisVolume = res.data
            this.gettingTestAcademicAnalysisVolume = false
            this.testAcademicAnalysisVolumeReady = true
        }
    }
    //学情分析（个人）
    @action async getTestAcademicAnalysisStudent(studentId: number) {
        this.gettingTestAcademicAnalysisStudent = true
        const res = await api.course.getTestAcademicAnalysisStudent({
            studentId,
        })
        if (res.success) {
            this.testAcademicAnalysisStudent = res.data
            this.gettingTestAcademicAnalysisStudent = false
            this.testAcademicAnalysisStudentReady = true
        }
    }

    @action async getWhiteBoard(courseId: number) {
        const res = await api.course.getWhiteBoard(courseId)
        if(res.success) {
            this.whiteBoard = JSON.parse(res.data.content) || ''
            this.whiteBoardReady = true
        }
    }
    @action async upsertWhiteBoard(data: IWhiteBoard) {
        await api.course.upsertWhiteBoadr(data)
    }
}

export const courseIndexStore = new CourseIndexStore()
