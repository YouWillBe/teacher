import React, { useState, useEffect, FC, useRef } from 'react'
import { RenderInlineProps } from 'slate-react'
import styled from 'styled-components'
import TeX from './Tex'

import Editor from './Editor'

const Container = styled.div<{ showBorder: boolean }>`
    outline: none;
    border: 1px solid ${props => (props.showBorder ? '#ddd' : 'transparent')};
    user-select: none;
    display: inline-block;
    border-radius: 4px;
    height: auto;
    padding: 6px;
    margin-left: 5px;
    margin-right: 5px;
    & > div > span {
        margin: 0;
    }
`

interface IProps {
    latex: string
    isReadOnly: boolean | undefined
}

const Formula: FC<RenderInlineProps & IProps> = props => {
    const ref = useRef(null)
    const [showBorder, setShowBorder] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [latex, setLatex] = useState(props.latex)
    const handle = (errorCode: any) => {
        if (errorCode === 'unicodeTextInMathMode') {
            return 'ignore'
        }
        return 'warn'
    }
    const handleDoubleClick = () => {
        if (!props.isReadOnly) {
            props.editor.blur()
            setShowModal(true)
        }
    }
    const handleClose = () => {
        props.editor.setNodeByKey(props.node.key, {
            type: 'formula',
            data: { latex: latex },
        })
        setShowModal(false)
    }
    useEffect(() => {
        if (props.isFocused) {
            setShowBorder(true)
        } else {
            setShowBorder(false)
        }
    }, [props.isFocused])
    return (
        <Container showBorder={showBorder} onDoubleClick={handleDoubleClick} ref={ref} {...props.attributes}>
            <TeX block settings={{ strict: handle }} math={props.latex} />
            {showModal && <Editor close={handleClose} latex={props.latex} setLatex={setLatex} />}
        </Container>
    )
}

export default Formula
