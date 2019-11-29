import React, { useContext, useState } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { FaPlus } from 'react-icons/fa'

import { IStore } from '../../../store'
import Button from '../../../components/Button'
import PreviewList from './PreviewList'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 280px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    padding: 0 20px;
`

const Span = styled.span`
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    margin-left: 8px;
`

function NotDataAdd() {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)
    const [isShow, setIsShow] = useState(false)

    //查看试卷
    const handleClickAdd = () => {
        volumeStore.getProblemTypeList({
            page: 1,
            limit: 10,
            type: volumeStore.volumeProblem.type,
        })
        setIsShow(true)
    }

    //关闭查看
    const handleClickClose = () => {
        setIsShow(false)
    }

    const optionButton = {
        bgColor: '#409EFF',
        shadow: '0px 4px 11px 0px rgba(64,158,255,0.5)',
    }

    return useObserver(() => {
        return (
            <Container>
                <Button options={optionButton} onClick={handleClickAdd}>
                    <FaPlus></FaPlus>
                    <Span>添加题目</Span>
                </Button>
                {isShow && <PreviewList onClickClose={handleClickClose}></PreviewList>}
            </Container>
        )
    })
}

export default NotDataAdd
