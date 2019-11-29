import React, { FC, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../../store'
import Header from './Header'
import Section from './Section'

const Container = styled.section`
    width: 100%;
    margin: 20px auto 0;
`
interface IParams {
    id: string
    testId: string
    courseId: string
    key: string
}
const EntryIndex: FC<RouteComponentProps<IParams>> = props => {
    const { courseClassTestStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        courseClassTestStore.getPreviewFinished()
        // eslint-disable-next-line
    }, [])

    return useObserver(() => {
        return (
            <Container>
                <Header />
                <Section />
            </Container>
        )
    })
}

export default EntryIndex
