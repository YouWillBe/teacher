import React, { FC } from 'react'
import styled from '@emotion/styled'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps } from '@reach/router'
import { FaLocationArrow } from 'react-icons/fa'

import Button from '../../../components/Button'
interface ITypeArr {
    id: number
    name: string
    extent: number
    key: string
}
interface IData {
    currentStatu: number
    totalScore: number | null
    totalProblem: number | null
}

interface IType {
    onClick(id: number): void
    onClickSave(): void
    typeArrData: ITypeArr[]
    data?: IData
}

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
const TypeArr: FC<RouteComponentProps<IType>> = props => {
    //选择类型
    const handleClickType = (id: number) => {
        props.onClick && props.onClick(id)
    }
    //发布试卷
    const handleClickSave = () => {
        props.onClickSave && props.onClickSave()
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
    return useObserver(() => {
        return (
            <Header>
                <TypeArrWrap>
                    <TypeArrUl>
                        {props.typeArrData &&
                            props.typeArrData.map(item => {
                                if (item.extent && item.extent > 0) {
                                    return (
                                        <TypeLi
                                            key={item.id}
                                            statuColo={item.id === (props.data && props.data.currentStatu)}
                                            onClick={() => handleClickType(item.id)}
                                        >
                                            <Name>{item.name}</Name>
                                            <TotalProblem
                                                statuColo={item.id === (props.data && props.data.currentStatu)}
                                            >
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
                    <Button options={arrowButton} onClick={handleClickSave}>
                        <Span>发布试卷</Span>
                        <FaLocationArrow></FaLocationArrow>
                    </Button>
                </ButtonWrap>
            </Header>
        )
    })
}

export default TypeArr
