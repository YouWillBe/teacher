import { observable, action } from 'mobx'
import { Value } from 'slate'
import { append } from 'ramda'

import Toast from '../components/Toast'

import api from '../api'
interface ILoreList {
    id: number
    name: string
}

interface IProblemList {
    answer: any
    id?: number
    option?: any
    answerCount?: any
    type: number
    loreList: ILoreList[]
    solution: any
    topic: any
}
interface IProblemListPage {
    limit: number
    offset: number
    page: number
    total: number
}
interface IGetProblemList {
    limit: number
    page: number
    type?: number
    keyword?: string
}

interface ICurrentAnswer {
    statu: boolean
    name: string
}

interface ISetOption {
    id: number
    value: Value
}

interface IEditProblem {
    id?: number
    topic: string
    option: string
    answer: string
    solution: string
    loreIdList: any
    answerCount: number
    type: number
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

export interface IExerciseStore {
    currentAnswer: ICurrentAnswer[]

    problemListReady: boolean
    gettingProblemList: boolean
    problemList: IProblemList[]
    problemListPage: IProblemListPage
    getProblemList(data: IGetProblemList): Promise<void>
    getProblemTypeList(data: IGetProblemList): Promise<void>

    problemReady: boolean
    gettingProblem: boolean
    problemData: IProblemList
    getProblem(id: number): Promise<void>
    setProblem(type: number): Promise<void>
    setOption(data: ISetOption): Promise<void>
    editProblem(data: IEditProblem): Promise<void>
    addProblem(data: IEditProblem): Promise<void>

    loreList: ILoreList1
    gettingLoreList: boolean
    loreListReady: boolean
    getLoreList(data?: { id: number }): Promise<void>

    loreListId: number[]
    selectedPoints: ILore[]
    selectedPointsId: number[]
    selectPoint(point: ILore): void
}

class ExerciseStore implements IExerciseStore {
    @observable selectedPoints: ILore[] = []
    @observable selectedPointsId: number[] = []

    @observable currentAnswer: ICurrentAnswer[] = []

    @observable problemListReady = false
    @observable gettingProblemList = false
    @observable problemList: IProblemList[] = []
    @observable problemListPage: IProblemListPage = {
        limit: 0,
        offset: 0,
        page: 0,
        total: 0,
    }

    @observable problemReady = false
    @observable gettingProblem = false
    @observable problemData: IProblemList = {
        answer: '',
        option: [],
        answerCount: 0,
        type: 0,
        loreList: [],
        solution: values,
        topic: values,
    }

    @observable loreList: ILoreList1 = {
        lore: [],
        loreList: [],
        checkedId: 0,
    }
    @observable gettingLoreList = false
    @observable loreListReady = false

    @observable loreListId: number[] = []

    @action selectPoint = (point: ILore) => {
        this.selectedPointsId = this.selectedPointsId.includes(point.id)
            ? this.selectedPointsId.filter(x => x !== point.id)
            : append(point.id, this.selectedPointsId)

        this.selectedPoints = this.selectedPoints.includes(point)
            ? this.selectedPoints.filter(x => x.id !== point.id)
            : append(point, this.selectedPoints)
    }

    //题库列表
    @action async getProblemList(data: IGetProblemList) {
        this.gettingProblemList = true
        try {
            const res = await api.exercise.getProblemList(data)
            if (res.success) {
                this.problemList = res.data
                this.problemListPage = res.page
                this.gettingProblemList = false
                this.problemListReady = true
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

    //题库单题查看
    @action async getProblem(id: number) {
        this.gettingProblem = true
        this.selectedPoints = []
        this.selectedPointsId = []
        const res = await api.exercise.getProblem(id)
        if (res.success) {
            let answerOption = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
            let data: any = []
            this.selectedPoints = res.data.loreList
            this.selectedPointsId = res.data.loreList.map((v: any) => v.id)
            if (res.data.type === 1) {
                let answer = res.data.answer
                res.data.option = JSON.parse(res.data.option)
                res.data.option.map((item: any, index: number) => {
                    item.statu = false
                    if (answer === answerOption[index]) {
                        item.statu = true
                    }
                    return item
                })
                this.currentAnswer = data
            } else if (res.data.type === 2) {
                res.data.option = JSON.parse(res.data.option)
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
                this.currentAnswer = data
            } else if (res.data.type === 4 || res.data.type === 5) {
                res.data.answer = JSON.parse(res.data.answer)
                res.data.answerCount = Number(res.data.answerCount)
            }
            this.loreListId = res.data.loreList.map((item: { id: number; name: string }) => {
                return item.id
            })
            this.problemData = {
                ...res.data,
                topic: JSON.parse(res.data.topic),
                solution: JSON.parse(res.data.solution),
            }
            this.gettingProblem = false
            this.problemReady = true
        }
    }

    //题库单题清空
    @action async setProblem(type: number) {
        this.problemData = {
            answer: '',
            option: [],
            answerCount: 0,
            type,
            loreList: [],
            solution: values,
            topic: values,
        }
        this.currentAnswer = []
        this.loreListId = []
        if (type === 4) {
            this.problemData.answer = []
        } else if (type === 5) {
            this.problemData.answer = values
        }
    }

    //题库类型
    @action async setOption(data: ISetOption) {
        this.problemData.option.push(data)
    }

    //题库编辑
    @action async editProblem(data: IEditProblem) {
        try {
            let type1 = [3, 4, 5]
            if (type1.includes(data.type)) {
                delete data.option
            }
            const res = await api.exercise.editProblem(data)
            if (res.success) {
                Toast.success('保存成功')
            }
        } catch (error) {
            Toast.error('保存失败')
        }
    }

    @action async addProblem(data: IEditProblem) {
        try {
            let type1 = [3, 4, 5]
            delete data.id
            if (type1.includes(data.type)) {
                delete data.option
            }
            const res = await api.exercise.addProblem(data)
            if (res.success) {
                this.setProblem(data.type)
                Toast.success('新增成功')
            }
        } catch (error) {
            Toast.error('新增失败')
        }
    }

    //知识点
    @action async getLoreList(data?: { id: number }) {
        this.gettingLoreList = true
        try {
            const res = await api.exercise.getLoreList(data)
            if (res.success) {
                this.loreList = res.data
                this.gettingLoreList = false
                this.loreListReady = true
            }
        } catch (error) {}
    }
}

export const exerciseStore = new ExerciseStore()
