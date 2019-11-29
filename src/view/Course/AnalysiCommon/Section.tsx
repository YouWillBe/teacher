import React, { FC } from 'react'
import styled from '@emotion/styled'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps } from '@reach/router'

const Container = styled.div`
    box-sizing: border-box;
    width: 1260px;
    margin: 0 auto;
`

const Package = styled.div`
    height: 405px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 6px;
`

const Section: FC<RouteComponentProps> = props => {
    return useObserver(() => {
        return (
            <Container>
                <Package />
            </Container>
        )
    })
}

export default Section
