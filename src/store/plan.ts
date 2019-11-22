import { observable, action } from 'mobx'
import { Value } from 'slate'
import { uniqWith, eqProps, append, remove } from 'ramda'
import { navigate } from '@reach/router'

import api from '../api'

interface CreatePlanConstraint {
    title: string
    loreListId: number[]
    content: string
    attachmentPOList: number[]
}

export interface IPlanStore {
    planListReady: boolean
    gettingPlanList: boolean
    planList: IPlanListItem[]
    pageInfo: IPageInfo
    planReady: boolean
    gettingPlan: boolean
    getPlanList(page: number): Promise<void>
    deletePlan(id: number): Promise<void>
    getPlan(id: number): Promise<void>
    plan: IPlan
    createPlan(plan: CreatePlanConstraint): Promise<void>
    updatePlan(): Promise<void>
    createLore(value: string): Promise<void>
    removeLore(index: number, id: number): Promise<void>
    addLore(data: { name: string }, current: ILore[], callback: any): Promise<void>

    selectedPoints: ILore[]
    selectedPointsId: number[]
    selectPoint(point: ILore): void
}
interface IPlan {
    id: number
    title: string
    loreList: ILore[]
    content: Value
}
interface IPlanListItem {
    id: number
    title: string
    loreList: ILore[]
}
interface ILore {
    id: number
    name: string
}
interface IPageInfo {
    total: number
    page: number
    limit: number
    offset: number
}

class PlanStore implements IPlanStore {
    @observable selectedPoints: ILore[] = []
    @observable selectedPointsId: number[] = []

    @observable planListReady = false
    @observable gettingPlanList = false
    @observable planReady = false
    @observable gettingPlan = false
    @observable planList: IPlanListItem[] = []
    @observable pageInfo = {
        total: 0,
        page: 0,
        limit: 0,
        offset: 0,
    }
    @observable plan: IPlan = {
        id: -1,
        title: '',
        loreList: [],
        content: Value.fromJSON({}),
    }
    @action selectPoint = (point: ILore) => {
        this.selectedPointsId = this.selectedPointsId.includes(point.id)
            ? this.selectedPointsId.filter(x => x !== point.id)
            : append(point.id, this.selectedPointsId)

        this.selectedPoints = this.selectedPoints.includes(point)
            ? this.selectedPoints.filter(x => x.id !== point.id)
            : append(point, this.selectedPoints)
    }
    @action async getPlanList(page: number) {
        this.gettingPlanList = true
        try {
            const res = await api.plan.getPlanList({
                limit: 8,
                page: page,
            })
            if (res.success) {
                this.planList = res.data
                this.pageInfo = res.page
                this.gettingPlanList = false
                this.planListReady = true
            }
        } catch (error) {}
    }
    @action async deletePlan(id: number) {
        try {
            const res = await api.plan.deletePlan(id)
            if (res.success) {
                this.planList = this.planList.filter(v => v.id !== id)
            }
        } catch (error) {}
    }
    @action async createPlan(data: CreatePlanConstraint) {
        try {
            const res = await api.plan.createPlan(data)
            if (res.success) {
                navigate(`/plan/${res.data}`)
            }
        } catch (error) {}
    }
    @action async updatePlan() {
        try {
            await api.plan.updatePlan({
                id: this.plan.id,
                title: this.plan.title,
                content: JSON.stringify(this.plan.content.toJS()),
                loreList: this.selectedPointsId
            })
        } catch (error) {}
    }
    @action async getPlan(id: number) {
        if (id !== this.plan.id) {
            this.gettingPlan = true
            try {
                const res = await api.plan.getPlan(id)
                if (res.success) {
                    this.plan = { ...res.data, content: Value.fromJSON(JSON.parse(res.data.content)) }
                    this.selectedPoints = res.data.loreList
                    this.selectedPointsId = res.data.loreList.map((v: any) => v.id)
                    this.gettingPlan = false
                    this.planReady = true
                }
            } catch (error) {}
        }
    }
    @action async createLore(value: string) {
        try {
            const res = await api.lore.createLore({
                name: value,
                programId: this.plan.id,
            })
            if (res.success) {
                // @ts-ignore
                this.plan.loreList = uniqWith(eqProps('id'))(append({ id: res.data, name: value }, this.plan.loreList))
            }
        } catch (error) {}
    }
    @action async addLore(data: { name: string }, current: ILore[], callback: any) {
        try {
            const res = await api.lore.createLore(data)
            if (res.success) {
                callback(uniqWith(eqProps('id'))(append({ id: res.data, name: data.name }, current)))
            }
        } catch (error) {}
    }
    @action async removeLore(index: number, id: number) {
        try {
            const res = await api.lore.removeLore({
                id: id,
                programId: this.plan.id,
            })
            if (res.success) {
                this.plan.loreList = remove(index, 1, this.plan.loreList)
            }
        } catch (error) {}
    }
}

export const planStore = new PlanStore()
