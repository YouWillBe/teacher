import React, { FC } from 'react'
import styled from '@emotion/styled'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps } from '@reach/router'

// import Header from '../../AnalysiCommon/Header'
import Section from './Section'

const Container = styled.div`
    box-sizing: border-box;
    width: 1260px;
    margin: 0 auto;
`

const TestAnalysis: FC<RouteComponentProps> = props => {
    return useObserver(() => {
        return (
            <Container>
                {/* <Header></Header> */}
                <Section></Section>
            </Container>
        )
    })
}

export default TestAnalysis
