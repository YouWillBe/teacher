import React, { FC } from 'react'
import styled from '@emotion/styled'

import ChoiceProblem from './ChoiceProblem'
import JudgeProblem from './JudgeProblem'
import FillingProblem from './FillingProblem'
import ShortAnswerProblem from './ShortAnswerProblem'

const Container = styled.div`
    width: 100%;
    height: 100%;
`

interface ILoreList {
    id: number
    name: string
}
interface IProps {
    data: {
        index?: number | 0
        id?: number | 0
        topic: any
        answer: any
        studentAnswer?: any
        fraction?: number
        option?: any
        type: number
        loreList: ILoreList[]
        solution: any
        showEditPick?: number | 0
    }
    onClickSelect?(data: any): void
}

const Preview: FC<IProps> = props => {
    return (
        <Container>
            {props.data.type === 1 && <ChoiceProblem data={props.data} onClickSelect={props.onClickSelect} />}
            {props.data.type === 2 && <ChoiceProblem data={props.data} onClickSelect={props.onClickSelect} />}
            {props.data.type === 3 && <JudgeProblem data={props.data} onClickSelect={props.onClickSelect} />}
            {props.data.type === 4 && <FillingProblem data={props.data} onClickSelect={props.onClickSelect} />}
            {props.data.type === 5 && <ShortAnswerProblem data={props.data} onClickSelect={props.onClickSelect} />}
        </Container>
    )
}

export default Preview
