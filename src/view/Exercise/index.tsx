import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory, useParams, useLocation, NavLink, Switch, Route } from 'react-router-dom'

import Nav from './Nav'
import Header from '../../components/Header'

import MyQuestionBank from './MyQuestionBank'
import NetQuestionBank from './NetQuestionBank'
import NewQuestion from './NewQuestion'

const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding-top: 80px;
    padding-bottom: 20px;
    position: relative;
`

const Container = styled.div`
    box-sizing: border-box;
    width: 1260px;
    height: calc(100% - 69px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

const ExerciseIndex: FC = props => {
    // const [exerciseArr] = useState([
    //     {
    //         id: 1,
    //         name: '我的题库',
    //         url: '/exercise',
    //     },
    //     {
    //         id: 2,
    //         name: '网络题库',
    //         url: '/exercise/NetQuestionBank',
    //     },
    //     {
    //         id: 3,
    //         name: '添加题目',
    //         url: '/exercise/new',
    //     },
    // ])
    // const [pathName, setPathName] = useState('/exercise')
    //
    // useEffect(() => {
    //     if (props.location) {
    //         let value = props.location.pathname.split('/')
    //         if (Number(value[2])) {
    //             setPathName('/' + value[1])
    //         } else {
    //             setPathName(props.location.pathname)
    //         }
    //     }
    //     // eslint-disable-next-line
    // }, [props.location!.pathname])
    //
    // //跳转路由
    // const handleClickLink = (data: any) => {
    //     navigate(data.url, {
    //         state: {
    //             myExercise: true,
    //         },
    //     })
    // }
    return (
        <Wrap>
            <Header />
            <Nav />
            <Container>
                <Switch>
                    <Route path='/exercise/net'>
                        <NetQuestionBank />
                    </Route>
                    <Route path='/exercise'>
                        <MyQuestionBank />
                    </Route>
                </Switch>
            </Container>
            {/*<Container myHeight={props.location!.pathname === '/exercise/new'}>*/}
            {/*    <RouterWrap>*/}
            {/*        <Exercise path='/' />*/}
            {/*        <NetExercise path='NetQuestionBank' />*/}
            {/*        <NewExercise path='new' />*/}
            {/*        <NewExercise path=':id' />*/}
            {/*    </RouterWrap>*/}
            {/*</Container>*/}
        </Wrap>
    )
}

export default ExerciseIndex
