import React, { FC } from 'react'
import styled from '@emotion/styled'
import { FaCaretUp, FaCaretDown } from 'react-icons/fa'

const MyNumberInput = styled.div`
    width: 120px;
    display: flex;
    margin-left: 20px;
    user-select: none;
`
const MyNumber = styled.div`
    width: 40px;
    height: 40px;
    box-shadow: 0px 3px 5px 0px rgba(221, 235, 250, 1);
    border-radius: 2px;
    text-align: center;
    line-height: 40px;
`
const MyCaretWrap = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
`
const MyCaret = styled.div`
    width: 22px;
    height: 14px;
    box-shadow: 0px 3px 5px 0px rgba(221, 235, 250, 1);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
        color: #444;
    }
`
const MyCaret1 = styled(MyCaret)<{ isNumberState: boolean }>`
    cursor: ${props => (props.isNumberState ? 'not-allowed' : 'pointer')};
    background-color: ${props => (props.isNumberState ? '#EBEBEE' : '')};
`
const MyCaret2 = styled(MyCaret)<{ isNumberState: boolean }>`
    cursor: ${props => (props.isNumberState ? 'not-allowed' : 'pointer')};
    background-color: ${props => (props.isNumberState ? '#EBEBEE' : '')};
`
interface Iprops {
    data: {
        statu: boolean
        statu2: boolean
        len: number
    }
    onClickAnswerNumber(text: string, len: number): void
}

const NumberInput: FC<Iprops> = props => {
    return (
        <MyNumberInput>
            <MyNumber>{props.data.len || 0}</MyNumber>
            <MyCaretWrap>
                <MyCaret1
                    onClick={() => props.onClickAnswerNumber('加', props.data.len)}
                    title='加一题'
                    isNumberState={props.data.statu}
                >
                    <FaCaretUp />
                </MyCaret1>
                <MyCaret2
                    onClick={() => props.onClickAnswerNumber('减', props.data.len)}
                    title='减一题'
                    isNumberState={props.data.statu2}
                >
                    <FaCaretDown />
                </MyCaret2>
            </MyCaretWrap>
        </MyNumberInput>
    )
}
export default NumberInput
