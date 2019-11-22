import React, { FC, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Router, RouteComponentProps, navigate } from '@reach/router'

import Exercise from './list'
import NetExercise from './net'
import NewExercise from './new'

const RouteWrap = styled.div`
    width: 100%;
    height: 50px;
    padding-top: 20px;
`

const Container = styled.div<{ myheight: boolean }>`
    box-sizing: border-box;
    width: 1260px;
    height: ${props => (props.myheight ? 'calc(100% - 140px)' : 'calc(100% - 70px)')};
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`
const RouterWrap = styled(Router)`
    box-sizing: border-box;
    width: 1260px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`
const Item = styled.div<{ isActive: boolean }>`
    box-sizing: border-box;
    width: 110px;
    height: 100%;
    position: relative;
    top: ${props => (props.isActive ? '1px' : '1px')};
    background-color: ${props => (props.isActive ? '#fff' : '')};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${props => (props.isActive ? '1px solid #e9e9e9' : '')};
    border-bottom: none;

    span {
        color: ${props => (props.isActive ? '#00a6f3' : 'rgba(51,51,51,1)')};
    }
`
const MyItemWrap = styled.div`
    width: 1260px;
    height: 49px;
    margin: 0 auto;
    display: flex;
    border-bottom: 1px solid #e9e9e9;
    ${Item}:first-of-type {
        margin-left: 10px;
    }
`

const Text = styled.span`
    font-size: 18px;
    font-family: PingFangSC, sans-serif;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    transition: color 0.1s linear;
`

const ExerciseIndex: FC<RouteComponentProps> = props => {
    const [exerciseArr] = useState([
        {
            id: 1,
            name: '我的题库',
            url: '/exercise',
        },
        {
            id: 2,
            name: '网络题库',
            url: '/exercise/net',
        },
        {
            id: 3,
            name: '添加题目',
            url: '/exercise/new',
        },
    ])
    const [pathName, setPathName] = useState('/exercise')

    useEffect(() => {
        if (props.location) {
            let value = props.location.pathname.split('/')
            if (Number(value[2])) {
                setPathName('/' + value[1])
            } else {
                setPathName(props.location.pathname)
            }
        }
        // eslint-disable-next-line
    }, [props.location!.pathname])

    //跳转路由
    const handleClickLink = (data: any) => {
        navigate(data.url, {
            state: {
                myExercise: true,
            },
        })
    }
    return (
        <>
            <RouteWrap>
                <MyItemWrap>
                    {exerciseArr.map(item => (
                        <Item key={item.id} onClick={() => handleClickLink(item)} isActive={item.url === pathName}>
                            <Text>{item.name}</Text>
                        </Item>
                    ))}
                </MyItemWrap>
            </RouteWrap>
            <Container myheight={props.location!.pathname === '/exercise/new'}>
                <RouterWrap>
                    <Exercise path='/' />
                    <NetExercise path='net' />
                    <NewExercise path='new' />
                    <NewExercise path=':id' />
                </RouterWrap>
            </Container>
        </>
    )
}

export default ExerciseIndex
