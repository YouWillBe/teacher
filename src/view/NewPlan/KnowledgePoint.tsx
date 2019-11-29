import React, { useState, FC } from 'react'
import styled from '@emotion/styled'
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa'
import PointSelector from '../../components/PointSelector'

const Container = styled.div`
    width: 100%;
    min-height: 200px;
    background-color: #fff;
    box-shadow: rgba(16, 36, 94, 0.4) 0 2px 6px 0;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 15px;
`
const Content = styled.div`
    min-height: 120px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    color: #777;
`
const Icon = styled.div`
    font-size: 32px;
`
const Text = styled.div`
    font-size: 14px;
`
const LoreWrap = styled.div`
    min-height: 120px;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
`
const Lore = styled.div`
    position: relative;
    padding: 0 26px 0 12px;
    height: 35px;
    line-height: 33px;
    border: 1px solid rgba(58, 147, 223, 1);
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 10px;
    font-size: 12px;
    background-color: rgba(221, 237, 241, 1);
    color: #3a93df;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
`
const Tag = styled.div`
    top: 50%;
    margin-top: -10px;
    right: 6px;
    position: absolute;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.1s linear;
    flex-shrink: 0;
    &:hover {
        background-color: #fff;
    }
`
const Button = styled.button`
    display: block;
    cursor: pointer;
    padding: 8px 12px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    background-color: #fff;
    margin: 0 auto;
`
interface IPoint {
    id: number
    name: string
}

interface IProps {
    selectPoint(point: IPoint): void
    selectedPoints: IPoint[]
    selectedPointsId: number[]
}

const KnowledgePoint: FC<IProps> = ({ selectedPointsId, selectedPoints, selectPoint }) => {
    const [showDialog, setShowDialog] = useState(false)
    const handleClickAddKnowledgePoint = () => {
        setShowDialog(true)
    }
    const handleCloseDialog = () => {
        setShowDialog(false)
    }
    return (
        <Container>
            {showDialog && (
                <PointSelector
                    selectedPoints={selectedPoints}
                    onClose={handleCloseDialog}
                    selectPoint={selectPoint}
                    selectedPointsId={selectedPointsId}
                />
            )}
            <Button onClick={handleClickAddKnowledgePoint}>选择知识点</Button>
            {selectedPoints.length === 0 ? (
                <Content>
                    <Icon>
                        <FaExclamationTriangle />
                    </Icon>
                    <Text>还没有知识点，请添加</Text>
                </Content>
            ) : (
                <LoreWrap>
                    {selectedPoints.map(v => (
                        <Lore key={v.id}>
                            {v.name}
                            <Tag onClick={() => selectPoint(v)}>
                                <FaTimes />
                            </Tag>
                        </Lore>
                    ))}
                </LoreWrap>
            )}
        </Container>
    )
}

export default KnowledgePoint
