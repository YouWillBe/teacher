import React, { useState, FC, KeyboardEventHandler, ChangeEventHandler } from 'react'
import styled from '@emotion/styled'
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa'

const Container = styled.div`
    width: 100%;
    min-height: 200px;
    background-color: #fff;
    box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 15px;
`
const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    padding: 5px 10px;
    border-radius: 3px;
    border: 1px solid #ccc;
    outline: none;
    &:focus {
        border-color: #00a6f3;
    }
`
const Content = styled.div`
    min-height: 120px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    color: #777;
`
const Icon = styled.div`
    font-size: 32px;
`
const Text = styled.div`
    font-size: 14px;
`
const LoreWrap = styled.div`
    min-height: 120px;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
`
const Lore = styled.div`
    padding: 0px 6px 0px 12px;
    height: 35px;
    line-height: 33px;
    border: 1px solid rgba(58, 147, 223, 1);
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 10px;
    margin-right: 10px;
    font-size: 12px;
    background-color: rgba(221, 237, 241, 1);
    color: #3a93df;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Tag = styled.div`
    margin-left: 6px;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.1s linear;
    &:hover {
        background-color: #fff;
    }
`
interface ILore {
    id: number
    name: string
}

interface IProps {
    addLore(lore: string): void
    removeLore(id: number): void
    loreList: ILore[]
}

const KnowledgePoint: FC<IProps> = props => {
    const [value, setValue] = useState('')
    const handleKeyDown: KeyboardEventHandler = e => {
        if (e.which === 13) {
            if (!value) return
            if (!value.trim()) {
                setValue('')
                return
            }
            props.addLore(value.trim())
            setValue('')
        }
    }
    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
        setValue(e.target.value)
    }
    return (
        <Container>
            <Input placeholder='回车添加知识点' onKeyDown={handleKeyDown} value={value} onChange={handleChange} />
            {props.loreList.length === 0 ? (
                <Content>
                    <Icon>
                        <FaExclamationTriangle></FaExclamationTriangle>
                    </Icon>
                    <Text>还没有知识点，请添加</Text>
                </Content>
            ) : (
                <LoreWrap>
                    {props.loreList.map((v, i) => (
                        <Lore key={v.id}>
                            {v.name}
                            <Tag onClick={() => props.removeLore(i)}>
                                <FaTimes></FaTimes>
                            </Tag>
                        </Lore>
                    ))}
                </LoreWrap>
            )}
        </Container>
    )
}

export default KnowledgePoint
