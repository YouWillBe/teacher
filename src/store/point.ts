import { observable, action } from 'mobx'
import { append } from 'ramda'

import api from '../api'

interface Lore {
    id: number
    name: string
    children?: Lore[]
    expanded: boolean
}
interface Point {
    pid: number
    lores: Lore[]
}
interface Tag {
    id: number
    name: string
}
export interface IPointStore {
    points: Point[]
    tags: Tag[]
    getPoints(tagId: number): Promise<void>
    getTags(): Promise<void>
    currentTag: number
    tagReady: boolean
    currentPoints: Lore[]
}

class PointStore implements IPointStore {
    @observable points: Point[] = []
    localTag: number[] = []
    @observable tags: Tag[] = []
    @observable currentTag: number = 0
    @observable tagReady: boolean = false
    @observable pointReady: boolean = false
    @observable currentPoints: Lore[] = []

    @action async getTags() {
        if (!this.tagReady) {
            const res = await api.point.getTags()
            if (res.success) {
                this.tags = res.data
                this.tagReady = true
                this.currentTag = res.data[0].id
                this.getPoints(res.data[0].id)
            }
        }
    }

    @action async getPoints(tagId: number) {
        this.currentTag = tagId
        if (!this.localTag.includes(tagId)) {
            this.pointReady = false
            const res = await api.point.getPoints({ id: tagId })
            if (res.success) {
                this.localTag = append(tagId, this.localTag)
                this.points = append({ pid: tagId, lores: res.data }, this.points)
                this.currentPoints = res.data
                this.pointReady = true
            }
        } else {
            this.currentPoints = this.points.filter(x => x.pid === tagId)[0].lores
        }
    }
}

export const pointStore = new PointStore()
