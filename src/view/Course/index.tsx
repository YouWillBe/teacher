import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps, Link, Router } from '@reach/router'
import { update } from 'ramda'
import { TiArrowBackOutline } from 'react-icons/ti'

import Plan from './Plan'
import Preparation from './Preparation'
import Preview from './Preview'
import ClassTest from './ClassTest'
import Task from './Task'
import Examination from './Examination'

const Wrap = styled.div`
    width: 1260px;
    height: 100%;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 20px;
`
const TabWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    display: flex;
    border-bottom: 1px solid #eee;
    position: relative;
`

const ItemWrap = styled.div`
    height: 49px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TabItem = styled.div<{ isActive: boolean }>`
    box-sizing: border-box;
    width: 110px;
    height: 100%;
    position: relative;
    top: ${props => (props.isActive ? '1px' : '1px')};
    background-color: ${props => (props.isActive ? '#fff' : '')};
    border: ${props => (props.isActive ? '1px solid #e9e9e9' : '')};
    border-bottom: none;
    border-radius: 4px 4px 0 0;
    a {
        color: ${props => (props.isActive ? '#0376D7' : '#333333')};
    }
`
const Item = styled(Link)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: PingFangSC;
    font-weight: 600;
    transition: color 0.1s linear;
    cursor: pointer;
`
const Back = styled(Link)`
    color: #666;
    height: 49px;
    width: 49px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 20;
    transition: all 0.1s linear;
    &:hover {
        background-color: #eee;
        color: #00a6f3;
    }
`
const Content = styled(Router)`
    height: calc(100% - 50px);
`
const Button = styled(Link)`
    position: absolute;
    right: 6px;
    bottom: 6px;
    border: 1px solid #999;
    color: #777;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.1s linear;
    &:hover {
        color: #00a6f3;
        border-color: #00a6f3;
    }
`

interface IParams {
    courseId: string
}

const Course: FC<RouteComponentProps<IParams>> = props => {
    const [active, setActive] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
    ])
    const checkActive = (isCurrent: boolean, index: number) => {
        if (active[index] !== isCurrent) {
            setActive(update(index, isCurrent, active))
        }
        return {}
    }
    return (
        <Wrap>
            <TabWrap>
                <Back title='返回首页' to='/'>
                    <TiArrowBackOutline></TiArrowBackOutline>
                </Back>
                <ItemWrap>
                    <TabItem isActive={active[0]}>
                        <Item
                            to={`/course/${props.courseId}/plan`}
                            getProps={({ isCurrent }) =>
                                checkActive(isCurrent, 0)
                            }
                        >
                            教案
                        </Item>
                    </TabItem>
                    <TabItem isActive={active[1]}>
                        <Item
                            to={`/course/${props.courseId}/preparation`}
                            getProps={({ isCurrent }) =>
                                checkActive(isCurrent, 1)
                            }
                        >
                            课前准备
                        </Item>
                    </TabItem>
                    <TabItem isActive={active[2]}>
                        <Item
                            to={`/course/${props.courseId}/preview`}
                            getProps={({ isCurrent }) =>
                                checkActive(isCurrent, 2)
                            }
                        >
                            预习
                        </Item>
                    </TabItem>
                    <TabItem isActive={active[3]}>
                        <Item
                            to={`/course/${props.courseId}/classTest`}
                            getProps={({ isCurrent }) =>
                                checkActive(isCurrent, 3)
                            }
                        >
                            随堂测
                        </Item>
                    </TabItem>
                    <TabItem isActive={active[4]}>
                        <Item
                            to={`/course/${props.courseId}/task`}
                            getProps={({ isCurrent }) =>
                                checkActive(isCurrent, 4)
                            }
                        >
                            作业
                        </Item>
                    </TabItem>
                    <TabItem isActive={active[5]}>
                        <Item
                            to={`/course/${props.courseId}/examination`}
                            getProps={({ isCurrent }) =>
                                checkActive(isCurrent, 5)
                            }
                        >
                            测试
                        </Item>
                    </TabItem>
                </ItemWrap>
                <Button to={`/course/${props.courseId}/white-board`}>
                    白板
                </Button>
            </TabWrap>
            <Content>
                <Plan path='plan' />
                <Preparation path='preparation' />
                <Preview path='preview'></Preview>
                <ClassTest path='classTest' />
                <Task path='task' />
                <Examination path='examination' />
            </Content>
        </Wrap>
    )
}

export default Course
