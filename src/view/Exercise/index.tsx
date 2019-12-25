import React, { FC } from 'react'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

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
    background-color: #f5f5f5;
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

const ExerciseIndex: FC = () => {
    return (
        <Wrap>
            <Header />
            <Nav />
            <Container>
                <Switch>
                    <Route path='/exercise/net'>
                        <NetQuestionBank />
                    </Route>
                    <Route path='/exercise/new'>
                        <NewQuestion />
                    </Route>
                    <Route path='/exercise'>
                        <MyQuestionBank />
                    </Route>
                </Switch>
            </Container>
        </Wrap>
    )
}

export default ExerciseIndex
