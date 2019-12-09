import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Router } from '@reach/router'

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

const VolumeIndex: FC = () => {
    return (
        <RouterWrap>
            <Volume path='/' />
            <Templet path='templet' />
        </RouterWrap>
    )
}

export default VolumeIndex
