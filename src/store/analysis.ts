import { observable, action } from 'mobx'

import api from '../api'

interface Point {
    x: number
    y: number
}

interface Node {
    id: number
    index: number
    name: string
    path: string
    rotate: number
    absoluteCorner: Point
    absoluteDelta: Point
    parentAbsoluteDelta: Point
    parentId: number
    avgAccuracy: number
}

export interface IAnalysisStore {
    nodes: Node[]
    nodesReady: boolean
    getKnowleggePoint(): Promise<void>
}

class AnalysisStore implements IAnalysisStore {
    @observable nodesReady = false
    @observable nodes: Node[] = []

    @action async getKnowleggePoint() {
        if (!this.nodesReady) {
            try {
                const res = await api.analysis.getKnowledgePoints()
                if (res.success) {
                    this.nodes = res.data
                    this.nodesReady = true
                }
            } catch (error) {}
        }
    }
}

export const analysisStore = new AnalysisStore()
