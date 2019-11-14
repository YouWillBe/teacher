import React from 'react'
import styled from '@emotion/styled'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'

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

const FontWrap = styled.div`
    svg {
        cursor: pointer;
    }
`
const FontWrap1 = styled(FontWrap)`
    svg {
        color: #eb5454;
    }
`
const FontWrap2 = styled(FontWrap)`
    svg {
        color: #3a93df;
    }
`

interface IProps {
    data: {
        currenNumber: number
        fraction: number | undefined
        id: number
        number: number
        problemType: number
        state: number
        index: number
        name: string
    }
    onClickFont(data: any): void
}

function Subjective(props: IProps) {
    //添加/删除
    const handleClickFont = (text: string) => {
        props.onClickFont({
            text,
            name: props.data.name,
            index: props.data.index,
            id: props.data.id,
            problemType: props.data.problemType,
        })
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
            <FontWrap1 onClick={() => handleClickFont('删除')}>
                <FaPlusCircle title='删除'></FaPlusCircle>
            </FontWrap1>
            <FontWrap2 onClick={() => handleClickFont('添加')}>
                <FaMinusCircle title='添加'></FaMinusCircle>
            </FontWrap2>
        </Container>
    )
}

export default Subjective
