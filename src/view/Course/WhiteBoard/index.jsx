import React, { useRef, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { SketchField, Tools } from 'react-sketch'

import ToolBar from './ToolBar'

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const WhiteBoard = () => {
    const ref = useRef(null)
    const [currentTool, setCurrentTool] = useState(Tools.Pencil)
    const [currentColor, setCurrentColor] = useState('#000')
    const [currentWeight, setCurrentWeight] = useState(4)
    const [data, setData] = useState(null)

    const handleChangeTool = tool => {
        setCurrentTool(tool)
    }

    const handleChangeColor = color => {
        setCurrentColor(color)
    }

    const handleClear = () => {
        ref.current.clear()
    }

    const handleChangeWeight = weight => {
        setCurrentWeight(weight)
    }

    // todo 此处需要真正的保存代码
    const handleSave = () => {
        console.log(JSON.stringify(ref.current.toJSON()))
        setData(JSON.stringify(ref.current.toJSON()))
    }

    // todo 此处需要真正的退出代码
    const handleExit = () => {
        console.log(data)
        ref.current.fromJSON(JSON.parse(data))
    }

    const handleAddText = () => {
        ref.current.addText('请在此输入文字')
    }

    const handleUndo = () => {
        // * 解决无可撤销时的bug
        if (ref.current.canUndo()) {
            ref.current.undo()
        }
    }

    // * 当用户点击<backspace>或者<delete>时，删除当前所选择的元素
    useEffect(() => {
        const eventHandler = event => {
            if (event.keyCode === 46 || event.keyCode === 8) {
                ref.current.removeSelected()
            }
        }
        document.addEventListener('keydown', eventHandler)
        return () => document.removeEventListener('keydown', eventHandler)
    }, [])
    return (
        <Container id='white-board'>
            <ToolBar
                changeTool={handleChangeTool}
                changeColor={handleChangeColor}
                clear={handleClear}
                changeWeight={handleChangeWeight}
                currentTool={currentTool}
                currentColor={currentColor}
                currentWeight={currentWeight}
                save={handleSave}
                exit={handleExit}
                addText={handleAddText}
                undo={handleUndo}
            ></ToolBar>
            <SketchField
                ref={ref}
                width='100%'
                height='100%'
                tool={currentTool}
                lineColor={currentColor}
                lineWidth={currentWeight}
            />
        </Container>
    )
}

export default WhiteBoard
