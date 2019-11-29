import React, { useRef, useState, MouseEvent } from 'react'
import styled from '@emotion/styled'
import useOnClickOutside from 'use-onclickoutside'
import { FaPen, FaMinusCircle } from 'react-icons/fa'

import Dialog from '../../../components/Dialog'
import BlockEdit from './BlockEdit'

const Container = styled.div`
    width: 100%;
`

const Package = styled.div<{ borderColor: boolean }>`
    box-sizing: border-box;
    height: 200px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    border: 2px solid ${props => (props.borderColor ? 'rgba(64, 158, 255, 1)' : '#fff')};
    cursor: pointer;
`

const Header = styled.header`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`
const DeleteWrap = styled.div`
    width: 24px;
    height: 24px;
    line-height: 24px;
    position: absolute;
    right: 8px;
    top: 8px;
    width: 24px;
    font-size: 24px;
    color: #777;
    &:hover {
        color: #eb5454;
        svg {
            cursor: pointer;
        }
    }
`
const CorrectWrap = styled.div`
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid;
    border-radius: 50px;
    position: absolute;
    left: 8px;
    top: 8px;
    svg {
        color: #777;
        font-size: 14px;
        cursor: pointer;
    }
    :hover {
        background-color: #409eff;
        border-color: #409eff;
        svg {
            color: #fff;
        }
    }
`

const Wrap = styled.div`
    width: 60%;
    font-size: 18px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    text-align: center;
`
const Name = styled.span``

const ConfirmWrap = styled.div`
    width: 120px;
    background-color: #fff;
    position: absolute;
    z-index: 10;
    left: -52px;
    bottom: -44px;
    display: flex;
    align-items: center;
    padding: 8px 3px;
    border-radius: 6px;
    box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    cursor: initial;
`
const Button = styled.div`
    box-sizing: border-box;
    height: 30px;
    line-height: 16px;
    padding: 6px 12px;
    background-color: fff;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 12px;
    color: #555;
    border-radius: 4px;
    border: 1px solid #555;
    cursor: pointer;
    &:hover {
        border-color: #00a6f3;
        color: #00a6f3;
    }
`
const RedButton = styled(Button)`
    border-color: red;
    color: red;
    &:hover {
        background-color: red;
        color: #fff;
        border-color: red;
    }
`
const Ul = styled.ul`
    display: flex;
    justify-content: space-evenly;
    height: 140px;
    align-items: center;
`
const Li = styled.li`
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
`
const TopicType = styled.span<{ bgColor: string }>`
    display: inline-block;
    width: 36px;
    height: 36px;
    background-color: ${props => props.bgColor};
    border-radius: 50%;
    line-height: 36px;
    color: rgba(255, 255, 255, 1);
`
const TopicTypeNumber = styled.span<{ color: string }>`
    width: 36px;
    margin-top: 10px;
    color: ${props => props.color};
`

interface IConfirm {
    close(): void
    confirm(): void
}

function Confirm(props: IConfirm) {
    const ref = useRef(null)
    useOnClickOutside(ref, props.close)
    return (
        <ConfirmWrap ref={ref}>
            <RedButton onClick={props.confirm}>删除</RedButton>
            <Button onClick={props.close}>取消</Button>
        </ConfirmWrap>
    )
}

interface IData {
    index: number
    currentId: number
    checkboxCount: number
    choiceCount: number
    fillingCount: number
    id: number
    judgeCount: number
    name: string
    shortAnswerCount: number
}

interface IProps {
    data: IData
    deleteVolumeTemplate(id: number): void
    onClickTemplet(data: IData): void
    onClickTempletEdit(id: number): void
}

function BackList(props: IProps) {
    const [showConfirm, setShowConfirm] = useState(false)
    const [showRemove, setShowRemove] = useState(false)
    const [isSwitch, setIsSwitch] = useState(false)

    //删除弹窗
    const handleMouseDownRemove = (event: MouseEvent<HTMLDivElement>) => {
        if (event) {
            event.stopPropagation()
        }
        setShowConfirm(true)
    }
    const handleCloseConfirm = () => {
        setShowConfirm(false)
    }
    const handleConfirm = () => {
        props.deleteVolumeTemplate(props.data.id)
        setShowConfirm(false)
    }

    //鼠标经过
    const handleMouseEnter = () => {
        setShowRemove(true)
    }
    const handleMouseLeave = () => {
        if (!showConfirm) {
            setShowRemove(false)
        }
    }

    //选择模板
    const hanleClickTemplet = () => {
        props.onClickTemplet(props.data)
    }

    //编辑模板
    const handleClickEdit = (event?: MouseEvent<HTMLDivElement>) => {
        if (event) {
            event.stopPropagation()
        }
        if (!isSwitch) {
            props.onClickTempletEdit(props.data.id)
        }
        setIsSwitch(!isSwitch)
    }

    return (
        <Container>
            <Package
                borderColor={props.data.currentId === props.data.id}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={hanleClickTemplet}
            >
                <Header>
                    {showRemove && (
                        <CorrectWrap title='编辑' onClick={handleClickEdit}>
                            <FaPen></FaPen>
                        </CorrectWrap>
                    )}
                    <Wrap>
                        <Name>{props.data.name}</Name>
                    </Wrap>
                    {showRemove && (
                        <DeleteWrap onClick={handleMouseDownRemove} title='删除'>
                            {showConfirm && <Confirm close={handleCloseConfirm} confirm={handleConfirm} />}
                            <FaMinusCircle></FaMinusCircle>
                        </DeleteWrap>
                    )}
                </Header>
                <Ul>
                    <Li>
                        <TopicType bgColor='#144E5E'>单</TopicType>
                        <TopicTypeNumber color='#144E5E'>{props.data.choiceCount}</TopicTypeNumber>
                    </Li>
                    <Li>
                        <TopicType bgColor='#F96C3B'>多</TopicType>
                        <TopicTypeNumber color='#F96C3B'>{props.data.checkboxCount}</TopicTypeNumber>
                    </Li>
                    <Li>
                        <TopicType bgColor='#FF9A3C'>判</TopicType>
                        <TopicTypeNumber color='#FF9A3C'>{props.data.judgeCount}</TopicTypeNumber>
                    </Li>
                    <Li>
                        <TopicType bgColor='#E6255D'>填</TopicType>
                        <TopicTypeNumber color='#E6255D'>{props.data.fillingCount}</TopicTypeNumber>
                    </Li>
                    <Li>
                        <TopicType bgColor='#005691'>答</TopicType>
                        <TopicTypeNumber color='#005691'>{props.data.shortAnswerCount}</TopicTypeNumber>
                    </Li>
                </Ul>
            </Package>
            {isSwitch && (
                <Dialog title='编辑' onClickClose={handleClickEdit}>
                    <BlockEdit onClickClose={handleClickEdit}></BlockEdit>
                </Dialog>
            )}
        </Container>
    )
}

export default BackList
