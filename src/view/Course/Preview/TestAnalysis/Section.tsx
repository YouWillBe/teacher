import React, { FC } from 'react'
import styled from '@emotion/styled'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps } from '@reach/router'

const Container = styled.div`
    box-sizing: border-box;
    width: 1260px;
    margin: 0 auto;
`

const Section: FC<RouteComponentProps> = props => {
    return useObserver(() => {
        return <Container>Section1234</Container>
    })
}

export default Section
