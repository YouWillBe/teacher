import React, { FC, MouseEventHandler } from 'react'
import styled from '@emotion/styled'
import KnowledgePoint from './KnowledgePoint'
// import Annex from './Annex'

const Container = styled.div`
    position: fixed;
    top: 20px;
    right: 30px;
    width: 230px;
    z-index: 11;
`
const Save = styled.div`
    height: 50px;
    width: 100%;
    margin-top: 20px;
    border-radius: 6px;
    text-align: center;
    line-height: 50px;
    border: 1px solid #ccc;
    cursor: pointer;
    box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    color: #777;
`
interface IPoint {
    id: number
    name: string
}
interface IProps {
    selectPoint(point: IPoint): void
    selectedPoints: IPoint[]
    selectedPointsId: number[]
    canSave: boolean
    onSave: MouseEventHandler
}

const Addon: FC<IProps> = ({ selectPoint, selectedPoints, selectedPointsId, canSave, onSave }) => {
    return (
        <Container>
            <KnowledgePoint
                selectPoint={selectPoint}
                selectedPointsId={selectedPointsId}
                selectedPoints={selectedPoints}
            />
            {/* <Annex /> */}
            {canSave && <Save onClick={onSave}>保存</Save>}
        </Container>
    )
}

export default Addon
