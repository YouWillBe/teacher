import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { useObserver } from 'mobx-react-lite'
import { FaLocationArrow, FaCheck } from 'react-icons/fa'

import Button from '../../../components/Button'
import Dialog from '../../../components/Dialog'
import TypeName from './TypeName'

const Header = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin-top: 20px;
`
const TypeArrWrap = styled.div`
    box-sizing: border-box;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 6px 0px rgba(58, 147, 223, 0.33);
    border-radius: 10px;
`
const TypeArrUl = styled.div`
    box-sizing: border-box;
    height: 70px;
    display: flex;
    align-items: center;
`
const TypeLi = styled.li<{ statuColo: boolean }>`
    width: 80px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    background-color: ${props => (props.statuColo ? '#0376D7' : '')};
    color: ${props => (props.statuColo ? '#fff' : 'rgba(51, 51, 51, 1)')};
    margin-left: 20px;
    border-radius: 10px;
    cursor: pointer;
    :hover {
        background-color: #0376d7;
        span {
            color: #fff;
        }
    }
`
const Name = styled.span``
const TotalProblem = styled.span<{ statuColo: boolean }>`
    color: ${props => (props.statuColo ? '#fff' : '#3d94df')};
`
const TypeLi1 = styled.li`
    width: 150px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
`
const Name1 = styled.span``
const TotalProblem1 = styled.span``
const ButtonWrap = styled.div`
    width: 280px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Span = styled.span`
    margin-right: 18px;
`
const DialogPackage = styled.div`
    display: grid;
    grid-template-columns: 1fr 150px;
`
const DialogLeft = styled.div``
const TypeWrap = styled.div`
    display: grid;
    grid-template-columns: 260px 1fr;
`
const AnswerType = styled.ul`
    display: flex;
`
const AnswerItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
`
const AnswerName = styled.span`
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
`

const EmptyCircle = styled.div<{ setStyle: boolean }>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 6px;
    width: 30px;
    height: 30px;
    border: 2px solid rgba(7, 41, 121, 1);
    background-color: ${props => (props.setStyle ? '#072979' : '#fff')};
    border-radius: 50%;
    cursor: pointer;
    svg {
        font-size: 24px;
        color: ${props => (props.setStyle ? '#fff' : '')};
    }
`

const DialogRight = styled.div`
    display: flex;
    align-items: center;
`

interface ITypeArr {
    id: number
    name: string
    extent: number
    key: string
}
interface IData {
    currentStatu: number
    totalScore: number
    totalProblem: number
    name: string
}

interface IProps {
    title: string
    onClick(id: number): void
    onClickSave(data: any): void
    typeArrData: ITypeArr[]
    data: IData
}

const TypeArr: FC<IProps> = props => {
    const [isShowInfo, setIsShowInfo] = useState(false)
    const [isToggle, setIsToggle] = useState(false)
    const [currenType, setCurrenType] = useState(3)
    const [answerType, setAnswerType] = useState([
        {
            id: 1,
            statu: false,
            name: '线下',
        },
        {
            id: 2,
            statu: false,
            name: '线上+线下',
        },
        {
            id: 3,
            statu: true,
            name: '线上',
        },
    ])

    //选择类型
    const handleClickType = (id: number) => {
        props.onClick && props.onClick(id)
    }
    //发布试卷
    const handleClickSave = () => {
        console.log(123)
        props.onClickSave({ currenType })
    }

    const handleClickClose = () => {
        setIsShowInfo(!isShowInfo)
    }

    //作答类型
    const handleClickAnswerType = (data: { id: number; index: number }) => {
        setAnswerType(answerType => {
            return answerType.map(item => {
                if (item.id === data.id) {
                    item.statu = true
                    setCurrenType(item.id)
                } else {
                    item.statu = false
                }
                return item
            })
        })
    }

    //时间展示
    const handleClickToggle = () => {
        setIsToggle(!isToggle)
    }

    const arrowButton = {
        width: '160px',
        height: '40px',
        bgColor: '#0376D7',
        radius: '30px',
        size: '18px',
        family: 'PingFangSC-Regular',
        weight: '400',
    }
    const optionDialog = {
        width: '50%',
        // marginTop: '160px ',
        borderBottom: ' 1px solid rgba(151, 151, 151, 0.26)',
    }

    return useObserver(() => {
        return (
            <Header>
                <TypeArrWrap>
                    <TypeArrUl>
                        {props.typeArrData!.map(item => {
                            if (item.extent && item.extent > 0) {
                                return (
                                    <TypeLi
                                        key={item.id}
                                        statuColo={item.id === props.data!.currentStatu}
                                        onClick={() => handleClickType(item.id)}
                                    >
                                        <Name>{item.name}</Name>
                                        <TotalProblem statuColo={item.id === (props.data && props.data.currentStatu)}>
                                            {item.id === 0 ? props.data && props.data.totalProblem : item.extent}
                                        </TotalProblem>
                                    </TypeLi>
                                )
                            } else {
                                return null
                            }
                        })}
                    </TypeArrUl>
                    <TypeLi1>
                        <Name1>总分</Name1>
                        <TotalProblem1>{props.data && props.data.totalScore}</TotalProblem1>
                    </TypeLi1>
                </TypeArrWrap>
                <ButtonWrap>
                    <Button options={arrowButton} onClick={handleClickClose}>
                        <Span>{props.title}</Span>
                        <FaLocationArrow></FaLocationArrow>
                    </Button>
                </ButtonWrap>
                {isShowInfo && (
                    <Dialog title={props.data!.name} options={optionDialog} onClickClose={handleClickClose}>
                        <DialogPackage>
                            <DialogLeft>
                                <TypeWrap>
                                    <TypeName text='学生做题方式' type='1'></TypeName>
                                    <AnswerType>
                                        {answerType.map((item, index) => (
                                            <AnswerItem
                                                key={item.id}
                                                onClick={() => handleClickAnswerType({ id: item.id, index })}
                                            >
                                                <AnswerName>{item.name}</AnswerName>
                                                <EmptyCircle setStyle={item.statu}>
                                                    {item.statu && <FaCheck></FaCheck>}
                                                </EmptyCircle>
                                            </AnswerItem>
                                        ))}
                                    </AnswerType>
                                </TypeWrap>
                                <TypeWrap>
                                    <TypeName
                                        text='开始/结束时间'
                                        type='2'
                                        isToggle={isToggle}
                                        onClickToggle={handleClickToggle}
                                    ></TypeName>
                                </TypeWrap>
                            </DialogLeft>
                            <DialogRight>
                                <Button options={arrowButton} onClick={handleClickSave}>
                                    <Span>确定发布</Span>
                                    <FaLocationArrow></FaLocationArrow>
                                </Button>
                            </DialogRight>
                        </DialogPackage>
                    </Dialog>
                )}
            </Header>
        )
    })
}

export default TypeArr
