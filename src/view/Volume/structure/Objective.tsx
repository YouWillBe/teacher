import React, { useContext, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'

import { IStore } from '../../../store'

interface IOption {
    bgColor: string
    color: string
    border: string
}
const Container = styled.div`
    max-width: 130px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 0 auto;
    margin-top: 10px;
`

const Number = styled.div<{ option: IOption }>`
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    background-color: ${props => props.option.bgColor || '#fff'};
    border: 1px solid ${props => props.option.border || 'rgba(20, 78, 94, 1)'};
    border-radius: 50%;
    text-align: center;
    line-height: 28px;
    color: ${props => props.option.color || '#fff'};
    cursor: pointer;
    :hover {
        color: #fff;
        background-color: #144e5e;
    }
`

const ProblemScore = styled.input`
    width: 50px;
    height: 30px;
    box-shadow: 0px 2px 4px 0px rgba(145, 224, 254, 0.5);
    border-radius: 6px;
    outline: none;
    border: none;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(64, 158, 255, 1);
`

interface IProps {
    data: {
        currenNumber: number
        fraction: any
        id: number
        number: number
        problemType: number
        state: number
        index: number
        name: string
    }
    onClickFont(data: any): void
}

function Objective(props: IProps) {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)
    //分
    const handleChangeProblemScore = (event: ChangeEvent<HTMLInputElement>) => {
        if (props.data.name === 'fillingProblems') {
            if (parseInt(event.target.value)) {
                volumeStore.volumeOutline.fillingProblems[props.data.index].fraction = parseInt(event.target.value)
            } else {
                volumeStore.volumeOutline.fillingProblems[props.data.index].fraction = 0
            }
        } else if (props.data.name === 'shortAnswerProblems') {
            if (parseInt(event.target.value)) {
                volumeStore.volumeOutline.shortAnswerProblems[props.data.index].fraction = parseInt(event.target.value)
            } else {
                volumeStore.volumeOutline.shortAnswerProblems[props.data.index].fraction = 0
            }
        }
    }

    //number
    const numberOption = (number: number, state: number) => {
        if (props.data.currenNumber === number) {
            return {
                bgColor: '#144E5E',
                color: '#fff',
                border: '#144E5E',
            }
        } else if (state === 0) {
            return {
                bgColor: '',
                color: '#ED497E',
                border: '#CECECE',
            }
        } else {
            return {
                bgColor: '',
                color: '#666',
                border: '#CECECE',
            }
        }
    }

    return (
        <Container>
            <Number
                option={numberOption(props.data.number, props.data.state)}
                title={props.data.state ? '已设置题目' : '尚未设置题目'}
            >
                {props.data.index + 1}
            </Number>
            <ProblemScore value={props.data.fraction} onChange={handleChangeProblemScore}></ProblemScore>
        </Container>
    )
}

export default Objective
