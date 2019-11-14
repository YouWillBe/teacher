import { observable, action } from 'mobx'
import { Value } from 'slate'

import api from '../../api'

interface IPreparationData {
    id: number
    statu: number
    content: Value
}
export interface ICoursePreparationStore {
    currentStatu: boolean

    preparationData: IPreparationData
    preparationReady: boolean
    gettingPreparation: boolean
    getPreparation(id: string): Promise<void>
    preparationCreate(courseId: string, content: string): Promise<void>
}

class CoursePreparationStore implements ICoursePreparationStore {
    @observable currentStatu = true
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
}

export const coursePreparationStore = new CoursePreparationStore()
