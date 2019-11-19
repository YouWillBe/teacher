import React, { useRef, useState, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { SketchField, Tools } from 'react-sketch'
import { navigate } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import Loading from '../../../components/Loading'

import ToolBar from './ToolBar'

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const WhiteBoard = props => {
    const ref = useRef(null)
    const [currentTool, setCurrentTool] = useState(Tools.Pencil)
    const [currentColor, setCurrentColor] = useState('#000')
    const [currentWeight, setCurrentWeight] = useState(4)

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

    const handleSave = () => {
        courseIndexStore.upsertWhiteBoard({
            courseId: props.courseId,
            content: JSON.stringify(ref.current.toJSON()),
        })
    }

    const handleExit = () => {
        navigate(`/course/${props.courseId}/plan`)
    }

    const handleAddText = () => {
        setCurrentTool('select')
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
            if (event.target.tagName !== 'TEXTAREA') {
                if (event.keyCode === 46 || event.keyCode === 8) {
                    ref.current.removeSelected()
                }
            }
        }
        document.addEventListener('keydown', eventHandler)
        return () => document.removeEventListener('keydown', eventHandler)
        // eslint-disable-next-line
    }, [])

    const { courseIndexStore } = useContext(MobXProviderContext)

    useEffect(() => {
        courseIndexStore.getWhiteBoard(props.courseId)
        // eslint-disable-next-line
    }, [])

    return useObserver(() => {
        if (!courseIndexStore.whiteBoardReady) {
            return <Loading />
        }
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
                />
                <SketchField
                    ref={ref}
                    width='100%'
                    height='100%'
                    tool={currentTool}
                    lineColor={currentColor}
                    lineWidth={currentWeight}
                    value={courseIndexStore.whiteBoard}
                />
            </Container>
        )
    })
}

export default WhiteBoard
