import React, { FC, lazy, Suspense } from 'react'
import { RouteComponentProps } from '@reach/router'

const LazyVolume = lazy(() => import(/* webpackChunkName: "volume" */ './LazyVolume'))

const VolumeIndex: FC<RouteComponentProps> = () => {
    return (
        <Suspense fallback={<div>loading</div>}>
            <LazyVolume/>
        </Suspense>
    )
}

export default VolumeIndex
