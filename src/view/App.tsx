import React, { FC, Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'

const Main = lazy(() => import(/* webpackChunkName: "main-page" */ './Main'))
const Plan = lazy(() => import(/* webpackChunkName: "plan" */ './Plan'))
const Volume = lazy(() => import(/* webpackChunkName: "volume" */ './Volume'))
const Exercise = lazy(() => import(/* webpackChunkName: "exercise" */ './Exercise'))
const Analysis = lazy(() => import(/* webpackChunkName: "analysis" */ './Analysis'))
const Knowledge = lazy(() => import(/* webpackChunkName: "knowledge" */ './Knowledge'))
const Course = lazy(() => import(/* webpackChunkName: "course" */ './Course'))

const App: FC = () => {
    return (
        <Suspense fallback={<div>loading</div>}>
            <Switch>
                <Route path='/plan'>
                    <Plan />
                </Route>
                {/* todo 处理试卷部分的路由*/}
                <Route path='/volume'>
                    <Volume />
                </Route>
                {/* todo 处理题库部分的路由*/}
                <Route path='/exercise'>
                    <Exercise />
                </Route>
                {/* todo 处理学情分析部分的路由*/}
                <Route path='/analysis'>
                    <Analysis />
                </Route>
                <Route path='/knowledge'>
                    <Knowledge />
                </Route>
                {/* todo 处理课程部分的路由*/}
                <Route path='/course'>
                    <Course />
                </Route>
                <Route path='/'>
                    <Main />
                </Route>
            </Switch>
        </Suspense>
    )
}

export default App
