import React, { useState, FC, KeyboardEventHandler, ChangeEventHandler, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa'

import { IStore } from '../../store'

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
    display: flex;
    align-items: center;
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
    max-width: 100%;
`
const LoreText = styled.div`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    flex-grow: 1;
`
const Tag = styled.div`
    flex-shrink: 0;
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

const KnowledgePoint: FC = () => {
    const { planStore } = useContext<IStore>(MobXProviderContext)
    const [value, setValue] = useState('')
    const handleKeyDown: KeyboardEventHandler = e => {
        if (e.which === 13) {
            if (!value) return
            planStore.createLore(value)
            setValue('')
        }
    }
    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
        setValue(e.target.value)
    }
    const handleRemove = (index: number, id: number) => {
        planStore.removeLore(index, id)
    }
    return useObserver(() => (
        <Container>
            <Input placeholder='回车添加知识点' onKeyDown={handleKeyDown} value={value} onChange={handleChange} />
            {planStore.plan.loreList.length === 0 ? (
                <Content>
                    <Icon>
                        <FaExclamationTriangle></FaExclamationTriangle>
                    </Icon>
                    <Text>还没有知识点，请添加</Text>
                </Content>
            ) : (
                <LoreWrap>
                    {planStore.plan.loreList.map((v, i) => (
                        <Lore key={v.id}>
                            <LoreText title={v.name}>{v.name}</LoreText>
                            <Tag onClick={() => handleRemove(i, v.id)}>
                                <FaTimes></FaTimes>
                            </Tag>
                        </Lore>
                    ))}
                </LoreWrap>
            )}
        </Container>
    ))
}

export default KnowledgePoint
