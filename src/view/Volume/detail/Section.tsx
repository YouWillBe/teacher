import React, { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import styled from '@emotion/styled'

import { IStore } from '../../../store'
import Loading from '../../../components/Loading'
import ChoiceProblem from '../problemType/ChoiceProblem'
import JudgeProblem from '../problemType/JudgeProblem'
import FillingProblem from '../problemType/FillingProblem'
import ShortAnswerProblem from '../problemType/ShortAnswerProblem'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 280px);
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    padding: 0 20px;
`

interface IProps {}

function Section(props: IProps) {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)

    return useObserver(() => {
        if (!volumeStore.volumeProblemReady) {
            return (
                <Container>
                    <Loading></Loading>
                </Container>
            )
        }

        return (
            <Container>
                {volumeStore.volumeProblem.type === 1 || volumeStore.volumeProblem.type === 2 ? (
                    <ChoiceProblem></ChoiceProblem>
                ) : null}
                {volumeStore.volumeProblem.type === 3 ? <JudgeProblem></JudgeProblem> : null}
                {volumeStore.volumeProblem.type === 4 ? <FillingProblem></FillingProblem> : null}
                {volumeStore.volumeProblem.type === 5 ? <ShortAnswerProblem></ShortAnswerProblem> : null}
            </Container>
        )
    })
}

export default Section
