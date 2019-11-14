import React, { FC } from 'react'
import styled from '@emotion/styled'

import {
    FiTrash2,
    FiRotateCcw,
    FiSave,
    FiMousePointer,
    FiType,
    FiLogOut,
    FiEdit2,
    FiMove,
} from 'react-icons/fi'

const Container = styled.div`
    position: fixed;
    height: 40px;
    width: 800px;
    background-color: #eee;
    border-radius: 6px;
    bottom: 8px;
    left: 50%;
    margin-left: -400px;
    z-index: 10;
    color: #fff;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid #ccc;
`
const Wrap = styled.div<{ check: boolean }>`
    cursor: pointer;
    font-size: 22px;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #777;
    background-color: ${props => (props.check ? '#ccc' : '#eee')};
    border-radius: 4px;
    &:hover {
        background-color: #ccc;
    }
`
const Color = styled.div<{ color: string }>`
    cursor: pointer;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background-color: ${props => props.color};
`
const Line = styled.div`
    height: 22px;
    width: 1px;
    background-color: #ccc;
`
const Weight = styled.div<{ weight: number }>`
    background-color: #555;
    height: ${props => props.weight}px;
    width: ${props => props.weight}px;
    border-radius: 50%;
`

interface IProps {
    changeWeight(weight: number): void
    changeTool(tool: string): void
    changeColor(color: string): void
    undo(): void
    clear(): void
    save(): void
    exit(): void
    addText(): void
    currentColor: string
    currentTool: string
    currentWeight: number
}

const ToolBar: FC<IProps> = props => {
    return (
        <Container>
            <Wrap
                check={props.currentColor === '#000'}
                onClick={() => props.changeColor('#000')}
            >
                <Color color='#000'></Color>
            </Wrap>
            <Wrap
                check={props.currentColor === '#fff'}
                onClick={() => props.changeColor('#fff')}
            >
                <Color color='#fff'></Color>
            </Wrap>
            <Wrap
                check={props.currentColor === '#00a6f3'}
                onClick={() => props.changeColor('#00a6f3')}
            >
                <Color color='#00a6f3'></Color>
            </Wrap>
            <Wrap
                check={props.currentColor === '#c00'}
                onClick={() => props.changeColor('#c00')}
            >
                <Color color='#c00'></Color>
            </Wrap>
            <Wrap
                check={props.currentColor === '#0c0'}
                onClick={() => props.changeColor('#0c0')}
            >
                <Color color='#0c0'></Color>
            </Wrap>
            <Wrap
                check={props.currentColor === '#fc0'}
                onClick={() => props.changeColor('#fc0')}
            >
                <Color color='#fc0'></Color>
            </Wrap>
            <Line></Line>
            <Wrap
                check={props.currentWeight === 4}
                onClick={() => props.changeWeight(4)}
                title='较细'
            >
                <Weight weight={4}></Weight>
            </Wrap>
            <Wrap
                check={props.currentWeight === 8}
                onClick={() => props.changeWeight(8)}
                title='中等'
            >
                <Weight weight={8}></Weight>
            </Wrap>
            <Wrap
                check={props.currentWeight === 12}
                onClick={() => props.changeWeight(12)}
                title='较粗'
            >
                <Weight weight={12}></Weight>
            </Wrap>
            <Line></Line>
            <Wrap
                title='笔'
                onClick={() => props.changeTool('pencil')}
                check={props.currentTool === 'pencil'}
            >
                <FiEdit2></FiEdit2>
            </Wrap>
            <Wrap
                title='指针'
                onClick={() => props.changeTool('select')}
                check={props.currentTool === 'select'}
            >
                <FiMousePointer></FiMousePointer>
            </Wrap>
            <Wrap
                title='移动'
                onClick={() => props.changeTool('pan')}
                check={props.currentTool === 'pan'}
            >
                <FiMove></FiMove>
            </Wrap>
            <Line></Line>
            <Wrap title='文字' check={false} onClick={() => props.addText()}>
                <FiType></FiType>
            </Wrap>
            <Wrap title='撤销' check={false} onClick={() => props.undo()}>
                <FiRotateCcw></FiRotateCcw>
            </Wrap>
            <Wrap title='清除' onClick={() => props.clear()} check={false}>
                <FiTrash2></FiTrash2>
            </Wrap>
            <Wrap title='保存' check={false} onClick={() => props.save()}>
                <FiSave></FiSave>
            </Wrap>
            <Wrap title='退出' check={false} onClick={() => props.exit()}>
                <FiLogOut></FiLogOut>
            </Wrap>
        </Container>
    )
}

export default ToolBar
