import React, { FC, lazy, Suspense } from 'react'
import { RouteComponentProps } from '@reach/router'

interface IParams {
    courseId: string
}

const LazyCourse = lazy(() => import(/* webpackChunkName: "course" */ './LazyCourse'))

const Course: FC<RouteComponentProps<IParams>> = props => {
    return (
        <Suspense fallback={<div>loading</div>}>
            <LazyCourse courseId={props.courseId as string}/>
        </Suspense>
    )
}

export default Course
