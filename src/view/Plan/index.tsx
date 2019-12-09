import React, { FC, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

const PlanList = lazy(() => import(/* webpackChunkName: "plan-list" */ './PlanList'))
const NewPlan = lazy(() => import(/* webpackChunkName: "new-plan" */ './NewPlan'))
const PlanDetail = lazy(() => import(/* webpackChunkName: "plan-detail" */ './PlanEditor'))

const Plan: FC = () => {
    return (
        <Switch>
            <Route path='/plan/new'>
                <NewPlan />
            </Route>
            <Route path='/plan/:planId'>
                <PlanDetail />
            </Route>
            <Route path='/plan'>
                <PlanList />
            </Route>
        </Switch>
    )
}

export default Plan
