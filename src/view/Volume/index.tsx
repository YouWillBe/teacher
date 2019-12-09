import React, { FC, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

const VolumeList = lazy(() => import(/* webpackChunkName: "volume-list" */ './list'))
const Template = lazy(() => import(/* webpackChunkName: "volume-template" */ './template'))
const VolumeDetail = lazy(() => import(/* webpackChunkName: "volume-detail" */ './detail'))

const Volume: FC = () => {
    return (
        <Switch>
            <Route path='/volume/template'>
                <Template />
            </Route>
            <Route path='/volume/:volumeId'>
                <VolumeDetail />
            </Route>
            <Route path='/volume'>
                <VolumeList />
            </Route>
        </Switch>
    )
}

export default Volume
