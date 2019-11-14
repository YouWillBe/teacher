import React, { FC } from 'react'
import styled from '@emotion/styled'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps } from '@reach/router'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-left: 60px;
`

const TestAnalysis: FC<RouteComponentProps> = props => {
    return useObserver(() => {
        return <Container>66656</Container>
    })
}

export default TestAnalysis
