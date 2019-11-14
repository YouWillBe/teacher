import React, { FC, MouseEvent } from 'react'
import MathQuill from 'react-mathquill'
import styled from '@emotion/styled'

const MyMath = styled(MathQuill)`
    font-size: 24px;
`
const Container = styled.div`
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    & > .mq-editable-field {
        border: none;
        padding: 8px;
    }
`
interface IProps {
    latex: string
    setLatex(latex: string): void
    setMathQuill(mathField: any): void
}

const App: FC<IProps> = ({ latex, setLatex, setMathQuill }) => {
    const handleChange = (mathField: any) => {
        setLatex(mathField.latex())
    }
    const handleMathQuillDidMount = (mathField: any) => {
        setMathQuill(mathField)
    }
    // useImperativeHandle(ref, () => ({
    //     runCmd(command: string) {
    //         mathQuill.cmd(command)
    //     },
    // }))
    const handleClick = (event: MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
    }
    return (
        <Container>
            <MyMath
                latex={latex}
                onChange={handleChange}
                mathquillDidMount={handleMathQuillDidMount}
                onClick={handleClick}
            />
        </Container>
    )
}

export default App
