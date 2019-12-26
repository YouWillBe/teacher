import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { update } from 'ramda'
import { TiArrowBackOutline } from 'react-icons/ti'
import { useParams, Switch, Route } from 'react-router-dom'

import Plan from './Plan'
import Preparation from './Preparation'
import Preview from './Preview'
import ClassTest from './ClassTest'
import Task from './Task'
import Examination from './Examination'
import WhiteBoard from './WhiteBoard'

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
    font-family: PingFangSC, sans-serif;
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

const Course: FC = props => {
    const { courseId } = useParams()
    return (
        <Wrap>
            <TabWrap>
                <Back title='返回首页' to='/'>
                    <TiArrowBackOutline />
                </Back>
                <ItemWrap>
                    <TabItem isActive={true}>
                        <Item to={`/course/${courseId}/plan`}>教案</Item>
                    </TabItem>
                    <TabItem isActive={true}>
                        <Item to={`/course/${courseId}/preparation`}>课前准备</Item>
                    </TabItem>
                    <TabItem isActive={true}>
                        <Item to={`/course/${courseId}/preview`}>预习</Item>
                    </TabItem>
                    <TabItem isActive={true}>
                        <Item to={`/course/${courseId}/classTest`}>随堂测</Item>
                    </TabItem>
                    <TabItem isActive={true}>
                        <Item to={`/course/${courseId}/task`}>作业</Item>
                    </TabItem>
                    <TabItem isActive={true}>
                        <Item to={`/course/${courseId}/examination`}>测试</Item>
                    </TabItem>
                </ItemWrap>
                <Button to={`/course/${courseId}/white-board`}>白板</Button>
            </TabWrap>
            <Switch>
                <Route path='/course/:courseId/plan'>
                    <Plan />
                </Route>
                <Route path='/course/:courseId/preparation'>
                    <Preparation />
                </Route>
                <Route path='/course/:courseId/white-board'>
                    <WhiteBoard />
                </Route>
            </Switch>

            {/* <Preview path='preview' />
                <ClassTest path='classTest' />
                <Task path='task' />
                <Examination path='examination' /> */}
        </Wrap>
    )
}

export default Course
