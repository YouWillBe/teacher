import { observable, action } from 'mobx'

import api from '../../api'

interface IProblem {
    answer: string
    fraction: number
    id: number
    option: string
    problemType: number
    solution: string
    topic: string
}

interface IPreview {
    id: number
    courseId: number
    name: string
    status: number
    totalProblem: number
    totalScore: number
    useVolumeId: number
    choiceProblems: IProblem[]
    checkboxProblems: IProblem[]
    judgeProblems: IProblem[]
    fillingProblems: IProblem[]
    shortAnswerProblems: IProblem[]
    key: {
        id: number
        type: string
    }
}

interface ITestDTOS {
    id: number
    studentId: number
    studentName: string
    studentSex: number
    studentStatus: number
    testStatus: number
    studentTestId: number
}

interface DoPreviewInfo {
    Unfiltered: number
    finished: number
    status: number
    testDTOS: ITestDTOS[]
    testId: number
}
interface ILore {
    id: number
    name: string
}
interface IVolumeLore {
    id: number
    name: string
    loreList: ILore[]
}
interface ITypeArr {
    id: number
    name: string
    extent: number
    key: string
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

interface ITestProblem {
    id: number
    testName: string
    choiceProblems: ITestProblemList[]
    checkboxProblems: ITestProblemList[]
    judgeProblems: ITestProblemList[]
    fillingProblems: ITestProblemList[]
    shortAnswerProblems: ITestProblemList[]
    key: {
        id: number
        type: string
    }
}
interface IUnfinishedStudentList {
    id: number
    testStatus: number
    studentId: number
    studentTestId: number
    studentStatus: number
    studentName: string
    studentSex: number
    accuracy: number
}
interface IStudentAccuracyCount {
    fail: number
    medium: number
    fine: number
    excellent: number
}

interface ITestScore {
    avgScore: number
    maxScore: number
    minScore: number
    totalScore: number
}
interface IPublishVolume {
    id: number
    endTime?: number
    workType: number
}

export interface ICourseClassTestStore {
    typeArr: ITypeArr[]
    courseId: string

    classTestReady: boolean
    gettingClassTest: boolean
    classTest: IPreview | null
    doClassTestInfo: DoPreviewInfo | null

    volumeLoreReady: boolean
    gettingVolumeLore: boolean
    volumeLore: IVolumeLore[]

    gettingTestProblem: boolean
    testProblemReady: boolean
    finishedStudentList: IUnfinishedStudentList[]
    unfinishedStudentList: IUnfinishedStudentList[]
    studentAccuracyCount: IStudentAccuracyCount
    testScore: ITestScore
    testProblemData: ITestProblem
    testAccuracy: ITestAccuracy

    getClassTest(id: string): Promise<void>
    bindingClassTest(courseId: string, volumeId: number): Promise<void>

    getVolumeLore(): Promise<void>
    publishVolume(data: IPublishVolume, courseId: string): Promise<void>
    testOver(id: number): Promise<void>

    getPreviewFinished(): Promise<void>
}

class CourseClassTest implements ICourseClassTestStore {
    @observable typeArr: ITypeArr[] = [{ id: 0, name: '全部', extent: 1, key: 'checkboxProblems' }]
    @observable courseId = ''

    @observable classTestReady = false
    @observable gettingClassTest = false
    @observable doClassTestInfo: DoPreviewInfo | null = null
    @observable classTest: IPreview | null = null

    @observable volumeLoreReady = false
    @observable gettingVolumeLore = false
    @observable volumeLore: IVolumeLore[] = []

    @observable gettingTestProblem = false
    @observable testProblemReady = false
    @observable testProblemData: ITestProblem = {
        id: 0,
        testName: '',
        choiceProblems: [],
        checkboxProblems: [],
        judgeProblems: [],
        fillingProblems: [],
        shortAnswerProblems: [],
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
    @observable previewFinishedReady = false
    @observable gettingPreviewFinished = false
    @observable finishedStudentList: IUnfinishedStudentList[] = []
    @observable unfinishedStudentList: IUnfinishedStudentList[] = []
    @observable studentAccuracyCount: IStudentAccuracyCount = {
        fail: 2,
        medium: 0,
        fine: 0,
        excellent: 0,
    }

    @observable testScore: ITestScore = {
        avgScore: 0,
        maxScore: 0,
        minScore: 0,
        totalScore: 0,
    }

    @action async setType(data: any) {
        this.typeArr = [
            { id: 0, name: '全部', extent: 1, key: 'checkboxProblems' },
            {
                id: 1,
                name: '单选题',
                extent: data.choiceProblems.length,
                key: 'choiceProblems',
            },
            {
                id: 2,
                name: '多选题',
                extent: data.checkboxProblems.length,
                key: 'checkboxProblems',
            },
            {
                id: 3,
                name: '判断题',
                extent: data.judgeProblems.length,
                key: 'judgeProblems',
            },
            {
                id: 4,
                name: '填空题',
                extent: data.fillingProblems.length,
                key: 'fillingProblems',
            },
            {
                id: 5,
                name: '简答题',
                extent: data.shortAnswerProblems.length,
                key: 'shortAnswerProblems',
            },
        ]
    }

    //根据课程查询随堂测
    @action async getClassTest(id: string) {
        this.gettingClassTest = true
        const res = await api.course.getClassTest(id)
        if (res.success) {
            this.courseId = id
            if (!res.data) {
                this.classTest = null
            } else if (res.data.status === 0) {
                this.classTest = res.data.volume
            } else {
                // @ts-ignore
                this.classTest = { ...res.data.volume }
                this.doClassTestInfo = res.data.info
            }
            if (res.data) {
                this.setType(res.data.volume)
            }

            this.gettingClassTest = false
            this.classTestReady = true
        }
    }

    @action async bindingClassTest(courseId: string, volumeId: number) {
        let data = {
            courseId: parseInt(courseId),
            volumeId: volumeId,
            testId: this.classTest ? this.classTest.id : 0,
        }
        if (data.testId === 0) {
            delete data.testId
        }
        const res = await api.course.bindingClassTest(data)
        if (res.success) {
            this.getClassTest(courseId)
        }
    }

    //根据知识点查询已完成组卷的试卷
    @action async getVolumeLore() {
        if (!this.volumeLoreReady) {
            this.gettingVolumeLore = true
            const res = await api.course.getVolumeLore()
            if (res.success) {
                this.volumeLore = res.data
                this.gettingVolumeLore = true
                this.volumeLoreReady = false
            }
        }
    }
    //发布试卷
    @action async publishVolume(data: IPublishVolume, courseId: string) {
        const res = await api.course.publishVolume(data)
        if (res.success) {
            this.getClassTest(courseId)
        }
    }

    @action async getPreviewFinished() {
        this.gettingPreviewFinished = true
        const res = await api.course.getQuizFinished(this.courseId)
        if (res.success) {
            this.finishedStudentList = res.data.finishedStudentList
            this.unfinishedStudentList = res.data.unfinishedStudentList
            this.studentAccuracyCount = res.data.studentAccuracyCount
            this.testAccuracy = res.data.testAccuracy
            this.testScore = res.data.testScore
            this.previewFinishedReady = true
            this.gettingPreviewFinished = false
        }
    }

    //收卷
    @action async testOver(id: number) {
        try {
            const res = await api.course.testOver(id)
            if (res.success) {
                if (this.classTest) {
                    this.classTest.status = 3
                }
            }
        } catch (error) {}
    }
}

export const courseClassTestStore = new CourseClassTest()
