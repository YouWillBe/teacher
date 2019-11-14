import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Router, RouteComponentProps } from '@reach/router'

import Volume from './list'
import Templet from './templet'

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

const VolumeIndex: FC<RouteComponentProps> = props => {
    return (
        <RouterWrap>
            <Volume path='/'></Volume>
            <Templet path='templet'></Templet>
        </RouterWrap>
    )
}

export default VolumeIndex
