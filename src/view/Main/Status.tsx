import React, { FC } from 'react'
import styled from '@emotion/styled'

import ComingCourse from './ComingCourse'
import ProcessingCourse from './ProcessingCourse'

const Container = styled.div`
    width: 250px;
    height: 800px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const Status: FC = () => {
    return (
        <Container>
            <ComingCourse />
            <ProcessingCourse />
        </Container>
    )
}

export default Status
