import React, { FC, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../../store'
import SeeHeaderA from '../../DetailCommon/SeeHeaderA'
import SeeCenter from '../../DetailCommon/SeeCenter'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar-button {
        background-color: #fff;
    }
    &::-webkit-scrollbar {
        background-color: #fff;
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(66, 88, 99, 0.4);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #ddd;
    }
`
const Container1 = styled.div`
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding-right: 5px;
`
const Wrap = styled.div`
    box-sizing: border-box;
    width: 1260px;
    margin: 0 auto;
`
interface IParams {
    id: string
    studentTestId: string
    courseId: string
    key: string
}
const SeeDetail: FC<RouteComponentProps<IParams>> = props => {
    const { courseIndexStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        if (props.location && props.studentTestId) {
            courseIndexStore.getTestProblemEntering(Number(props.studentTestId))
        }

        // eslint-disable-next-line
    }, [props.id])

    return useObserver(() => {
        return (
            <Container1>
                <Container>
                    <Wrap>
                        <SeeHeaderA
                            data={{
                                name: '随堂测',
                                urlName: 'classTest',
                                seeName: `course/${props.courseId}/classTest/${props.studentTestId}`,
                            }}
                        ></SeeHeaderA>
                        <SeeCenter />
                    </Wrap>
                </Container>
            </Container1>
        )
    })
}

export default SeeDetail
