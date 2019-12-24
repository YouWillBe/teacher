import React, { FC } from 'react'
import { useObserver } from 'mobx-react-lite'

import Dialog from './Dialog'
import LoreList from './LoreList'

interface IPoint {
    id: number
    name: string
}

interface IProps {
    selectedPoints: IPoint[]
    onClose(): void
    selectPoint(point: IPoint): void
    selectedPointsId: number[]
}

const PointSelector: FC<IProps> = props => {
    return useObserver(() => (
        <Dialog onClose={props.onClose} title='添加知识点'>
            <LoreList
                selectedPoints={props.selectedPoints}
                selectPoint={props.selectPoint}
                selectedPointsId={props.selectedPointsId}
            ></LoreList>
        </Dialog>
    ))
}

export default PointSelector
