import React, { useState, FC, ChangeEventHandler, useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import styled from '@emotion/styled'
import { Link, RouteComponentProps } from '@reach/router'
import { Value } from 'slate'
import { append } from 'ramda'
import { FaReply, FaRegEye, FaHistory } from 'react-icons/fa'

import { IStore } from '../../store'

import Addon from './Addon'
import Editor from '../../components/EditorX'

const Wrap = styled.div`
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding-right: 5px;
`
const Container = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    padding-top: 20px;
    padding-bottom: 20px;
    box-sizing: border-box;
    &::-webkit-scrollbar-button {
        background-color: #fff;
    }
    &::-webkit-scrollbar {
        background-color: #fff;
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(66, 88, 99, 0.4);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #ddd;
    }
`
const Handler = styled.div`
    position: fixed;
    top: 50px;
    width: 50px;
    box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
`
const Tag = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #555;
    &:hover {
        color: #00a6f3;
    }
`
const Back = styled(Link)`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #555;
    &:hover {
        color: #00a6f3;
    }
`
const Content = styled.div`
    width: 800px;
    min-height: 100%;
    background-color: #fff;
    margin: 0 auto;
    box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 30px 50px;
`
const Title = styled.input`
    display: block;
    height: 80px;
    line-height: 50px;
    font-size: 30px;
    padding: 0 15px;
    box-sizing: border-box;
    width: 100%;
    outline: none;
    font-weight: 400;
    color: #666;
    font-family: 'Noto Serif', serif;
    border: none;
    text-align: center;
`
const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: #ddd;
    margin-bottom: 8px;
`

interface IPoint {
    id: number
    name: string
}

const NewPlan: FC<RouteComponentProps> = () => {
    const [selectedPoints, setSelectedPoints] = useState<IPoint[]>([])
    const [selectedPointsId, setSelectedPointsId] = useState<number[]>([])
    const { planStore } = useContext<IStore>(MobXProviderContext)
    const [canSave, setCanSave] = useState(false)
    const [value, setValue] = useState(
        Value.fromJSON({
            document: {
                nodes: [
                    {
                        object: 'block',
                        type: 'paragraph',
                        nodes: [
                            {
                                object: 'text',
                                text: '',
                            },
                        ],
                    },
                ],
            },
        })
    )
    const [title, setTitle] = useState('')
    const handleTitleChange: ChangeEventHandler<HTMLInputElement> = e => {
        setTitle(e.target.value)
        if (!canSave) setCanSave(true)
    }
    const onChange = (value: Value) => {
        setValue(value)
        if (!canSave) setCanSave(true)
    }
    const onSave = () => {
        const data = {
            title: title,
            loreListId: selectedPoints.map(v => v.id),
            content: JSON.stringify(value.toJS()),
            attachmentPOList: [],
        }
        planStore.createPlan(data)
    }
    const handleSelectPoint = (point: IPoint) => {
        if (!canSave) setCanSave(true)
        setSelectedPointsId(
            selectedPointsId.includes(point.id)
                ? selectedPointsId.filter(x => x !== point.id)
                : append(point.id, selectedPointsId)
        )
        setSelectedPoints(
            selectedPoints.includes(point)
                ? selectedPoints.filter(x => x.id !== point.id)
                : append(point, selectedPoints)
        )
    }
    return (
        <Wrap>
            <Container>
                <Addon
                    onSave={onSave}
                    canSave={canSave}
                    selectPoint={handleSelectPoint}
                    selectedPoints={selectedPoints}
                    selectedPointsId={selectedPointsId}
                />
                <Handler>
                    <Back to='/plan' title='返回'>
                        <FaReply />
                    </Back>
                    <Tag title='预览'>
                        <FaRegEye />
                    </Tag>
                    <Tag title='最近的教案'>
                        <FaHistory />
                    </Tag>
                </Handler>
                <Content>
                    <Title placeholder='请输入教案标题' value={title} onChange={handleTitleChange} />
                    <Line />
                    <Editor value={value} onChange={onChange} />
                </Content>
            </Container>
        </Wrap>
    )
}

export default NewPlan
