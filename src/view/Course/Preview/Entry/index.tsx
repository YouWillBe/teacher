/*
    老师已公布答案
*/
import React, { FC, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../../store'
import Header from './Header'
import Section from './Section'

const Container = styled.section`
    width: 100%;
    margin: 20px auto 0;
`
const EntryIndex: FC = props => {
    const { coursePreviewStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        coursePreviewStore.getPreviewFinished()
        // eslint-disable-next-line
    }, [])

    return useObserver(() => {
        return (
            <Container>
                <Header></Header>
                <Section></Section>
            </Container>
        )
    })
}

export default EntryIndex
