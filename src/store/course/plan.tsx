import { observable, action } from 'mobx'
import { Value } from 'slate'

import api from '../../api'
interface IPlan {
    id: number
    content: Value
    title: string
}
export interface ICoursePlanStore {
    plan: IPlan | null
    planReady: boolean
    gettingPlan: boolean
    getPlan(id: string): Promise<void>
    bindingPlan(courseId: string, planId: number): Promise<void>
}

class CoursePlanStore implements ICoursePlanStore {
    @observable planReady = false
    @observable gettingPlan = false
    @observable plan: IPlan | null = null

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
}

export const coursePlanStore = new CoursePlanStore()
