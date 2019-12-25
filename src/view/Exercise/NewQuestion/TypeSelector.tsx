import React, { FC } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background-color: #fff;
    padding: 15px;
    border-radius: 4px;
    display: flex;
    align-items: center;
`
const Text = styled.div`
    color: #666;
    font-size: 14px;
    margin-right: 15px;
`
const TypeWrap = styled.ul`
    display: flex;
`
const Type = styled.span<{ selected: boolean }>`
    display: inline-block;
    text-align: center;
    background-color: ${props => (props.selected ? 'rgba(50, 158, 245, 1)' : '#fff')};
    color: ${props => (props.selected ? '#fff' : '')};
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    padding: 6px 12px;
    transition: all 0.1s linear;
    margin-right: 12px;
    border: 1px solid #e9e9e9;
    &:hover {
        box-shadow: 0 2px 8px 0 rgba(50, 50, 50, 0.08);
    }
`

const typeList = ['单选', '多选', '判断', '填空', '简答']

interface IProps {
    currentType: number
    onChangeType(index: number): void
}

const TypeSelector: FC<IProps> = ({ currentType ,onChangeType}) => {
    const handleChangeType = (index: number) => {
        if(index === currentType) {
            return
        }
        onChangeType(index)
    }
    return (
        <Container>
            <Text>题目类型</Text>
            <TypeWrap>
                {typeList.map((v, i) => (
                    <Type key={i} selected={currentType === i} onClick={() => handleChangeType(i)}>
                        {v}
                    </Type>
                ))}
            </TypeWrap>
        </Container>
    )
}

export default TypeSelector
