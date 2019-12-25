import React, { ChangeEventHandler, FC, KeyboardEventHandler, useState } from 'react'
import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'

const Container = styled.div`
    display: flex;
    align-items: center;
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
        box-shadow: 0 2px 8px 0 rgba(50,50,50,.08);
}

    }
`
const SearchWrap = styled.div`
    position: relative;
    margin-left: 12px;
`
const FontWrap = styled.div`
    position: absolute;
    left: 10px;
    height: 100%;
    color: #979797;
    font-size: 18px;
    display: flex;
    align-items: center;
`

const Input = styled.input`
    width: 150px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    outline: none;
    border: 1px solid #e9e9e9;
    padding: 8px 12px 8px 40px;
`


const typeList = ['全部', '单选', '多选', '判断', '填空', '简答']

interface IProps {
    currentType: number
    changeType(index: number): void
}

const Filter: FC<IProps> = ({ currentType, changeType }) => {
    const [keyWord, setKeyWord] = useState('')
    const handleChangeKeyWord: ChangeEventHandler<HTMLInputElement> = event => {
        setKeyWord(event.target.value)
    }
    const handleKeyDown: KeyboardEventHandler = event => {
        if (event.which === 13) {
            // let datas = {
            //     limit: 10,
            //     page: 1,
            //     type: Number(currentType),
            //     keyword: keyWord,
            // }
            // if (currentType === '0') {
            //     delete datas.type
            //     exerciseStore.getProblemList(datas)
            // } else {
            //     exerciseStore.getProblemTypeList(datas)
            // }
            console.log('enter')
        }
    }
    const handleChangeType = (index:number) => {
        if(index === currentType) {
            return
        }
        changeType(index)
    }
    return (
        <Container>
            <TypeWrap>
                {typeList.map((v, i) => (
                    <Type key={i} selected={currentType === i} onClick={() => handleChangeType(i)}>
                        {v}
                    </Type>
                ))}
            </TypeWrap>
            <SearchWrap>
                <FontWrap>
                    <FiSearch />
                </FontWrap>
                <Input
                    value={keyWord}
                    placeholder='搜索知识点'
                    onChange={handleChangeKeyWord}
                    onKeyDown={handleKeyDown}
                />
            </SearchWrap>
        </Container>
    )
}

export default Filter
