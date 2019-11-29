import React, { FC, useRef, useState } from 'react'
import useOnClickOutside from 'use-onclickoutside'
import styled from '@emotion/styled'

import Tools from './Tools'
import EditorContent from './EditorContent'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 21;
`
const Content = styled.div`
    width: 80%;
    height: 80%;
    background-color: #f5f5f5;
    box-sizing: border-box;
    padding: 15px;
    border-radius: 4px;
    overflow: hidden;
`

interface IProps {
    close(): void
    latex: string
    setLatex(latex: string): void
}

const FormulaEditor: FC<IProps> = ({ close, latex, setLatex }) => {
    const [mathQuill, setMathQuill] = useState<any>('')

    const ref = useRef(null)
    useOnClickOutside(ref, close)
    const handleClick = (cmd: string) => {
        // @ts-ignore
        mathQuill.write(cmd)
    }
    return (
        <Container>
            <Content ref={ref}>
                <Tools click={handleClick} />
                <EditorContent latex={latex} setLatex={setLatex} setMathQuill={setMathQuill} />
            </Content>
        </Container>
    )
}

export default FormulaEditor
