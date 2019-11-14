import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { FiEdit } from 'react-icons/fi'

import Knowledge from '../Knowledge'
import Button from '../Button'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const KnowledgeWrap = styled.div`
    display: flex;
    align-items: center;
`
const TypeNumber = styled.span`
    box-sizing: border-box;
    font-size: 14px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(237, 73, 126, 1);
    height: 36px;
    line-height: 34px;
    background-color: rgba(255, 246, 244, 1);
    border-radius: 4px;
    border: 1px solid rgba(237, 73, 126, 1);
    padding: 0 10px;
    margin-right: 8px;
    margin-bottom: 6px;
`
const FontWrap = styled.div`
    svg {
        font-size: 20px;
        color: rgba(11, 190, 181, 1);
        cursor: pointer;
    }
`

interface ILoreList {
    id: number
    name: string
}
interface Iprops {
    data: {
        id?: number | 0
        type: number
        loreList: ILoreList[]
        showEditPick?: number | 0
    }
    onClickSelect(): void
}

const HeaderType: FC<Iprops> = props => {
    const [typeArr] = useState(['单选题', '多选题', '判断题', '填空题', '解答题'])

    //去编辑
    const handleClickLink = () => {
        navigate(`/exercise/${props.data.id}`)
    }

    const haneleClickSelect = () => {
        props.onClickSelect()
    }

    const buttonOption1 = {
        height: '30px',
        size: '14px',
        weight: '400',
        family: 'PingFangSC-Regular,PingFangSC',
        bgColor: '#409EFF',
        shadow: '0px 4px 11px 0px rgba(64,158,255,0.5)',
    }
    return (
        <Container>
            <KnowledgeWrap>
                <TypeNumber>
                    {typeArr[props.data.type - 1].slice(0, 2)}#{props.data.id}
                </TypeNumber>
                {props.data.loreList.map((item, index) => (
                    <Knowledge key={item.id} data={{ ...item, index }}></Knowledge>
                ))}
            </KnowledgeWrap>
            {props.data.showEditPick === 1 ? (
                <FontWrap title='点击编辑' onClick={handleClickLink}>
                    <FiEdit></FiEdit>
                </FontWrap>
            ) : props.data.showEditPick === 2 ? (
                <Button options={buttonOption1} title='选择该题目' onClick={haneleClickSelect}>
                    选择
                </Button>
            ) : null}
        </Container>
    )
}

export default HeaderType
