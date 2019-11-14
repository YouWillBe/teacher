import { observable, action } from 'mobx'
import api from '../../api'

interface ITestDTOS {
    id: number
    studentId: number
    studentName: string
    studentSex: number
    studentStatus: number
    testStatus: number
    studentTestId: number
}
interface IProblem {
    answer: string
    fraction: number
    id: number
    option: string
    problemType: number
    solution: string
    topic: string
}
interface DoPreviewInfo {
    Unfiltered: number
    finished: number
    status: number
    testDTOS: ITestDTOS[]
    testId: number
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
interface ITypeArr {
    id: number
    name: string
    extent: number
    key: string
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
interface IProblemAccuracy {
    accuracy: number | null
    type: string
}
interface ITestAccuracy {
    totalAccuracy: number
    problemAccuracy: IProblemAccuracy[]
}
interface ITestScore {
    avgScore: number
    maxScore: number
    minScore: number
    totalScore: number
}

export interface ICoursePreviewStore {
    typeArr: ITypeArr[]
    courseId: string

    previewReady: boolean
    gettingPreview: boolean
    preview: IPreview | null
    doPreviewInfo: DoPreviewInfo | null

    volumeLoreReady: boolean
    gettingVolumeLore: boolean
    volumeLore: IVolumeLore[]

    previewFinishedReady: boolean
    gettingPreviewFinished: boolean
    finishedStudentList: IUnfinishedStudentList[]
    unfinishedStudentList: IUnfinishedStudentList[]
    studentAccuracyCount: IStudentAccuracyCount
    testAccuracy: ITestAccuracy
    testScore: ITestScore

    getPreview(id: string): Promise<void>
    bindingPreview(courseId: string, volumeId: number): Promise<void>

    getVolumeLore(): Promise<void>
    publishVolume(id: number, courseId: string): Promise<void>
    testOver(id: number): Promise<void>

    getPreviewFinished(): Promise<void>
}

class CoursePreviewStore implements ICoursePreviewStore {
    @observable typeArr: ITypeArr[] = [{ id: 0, name: '全部', extent: 1, key: 'checkboxProblems' }]
    @observable courseId = ''

    @observable previewReady = false
    @observable gettingPreview = false
    @observable preview: IPreview | null = null
    @observable doPreviewInfo: DoPreviewInfo | null = null

    @observable volumeLoreReady = false
    @observable gettingVolumeLore = false
    @observable volumeLore: IVolumeLore[] = []

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
    @observable testAccuracy: ITestAccuracy = {
        totalAccuracy: 0,
        problemAccuracy: [],
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
    //根据课程查询预习
    @action async getPreview(id: string) {
        this.gettingPreview = true
        try {
            const res = await api.course.getPreview(id)
            if (res.success) {
                this.courseId = id
                if (!res.data) {
                    this.preview = null
                } else if (res.data.status === 0) {
                    this.preview = res.data.volume
                } else {
                    // @ts-ignore
                    this.preview = { ...res.data.volume }
                    this.doPreviewInfo = res.data.info
                }
                if (res.data) {
                    this.setType(res.data.volume)
                }

                this.gettingPreview = false
                this.previewReady = true
            }
        } catch (error) {}
    }
    @action async bindingPreview(courseId: string, volumeId: number) {
        let data = {
            courseId: parseInt(courseId),
            volumeId: volumeId,
            testId: this.preview ? this.preview.id : 0,
        }
        if (data.testId === 0) {
            delete data.testId
        }
        try {
            const res = await api.course.bindingPreview(data)
            if (res.success) {
                this.getPreview(courseId)
            }
        } catch (error) {}
    }
    //根据知识点查询已完成组卷的试卷
    @action async getVolumeLore() {
        if (!this.volumeLoreReady) {
            this.gettingVolumeLore = true
            try {
                const res = await api.course.getVolumeLore()
                if (res.success) {
                    this.volumeLore = res.data
                    this.gettingVolumeLore = true
                    this.volumeLoreReady = false
                }
            } catch (error) {}
        }
    }
    //发布试卷
    @action async publishVolume(id: number, courseId: string) {
        try {
            const res = await api.course.publishVolume(id)
            if (res.success) {
                this.getPreview(courseId)
            }
        } catch (error) {}
    }
    @action async getPreviewFinished() {
        this.gettingPreviewFinished = true
        try {
            const res = await api.course.getPreviewFinished(this.courseId)
            if (res.success) {
                this.finishedStudentList = res.data.finishedStudentList
                this.unfinishedStudentList = res.data.unfinishedStudentList
                this.studentAccuracyCount = res.data.studentAccuracyCount
                this.testAccuracy = res.data.testAccuracy
                this.testScore = res.data.testScore
                this.previewFinishedReady = true
                this.gettingPreviewFinished = false
            }
        } catch (error) {}
    }
    //收卷
    @action async testOver(id: number) {
        try {
            const res = await api.course.testOver(id)
            if (res.success) {
                if (this.preview) {
                    this.preview.status = 3
                }
            }
        } catch (error) {}
    }
}

export const coursePreviewStore = new CoursePreviewStore()
