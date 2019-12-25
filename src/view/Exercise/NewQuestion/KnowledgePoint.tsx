import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { FiPlusCircle } from 'react-icons/fi'
import { append } from 'ramda'

import PointSelector from '../../../components/PointSelector'
import Knowledge from '../../../components/Knowledge'

const Container = styled.div`
    background-color: #fff;
    padding: 15px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin-top: 15px;
`
const Text = styled.div`
    color: #666;
    font-size: 14px;
    margin-right: 15px;
`
const AddButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: pointer;
    color: #666;
    height: 36px;
    &:hover {
        color: #00a6f3;
    }
`
const CustomKnowledge = styled(Knowledge)`
    margin-bottom: 0;
`

interface IPoint {
    id: number
    name: string
}

const KnowledgePoint: FC = () => {
    const [showPointSelector, setShowPointSelector] = useState(false)
    const [selectedPoints, setSelectedPoints] = useState<IPoint[]>([])
    const [selectedPointsId, setSelectedPointsId] = useState<number[]>([])
    const handleClose = () => {
        setShowPointSelector(false)
    }
    const handleOpenPointSelector = () => {
        setShowPointSelector(true)
    }
    const handleSelectPoint = (point: IPoint) => {
        setSelectedPointsId(
            selectedPointsId.includes(point.id)
                ? selectedPointsId.filter(x => x !== point.id)
                : append(point.id, selectedPointsId)
        )
        setSelectedPoints(
            selectedPoints.includes(point)
                ? selectedPoints.filter(x => x.id !== point.id)
                : append(point, selectedPoints)
        )
    }
    return (
        <Container>
            <Text>知识点</Text>
            {selectedPoints.map(v => (
                <CustomKnowledge data={v} key={v.id} />
            ))}
            <AddButton onClick={handleOpenPointSelector}>
                <FiPlusCircle />
            </AddButton>
            {showPointSelector && (
                <PointSelector
                    onClose={handleClose}
                    selectedPoints={selectedPoints}
                    selectPoint={handleSelectPoint}
                    selectedPointsId={selectedPointsId}
                />
            )}
        </Container>
    )
}

export default KnowledgePoint
