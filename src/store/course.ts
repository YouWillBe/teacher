import { observable, action } from 'mobx'
import { Value } from 'slate'

import api from '../api'

interface IChoiceProblem {
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
    choiceProblems: IChoiceProblem[]
    checkboxProblems: IChoiceProblem[]
    judgeProblems: IChoiceProblem[]
    fillingProblems: IChoiceProblem[]
    shortAnswerProblems: IChoiceProblem[]
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

interface IPublishVolume {
    id: number
    endTime?: number
    workType: number
}
export interface ICourseStore {
    typeArr: ITypeArr[]
    plan: IPlan | null
    planReady: boolean
    gettingPlan: boolean

    preparationData: IPreparationData
    preparationReady: boolean
    gettingPreparation: boolean

    previewReady: boolean
    gettingPreview: boolean
    preview: IPreview | null
    doPreviewInfo: DoPreviewInfo | null
    courseId: string

    classTestReady: boolean
    gettingClassTest: boolean
    classTest: IPreview | null
    doClassTestInfo: DoPreviewInfo | null

    taskReady: boolean
    gettingTask: boolean
    task: IPreview | null
    doTaskInfo: DoPreviewInfo | null

    examinationReady: boolean
    gettingExamination: boolean
    examination: IPreview | null
    doExaminationInfo: DoPreviewInfo | null

    volumeLoreReady: boolean
    gettingVolumeLore: boolean
    volumeLore: IVolumeLore[]

    volumeProblemAllReady: boolean
    gettingVolumeProblemAll: boolean

    setType(key: string): Promise<void>
    getPlan(id: string): Promise<void>
    bindingPlan(courseId: string, planId: number): Promise<void>

    getPreparation(id: string): Promise<void>
    preparationCreate(courseId: string, content: string): Promise<void>
    getPreview(id: string): Promise<void>
    bindingPreview(courseId: string, volumeId: number): Promise<void>
    getClassTest(id: string): Promise<void>
    bindingClassTest(courseId: string, volumeId: number): Promise<void>
    getTask(id: string): Promise<void>
    bindingTask(courseId: string, volumeId: number): Promise<void>
    getExamination(id: string): Promise<void>
    bindingExamination(courseId: string, volumeId: number): Promise<void>
    publishVolume(data: IPublishVolume, type: number): Promise<void>
    testOver(id: number, type: number): Promise<void>
    getVolumeLore(): Promise<void>
    // getVolumeProblemAll(id: number): Promise<void>
}
interface IPlan {
    id: number
    content: Value
    title: string
}
interface IPreparationData {
    id: number
    statu: number
    content: Value
}

class CourseStore implements ICourseStore {
    @observable typeArr: ITypeArr[] = [{ id: 0, name: '全部', extent: 1, key: 'checkboxProblems' }]
    @observable planReady = false
    @observable gettingPlan = false
    @observable plan: IPlan | null = null

    @observable preparationReady = false
    @observable gettingPreparation = false
    @observable preparationData: IPreparationData = {
        id: -1,
        statu: 0,
        content: Value.fromJSON({
            document: {
                nodes: [
                    {
                        object: 'block',
                        type: 'paragraph',
                        nodes: [
                            {
                                object: 'text',
                                text: '',
                            },
                        ],
                    },
                ],
            },
        }),
    }

    @observable previewReady = false
    @observable gettingPreview = false
    @observable preview: IPreview | null = null
    @observable doPreviewInfo: DoPreviewInfo | null = null
    @observable courseId = ''

    @observable classTestReady = false
    @observable gettingClassTest = false
    @observable doClassTestInfo: DoPreviewInfo | null = null
    @observable classTest: IPreview | null = null

    @observable taskReady = false
    @observable gettingTask = false
    @observable doTaskInfo: DoPreviewInfo | null = null
    @observable task: IPreview | null = null

    @observable examinationReady = false
    @observable gettingExamination = false
    @observable doExaminationInfo: DoPreviewInfo | null = null
    @observable examination: IPreview | null = null

    @observable volumeLoreReady = false
    @observable gettingVolumeLore = false
    @observable volumeLore: IVolumeLore[] = []

    @observable volumeProblemAllReady = false
    @observable gettingVolumeProblemAll = false
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
    @action async getPlan(id: string) {
        this.gettingPlan = true
        try {
            const res = await api.course.getPlan(id)
            if (res.success) {
                if (!res.data) {
                    this.plan = null
                } else {
                    this.plan = { ...res.data, content: JSON.parse(res.data.content) }
                }
                this.gettingPlan = false
                this.planReady = true
            }
        } catch (error) {}
    }
    @action async bindingPlan(courseId: string, planId: number) {
        try {
            const res = await api.course.bindingPlan({
                courseId: parseInt(courseId),
                programId: planId,
            })
            if (res.success) {
                this.getPlan(courseId)
            }
        } catch (error) {}
    }
    //根据课程查询课前准备
    @action async getPreparation(id: string) {
        // if (!this.preparationReady) {
        this.gettingPreparation = true
        try {
            const res = await api.course.getPreparation(id)
            if (res.success) {
                if (res.data) {
                    this.preparationData = {
                        id: res.data.id,
                        statu: 1,
                        content: JSON.parse(res.data.content),
                    }
                } else {
                    this.preparationData = {
                        id: 0,
                        statu: 0,
                        content: Value.fromJSON({
                            document: {
                                nodes: [
                                    {
                                        object: 'block',
                                        type: 'paragraph',
                                        nodes: [
                                            {
                                                object: 'text',
                                                text: '',
                                            },
                                        ],
                                    },
                                ],
                            },
                        }),
                    }
                }
                this.gettingPreparation = false
                this.preparationReady = true
            }
        } catch (error) {}
        // }
    }
    //发布课前准备
    @action async preparationCreate(courseId: string, content: string) {
        try {
            const res = await api.course.preparationCreate({
                courseId: parseInt(courseId),
                content,
            })
            if (res.success) {
                this.getPreparation(courseId)
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
                    this.preview = { ...res.data.volume, status: 1 }
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
    //根据课程查询随堂测
    @action async getClassTest(id: string) {
        this.gettingClassTest = true
        try {
            const res = await api.course.getClassTest(id)
            if (res.success) {
                this.courseId = id
                if (!res.data) {
                    this.classTest = null
                } else if (res.data.status === 0) {
                    this.classTest = res.data.volume
                } else {
                    // @ts-ignore
                    this.classTest = { ...res.data.volume, status: 1 }
                    this.doClassTestInfo = res.data.info
                }
                if (res.data) {
                    this.setType(res.data.volume)
                }

                this.gettingClassTest = false
                this.classTestReady = true
            }
        } catch (error) {}
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
        try {
            const res = await api.course.bindingClassTest(data)
            if (res.success) {
                this.getClassTest(courseId)
            }
        } catch (error) {}
    }
    //根据课程查询作业
    @action async getTask(id: string) {
        this.gettingTask = true
        try {
            const res = await api.course.getTask(id)
            if (res.success) {
                this.courseId = id
                if (!res.data) {
                    this.task = null
                } else if (res.data.status === 0) {
                    this.task = res.data.volume
                } else {
                    // @ts-ignore
                    this.task = { ...res.data.volume, status: 1 }
                    this.doTaskInfo = res.data.info
                }
                if (res.data) {
                    this.setType(res.data.volume)
                }
                this.gettingTask = false
                this.taskReady = true
            }
        } catch (error) {}
    }
    @action async bindingTask(courseId: string, volumeId: number) {
        let data = {
            courseId: parseInt(courseId),
            volumeId: volumeId,
            testId: this.task ? this.task.id : 0,
        }
        if (data.testId === 0) {
            delete data.testId
        }
        try {
            const res = await api.course.bindingTask(data)
            if (res.success) {
                this.getTask(courseId)
            }
        } catch (error) {}
    }
    //根据课程查询测试
    @action async getExamination(id: string) {
        this.gettingExamination = true
        try {
            const res = await api.course.getExamination(id)
            if (res.success) {
                this.courseId = id
                if (!res.data) {
                    this.examination = null
                } else if (res.data.status === 0) {
                    this.examination = res.data.volume
                } else {
                    // @ts-ignore
                    this.examination = { ...res.data.volume, status: 1 }
                    this.doExaminationInfo = res.data.info
                }
                if (res.data) {
                    this.setType(res.data.volume)
                }
                this.gettingExamination = false
                this.examinationReady = true
            }
        } catch (error) {}
    }
    @action async bindingExamination(courseId: string, volumeId: number) {
        let data = {
            courseId: parseInt(courseId),
            volumeId: volumeId,
            testId: this.examination ? this.examination.id : 0,
        }
        if (data.testId === 0) {
            delete data.testId
        }
        try {
            const res = await api.course.bindingExamination(data)
            if (res.success) {
                this.getExamination(courseId)
            }
        } catch (error) {}
    }
    //发布试卷
    @action async publishVolume(data: IPublishVolume, type: number) {
        try {
            const res = await api.course.publishVolume(data)
            if (res.success) {
                if (type === 1) {
                    this.getClassTest(this.courseId)
                } else if (type === 2) {
                    this.getTask(this.courseId)
                } else if (type === 3) {
                    this.getExamination(this.courseId)
                } else if (type === 4) {
                    this.getPreview(this.courseId)
                }
            }
        } catch (error) {}
    }

    //收卷
    @action async testOver(id: number, type: number) {
        try {
            const res = await api.course.testOver(id)
            if (res.success) {
                if (type === 1) {
                    this.getClassTest(this.courseId)
                } else if (type === 2) {
                    this.getTask(this.courseId)
                } else if (type === 3) {
                    this.getExamination(this.courseId)
                } else if (type === 4) {
                    this.getPreview(this.courseId)
                }
            }
        } catch (error) {}
    }
}

export const courseStore = new CourseStore()
