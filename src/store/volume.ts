import { observable, action } from 'mobx'
import { navigate } from '@reach/router'
import { Value } from 'slate'
import { append } from 'ramda'

import api from '../api'
import Toast from '../components/Toast'

interface ILore {
    id: number
    name: string
}

interface IVolumePage {
    total: number
    page: number
    limit: number
    offset: number
}
interface IVolumeList {
    id: number
    name: string
    subjectId: number
    totalProblem: number
    totalScore: number
    createTime: number
    loreList: ILore[]
}

interface ITemplateList {
    checkboxCount: number
    choiceCount: number
    createTime: number
    fillingCount: number
    id: number
    judgeCount: number
    name: string
    shortAnswerCount: number
    totalScore: number
}
interface IFillingProblems {
    id?: number
    problemScore: number
    problemType: number
    volumesTemplateId: number
}
interface IObjectiveProblems {
    id: number
    problemCount: number
    problemScore: number
    problemType: number
    volumesTemplateId: number
}
interface ITemplateDetail {
    name: string
    fillingProblems: IFillingProblems[]
    objectiveProblems: IObjectiveProblems[]
    shortAnswerProblems: IFillingProblems[]
}

interface IUpdateVolumeTemplate {
    id: number
    name: string
    choiceCount: number
    checkboxCount: number
    judgeCount: number
    fillingCount: number
    shortAnswerCount: number
    totalScore: number
    deleteListId: number[] | []
    fillingProblems: IFillingProblems[]
    shortAnswerProblems: IFillingProblems[]
    objectiveProblems: IObjectiveProblems[]
}

interface ICreateVolume {
    id?: number
    choiceCount: number
    checkboxCount: number
    judgeCount: number
    fillingCount: number
    shortAnswerCount: number
    totalScore: number
}

interface ICreateAutoVolume {
    volumesTemplate: ICreateVolume
    loreIdList: number[]
}

interface IProblemsType {
    id?: number
    number: number
    problemType: number
    state: number
    fraction?: number
}
interface IProblemTypeIsExit {
    typeName: string
    name: string
    type: number
}
interface IProblemFraction {
    checkboxFraction: number
    chioceFraction: number
    judgeFraction: number
}
interface IVolumeDetailList {
    id: number
    name: string
    state: number
    key: { id: number; type: string }
    checkboxProblems: IProblemsType[]
    choiceProblems: IProblemsType[]
    fillingProblems: IProblemsType[]
    judgeProblems: IProblemsType[]
    shortAnswerProblems: IProblemsType[]
    problemTypeIsExit: IProblemTypeIsExit[]
    problemFraction?: IProblemFraction
    totalScore?: number
}

interface ILoreList {
    id: number
    name: string
}
interface IProblemList {
    answer: any
    fraction: number
    id: number
    option?: any
    type: number
    number: number
    loreList: ILoreList[]
    solution: any
    topic: any
    answerCount?: any
    volumeId: number
}

interface IProblemList1 {
    answer: any
    id: number
    option?: any
    type: number
    loreIdList: number[]
    solution: any
    topic: any
    answerCount?: any
}
interface IProblemListPage {}

interface ICurrentAnswer {
    statu: boolean
    name: string
}
interface IGetProblemList {
    limit: number
    page: number
    type?: number
    keyword?: string
}

interface IUpdateVolumeOutline {
    deleteList: number[] | []
    id: number
    totalScore: number
    totalProblem: number
    checkboxProblems: IProblemsType[]
    choiceProblems: IProblemsType[]
    fillingProblems: IProblemsType[]
    judgeProblems: IProblemsType[]
    shortAnswerProblems: IProblemsType[]
}

interface ILore {
    id: number
    name: string
    parentId?: number
}

interface ILore1 {
    id: number
    name: string
    parentId: number
    children: ILore[]
    expanded: boolean
}
interface ILoreList1 {
    lore: ILore1[]
    loreList: ILore[]
    checkedId: number
}

export interface IVolumeStore {
    selectedAutoPoints: ILore[]
    selectedAutoPointsId: number[]
    selectedPoints: ILore[]
    selectedPointsId: number[]
    selectPoint(point: ILore): void
    selectAutoPoint(point: ILore): void
    currentType: {
        id: number
        name: string
        number: number
    }

    volumeListReady: boolean
    gettingVolumeList: boolean
    volumeList: IVolumeList[]
    volumePage: IVolumePage
    getVolumeList(page: number): Promise<void>
    deleteVolume(id: number): Promise<void>

    templateListReady: boolean
    gettingTemplateList: boolean
    templatePage: number
    templateList: ITemplateList[]
    templateListPage: IVolumePage
    templateObject: ITemplateList
    getTemplateList(page: number): Promise<void>
    createVolumeTemplate(): Promise<void>
    deleteVolumeTemplate(id: number): Promise<void>

    templateDetailReady: boolean
    gettingTemplateDetail: boolean
    templateDetail: ITemplateDetail
    getVolumeTemplateDetail(id: number): Promise<void>

    deleteListId: number[]
    updateVolumeTemplate(data: IUpdateVolumeTemplate, text: string): Promise<void>

    createVolume(data: ICreateVolume): Promise<void>
    createAutomaticVolume(data: ICreateAutoVolume): Promise<void>
    updateVolumeName(data: { id: number; name: string }): Promise<void>

    volumeDetailListReady: boolean
    gettingVolumeDetailList: boolean
    volumeDetailList: IVolumeDetailList
    getVolume(id: number): Promise<void>

    currentAnswer: ICurrentAnswer[]

    volumeProblem: IProblemList
    volumeProblemReady: boolean
    gettingVolumeProblem: boolean
    getVolumeProblem(id: number): Promise<void>

    updateVolumeProblem(data: IProblemList1): Promise<void>
    removeVolumeProblem(data: { id: number; volumeId: number }): Promise<void>

    problemListReady: boolean
    gettingProblemList: boolean
    problemList: IProblemList[]
    problemListPage: IProblemListPage
    getProblemTypeList(data: IGetProblemList): Promise<void>

    volumeOutline: IVolumeDetailList
    volumeOutlineId: number[] | []
    gettingVolumeOutline: boolean
    volumeOutlineReady: boolean
    getVolumeOutline(id: number): Promise<void>

    updateVolumeOutline(data: IUpdateVolumeOutline): Promise<void>

    getVolumeProblemState(): Promise<void>
    volumeProblemState: number
    gettingVolumeProblemState: boolean
    volumeProblemStateReady: boolean

    volumeVolumeProblemAll: IVolumeDetailList
    gettingVolumeProblemAll: boolean
    volumeProblemAllReady: boolean
    getVolumeProblemAll(): Promise<void>

    loreList: ILoreList1
    gettingLoreList: boolean
    loreListReady: boolean
    getLoreList(data?: { id: number }): Promise<void>

    loreListId: number[]
}

let values = Value.fromJSON({
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
})
class VolumeStore implements IVolumeStore {
    @observable currentType = { id: 1, name: 'choiceProblems', number: 1 }

    @observable selectedAutoPoints: ILore[] = []
    @observable selectedAutoPointsId: number[] = []
    @observable selectedPoints: ILore[] = []
    @observable selectedPointsId: number[] = []

    @observable volumeListReady = false
    @observable gettingVolumeList = false
    @observable volumeList: IVolumeList[] = []
    @observable volumePage = {
        total: 0,
        page: 0,
        limit: 0,
        offset: 0,
    }

    @observable templateListReady = false
    @observable gettingTemplateList = false
    @observable templateList: ITemplateList[] = []
    @observable templateListPage = {
        total: 0,
        page: 0,
        limit: 0,
        offset: 0,
    }
    @observable templatePage = 0
    @observable templateObject: ITemplateList = {
        checkboxCount: 0,
        choiceCount: 0,
        createTime: 0,
        fillingCount: 0,
        id: 0,
        judgeCount: 0,
        name: '',
        shortAnswerCount: 0,
        totalScore: 0,
    }

    @observable templateDetailReady = false
    @observable gettingTemplateDetail = false
    @observable templateDetail: ITemplateDetail = {
        name: '',
        fillingProblems: [],
        objectiveProblems: [],
        shortAnswerProblems: [],
    }

    @observable deleteListId = []

    @observable volumeDetailListReady = false
    @observable gettingVolumeDetailList = false
    @observable volumeDetailList: IVolumeDetailList = {
        id: 0,
        name: '',
        state: 0,
        key: {
            id: 0,
            type: 'choiceProblems',
        },
        problemTypeIsExit: [],
        choiceProblems: [],
        checkboxProblems: [],
        fillingProblems: [],
        judgeProblems: [],
        shortAnswerProblems: [],
    }

    @observable currentAnswer: ICurrentAnswer[] = []

    @observable volumeProblemReady = false
    @observable gettingVolumeProblem = false
    @observable volumeProblem: IProblemList = {
        answer: '',
        fraction: 0,
        id: 0,
        type: 0,
        loreList: [],
        number: 0,
        solution: '',
        topic: '',
        answerCount: 0,
        volumeId: 0,
    }

    @observable problemListReady = false
    @observable gettingProblemList = false
    @observable problemList: IProblemList[] = []
    @observable problemListPage: IProblemListPage = {}

    @observable volumeOutline: IVolumeDetailList = {
        id: 0,
        name: '',
        state: 0,
        key: {
            id: 0,
            type: 'choiceProblems',
        },
        problemTypeIsExit: [],
        choiceProblems: [],
        checkboxProblems: [],
        fillingProblems: [],
        judgeProblems: [],
        shortAnswerProblems: [],
        problemFraction: {
            checkboxFraction: 0,
            chioceFraction: 0,
            judgeFraction: 0,
        },
    }
    @observable volumeOutlineId = []
    @observable gettingVolumeOutline = false
    @observable volumeOutlineReady = false

    @observable volumeProblemState = 0
    @observable gettingVolumeProblemState = false
    @observable volumeProblemStateReady = false

    @observable volumeVolumeProblemAll: IVolumeDetailList = {
        id: 0,
        name: '',
        state: 0,
        key: {
            id: 0,
            type: 'choiceProblems',
        },
        problemTypeIsExit: [],
        choiceProblems: [],
        checkboxProblems: [],
        fillingProblems: [],
        judgeProblems: [],
        shortAnswerProblems: [],
        problemFraction: {
            checkboxFraction: 0,
            chioceFraction: 0,
            judgeFraction: 0,
        },
        totalScore: 0,
    }
    @observable gettingVolumeProblemAll = false
    @observable volumeProblemAllReady = false

    @observable loreList: ILoreList1 = {
        lore: [],
        loreList: [],
        checkedId: 0,
    }
    @observable gettingLoreList = false
    @observable loreListReady = false

    @observable loreListId: number[] = []

    @action selectPoint = (point: ILore) => {
        if (this.selectedPointsId.includes(point.id)) {
            this.selectedPointsId = this.selectedPointsId.filter(x => x !== point.id)
            this.selectedPoints = this.selectedPoints.filter(x => x.id !== point.id)
        } else {
            this.selectedPointsId = append(point.id, this.selectedPointsId)
            this.selectedPoints = append(point, this.selectedPoints)
        }
    }

    @action selectAutoPoint = (point: ILore) => {
        if (this.selectedAutoPointsId.includes(point.id)) {
            this.selectedAutoPointsId = this.selectedAutoPointsId.filter(x => x !== point.id)
            this.selectedAutoPoints = this.selectedAutoPoints.filter(x => x.id !== point.id)
        } else {
            this.selectedAutoPointsId = append(point.id, this.selectedAutoPointsId)
            this.selectedAutoPoints = append(point, this.selectedAutoPoints)
        }
    }

    //试卷列表
    @action async getVolumeList(page: number) {
        this.gettingVolumeList = true
        try {
            const res = await api.volume.getVolumeList({
                page: page,
                limit: 8,
            })
            if (res.success) {
                this.volumeList = res.data
                this.volumePage = res.page
                this.volumeListReady = true
                this.gettingVolumeList = false
            }
        } catch (error) {}
    }

    //删除试卷
    @action async deleteVolume(id: number) {
        try {
            const res = await api.volume.deleteVolume(id)
            if (res.success) {
                Toast.success('删除成功')
                this.volumeList = this.volumeList.filter(v => v.id !== id)
            }
        } catch (error) {}
    }

    //模板列表
    @action async getTemplateList(page: number) {
        this.gettingTemplateList = true
        try {
            const res = await api.volume.getVolumeTemplateList({
                page: page,
                limit: 3,
            })
            if (res.success) {
                this.templateObject = res.data[0]
                this.templateList = res.data
                this.templateListPage = res.page
                this.templatePage = page
                this.templateListReady = true
                this.gettingTemplateList = false
            }
        } catch (error) {}
    }

    //创建模板
    @action async createVolumeTemplate() {
        try {
            const res = await api.volume.createVolumeTemplate()
            if (res.success) {
                Toast.success('创建模板成功')
                this.templateList = [
                    ...this.templateList,
                    {
                        checkboxCount: 0,
                        choiceCount: 0,
                        createTime: 0,
                        fillingCount: 0,
                        id: res.data,
                        judgeCount: 0,
                        name: '新的模板',
                        shortAnswerCount: 0,
                        totalScore: 0,
                    },
                ]
            }
        } catch (error) {}
    }

    //删除模板
    @action async deleteVolumeTemplate(id: number) {
        try {
            const res = await api.volume.deleteVolumeTemplate(id)
            if (res.success) {
                this.getTemplateList(this.templatePage)
                Toast.success('删除成功')
                // this.templateList = this.templateList.filter(v => v.id !== id)
            }
        } catch (error) {}
    }

    //模板详情
    @action async getVolumeTemplateDetail(id: number) {
        this.gettingTemplateDetail = true
        try {
            const res = await api.volume.getVolumeTemplateDetail(id)
            if (res.success) {
                this.templateDetailReady = true
                this.gettingTemplateDetail = false
                this.templateDetail = res.data
            }
        } catch (error) {}
    }

    //编辑模板
    @action async updateVolumeTemplate(data: IUpdateVolumeTemplate, text: string) {
        try {
            const res = await api.volume.updateVolumeTemplate(data)
            if (res.success) {
                Toast.success('编辑成功')
                if (text === '保存') {
                    this.getTemplateList(this.templatePage)
                } else if (text === '保存并下一步') {
                    sessionStorage.removeItem('sessionCurrentType')
                    this.createVolume({
                        id: data.id,
                        choiceCount: data.choiceCount,
                        checkboxCount: data.checkboxCount,
                        judgeCount: data.judgeCount,
                        fillingCount: data.fillingCount,
                        shortAnswerCount: data.shortAnswerCount,
                        totalScore: data.totalScore,
                    })
                }
            }
        } catch (error) {}
    }

    //创建试卷
    @action async createVolume(data: ICreateVolume) {
        try {
            const res = await api.volume.createVolume(data)
            if (res.success) {
                Toast.success('创建空白模板完成')
                navigate(`/see/volume/${res.data}`)
            }
        } catch (error) {}
    }

    //自动创建试卷
    @action async createAutomaticVolume(data: ICreateAutoVolume) {
        try {
            const res = await api.volume.createAutomaticVolume(data)
            if (res.success) {
                Toast.success('创建试卷完成')
                navigate(`/see/volume/${res.data}`)
            }
        } catch (error) {}
    }

    //修改试卷名字
    @action async updateVolumeName(data: { id: number; name: string }) {
        try {
            const res = await api.volume.updateVolumeName(data)
            if (res.success) {
                Toast.success('修改成功')
            }
        } catch (error) {}
    }

    //查询试卷详情type
    @action async getVolume(id: number) {
        this.gettingVolumeDetailList = true
        try {
            const res = await api.volume.getVolume(id)
            if (res.success) {
                let typeArr = [
                    'choiceProblems',
                    'checkboxProblems',
                    'judgeProblems',
                    'fillingProblems',
                    'shortAnswerProblems',
                ]
                this.volumeDetailList = res.data
                this.volumeDetailListReady = true
                this.gettingVolumeDetailList = false
                let sessionCurrentType = sessionStorage.getItem('sessionCurrentType')
                if (res.data.problemTypeIsExit.length === 5) {
                    if (sessionCurrentType) {
                        let data = JSON.parse(sessionCurrentType)
                        this.getVolumeProblem(res.data[data.name][data.number - 1].id)
                    } else {
                        this.getVolumeProblem(res.data[typeArr[res.data.problemTypeIsExit[0].type - 1]][0].id)
                    }
                } else if (sessionCurrentType) {
                    let data = JSON.parse(sessionCurrentType)
                    this.getVolumeProblem(res.data[data.name][data.number - 1].id)
                } else if (res.data.problemTypeIsExit.length) {
                    this.getVolumeProblem(res.data[typeArr[res.data.problemTypeIsExit[0].type - 1]][0].id)
                    this.currentType = {
                        id: res.data.problemTypeIsExit[0].type,
                        name: res.data.problemTypeIsExit[0].typeName,
                        number: 1,
                    }
                } else {
                    this.volumeProblem = {
                        answer: '',
                        fraction: 0,
                        id: 0,
                        type: 0,
                        number: 0,
                        loreList: [],
                        solution: '',
                        topic: '',
                        volumeId: res.data.id,
                    }
                    this.currentType = { id: 1, name: 'choiceProblems', number: 1 }
                }
            }
        } catch (error) {}
    }

    //查询试卷详情题目
    @action async getVolumeProblem(id: number) {
        this.gettingVolumeProblem = true
        this.selectedPoints = []
        this.selectedPointsId = []
        const res = await api.volume.getVolumeProblem(id)
        if (res.success) {
            let type = [4, 5]
            let answerOption = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
            res.data.type = res.data.problemType
            this.selectedPoints = res.data.loreList
            this.selectedPointsId = res.data.loreList.map((v: any) => v.id)
            if (res.data.option) {
                res.data.option = JSON.parse(res.data.option)
                if (res.data.problemType === 1) {
                    let answer = res.data.answer
                    res.data.option.map((item: any, index: number) => {
                        item.statu = false
                        if (answer === answerOption[index]) {
                            item.statu = true
                        }

                        return item
                    })
                } else if (res.data.problemType === 2) {
                    let answer = res.data.answer.split(',')
                    res.data.option.map((item: ICurrentAnswer, index: number) => {
                        item.statu = false
                        answer.map((t: string) => {
                            if (answerOption[index] === t) {
                                item.statu = true
                            }
                            return t
                        })
                        return item
                    })
                }
            }
            if (res.data.topic) {
                res.data.topic = JSON.parse(res.data.topic)
            }
            if (res.data.solution) {
                res.data.solution = JSON.parse(res.data.solution)
            }
            if (type.includes(res.data.problemType)) {
                if (res.data.answer !== '') {
                    res.data.answer = JSON.parse(res.data.answer)
                } else {
                    res.data.answer = values
                }
            }
            if (res.data.loreList) {
                this.loreListId = res.data.loreList.map((item: { id: number; name: string }) => {
                    return item.id
                })
            }
            this.volumeProblem = res.data
            this.volumeProblemReady = true
            this.gettingVolumeProblem = false
        }
    }

    //修改试卷详情题目
    @action async updateVolumeProblem(data: IProblemList1) {
        this.gettingVolumeProblem = true
        this.gettingVolumeDetailList = true
        const res = await api.volume.updateVolumeProblem(data)
        if (res.success) {
            Toast.success('修改成功')
            this.gettingVolumeDetailList = false
            this.gettingVolumeProblem = false
            let sessionCurrentType = sessionStorage.getItem('sessionCurrentType')
            //修改状态
            if (sessionCurrentType) {
                let value = JSON.parse(sessionCurrentType)
                ;(this.volumeDetailList as any)[value.name][value.number - 1].state = 1
            } else if (this.volumeDetailList.choiceProblems.length) {
                this.volumeDetailList.choiceProblems[0].state = 1
            }
        }
    }

    //删除试卷详情题目
    @action async removeVolumeProblem(data: { id: number; volumeId: number }) {
        this.gettingVolumeProblem = true
        try {
            const res = await api.volume.removeVolumeProblem(data)
            if (res.success) {
                Toast.success('删除成功')
                let sessionCurrentType = sessionStorage.getItem('sessionCurrentType')
                if (sessionCurrentType) {
                    let datas = JSON.parse(sessionCurrentType)
                    ;(this.volumeDetailList as any)[datas.name][datas.number - 1].state = 0
                }
                this.volumeProblem = {
                    ...this.volumeProblem,
                    answer: '',
                    fraction: 0,
                    id: data.id,
                    type: this.volumeProblem.type,
                    loreList: [],
                    solution: '',
                    topic: '',
                    answerCount: 0,
                    volumeId: data.volumeId,
                }
            }
        } catch (error) {}
    }

    //题库类型
    @action async getProblemTypeList(data: IGetProblemList) {
        this.gettingProblemList = true
        try {
            const res = await api.exercise.getProblemTypeList(data)
            if (res.success) {
                this.problemList = res.data
                this.problemListPage = res.page
                this.gettingProblemList = false
                this.problemListReady = true
            }
        } catch (error) {}
    }

    //结构列表
    @action async getVolumeOutline(id: number) {
        this.gettingVolumeOutline = true
        try {
            const res = await api.volume.getVolumeOutline(id)
            if (res.success) {
                this.volumeOutline = res.data
                this.gettingVolumeOutline = false
                this.volumeOutlineReady = true
            }
        } catch (error) {}
    }

    //修改结构列表
    @action async updateVolumeOutline(data: IUpdateVolumeOutline) {
        this.gettingVolumeOutline = true
        const res = await api.volume.updateVolumeOutline({
            deleteList: data.deleteList,
            id: data.id,
            totalScore: data.totalScore,
            totalProblem: data.totalProblem,
            checkboxProblems: data.checkboxProblems,
            choiceProblems: data.choiceProblems,
            fillingProblems: data.fillingProblems,
            judgeProblems: data.judgeProblems,
            shortAnswerProblems: data.shortAnswerProblems,
        })
        if (res.success) {
            Toast.success('修改结构成功')
            this.volumeDetailList = res.data
            let sessionCurrentType = sessionStorage.getItem('sessionCurrentType')
            let typeArr = [
                'choiceProblems',
                'checkboxProblems',
                'judgeProblems',
                'fillingProblems',
                'shortAnswerProblems',
            ]
            if (res.data.problemTypeIsExit.length === 5) {
                if (sessionCurrentType) {
                    let data = JSON.parse(sessionCurrentType)
                    if (res.data[data.name].length < data.number) {
                        this.getVolumeProblem(res.data[data.name][res.data[data.name].length - 1].id)
                        this.currentType = {
                            ...data,
                            number: res.data[data.name][res.data[data.name].length - 1].number,
                        }
                        sessionStorage.setItem(
                            'sessionCurrentType',
                            JSON.stringify({
                                ...data,
                                number: res.data[data.name][res.data[data.name].length - 1].number,
                            })
                        )
                    } else {
                        this.getVolumeProblem(res.data[data.name][data.number - 1].id)
                    }
                } else {
                    this.getVolumeProblem(res.data[typeArr[res.data.problemTypeIsExit[0].type - 1]][0].id)
                }
            } else if (sessionCurrentType) {
                let data = JSON.parse(sessionCurrentType)
                if (res.data[data.name].length > 0) {
                    if (res.data[data.name].length < data.number) {
                        this.getVolumeProblem(res.data[data.name][res.data[data.name].length - 1].id)
                        this.currentType = {
                            ...data,
                            number: res.data[data.name][res.data[data.name].length - 1].number,
                        }
                        sessionStorage.setItem(
                            'sessionCurrentType',
                            JSON.stringify({
                                ...data,
                                number: res.data[data.name][res.data[data.name].length - 1].number,
                            })
                        )
                    } else {
                        this.getVolumeProblem(res.data[data.name][data.number - 1].id)
                    }
                } else {
                    this.volumeProblem = {
                        answer: '',
                        fraction: 0,
                        id: 0,
                        type: 0,
                        number: 0,
                        loreList: [],
                        solution: '',
                        topic: '',
                        volumeId: res.data.id,
                    }
                }
            } else if (res.data.choiceProblems.length) {
                this.getVolumeProblem(res.data.choiceProblems[0].id)
            } else {
                this.volumeProblem = {
                    answer: '',
                    fraction: 0,
                    id: 0,
                    type: 0,
                    number: 0,
                    loreList: [],
                    solution: '',
                    topic: '',
                    volumeId: res.data.id,
                }
            }
        }
    }

    //预览试卷查看是否空题
    @action async getVolumeProblemState() {
        this.gettingVolumeProblemState = true
        try {
            const res = await api.volume.getVolumeProblemState({ volumeId: this.volumeDetailList.id })
            if (res.success) {
                this.volumeProblemState = res.data
                this.gettingVolumeProblemState = false
                this.volumeProblemStateReady = true
                if (res.data === 1) {
                    this.getVolumeProblemAll()
                }
            }
        } catch (error) {}
    }

    //预览试卷全部题目
    @action async getVolumeProblemAll() {
        this.gettingVolumeProblemAll = true
        try {
            const res = await api.volume.getVolumeProblemAll(this.volumeDetailList.id)
            if (res.success) {
                this.volumeVolumeProblemAll = res.data
                this.gettingVolumeProblemAll = false
                this.volumeProblemAllReady = true
            }
        } catch (error) {}
    }

    //知识点
    @action async getLoreList(data?: { id: number }) {
        this.gettingLoreList = true
        try {
            const res = await api.point.getPoints(data)
            if (res.success) {
                this.loreList = res.data
                this.gettingLoreList = false
                this.loreListReady = true
            }
        } catch (error) {}
    }
}

export const volumeStore = new VolumeStore()
