import React, { FC, useContext, useEffect } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps } from '@reach/router'
import styled from '@emotion/styled'

import { IStore } from '../../../store'
import BackList from './BackList'
import Header from './Header'
import FunctType from './FunctType'
import FunctTypeNot from './FunctTypeNot'
import Section from './Section'
import NotData from './NotData'
import NotDataAdd from './NotDataAdd'
import Loading from '../../../components/Loading'

const Container = styled.div`
    box-sizing: border-box;
    width: 1260px;
    height: 100%;
    margin: 0 auto;
`
const Wrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px 0;
`

interface IProps {
    id: string
}

const Detail: FC<RouteComponentProps<IProps>> = props => {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)

    useEffect(() => {
        volumeStore.getVolume(Number(props.id))
        // eslint-disable-next-line
    }, [props.id])

    //修改标题
    const handleChangeEdit = (value: string) => {
        volumeStore.volumeDetailList.name = value
    }

    //试卷标题保存
    const handleClickSave = () => {
        volumeStore.updateVolumeName({
            id: volumeStore.volumeDetailList.id,
            name: volumeStore.volumeDetailList.name,
        })
    }

    //修改试卷结构
    const handleClickOutline = () => {
        volumeStore.getVolumeOutline(volumeStore.volumeDetailList.id)
    }

    return useObserver(() => {
        if (!volumeStore.volumeDetailListReady) {
            return <Loading></Loading>
        }

        return (
            <Container>
                <Wrap>
                    <BackList
                        name={volumeStore.volumeDetailList.name}
                        onChangeEdit={handleChangeEdit}
                        onClickSave={handleClickSave}
                    ></BackList>
                    <Header></Header>
                    {volumeStore.volumeProblem.id === 0 ? (
                        <>
                            <FunctTypeNot onClickOutLine={handleClickOutline}></FunctTypeNot>
                            <NotData></NotData>
                        </>
                    ) : volumeStore.volumeProblem.topic ? (
                        <>
                            <FunctType isShowIcon={true}></FunctType>
                            <Section></Section>
                        </>
                    ) : (
                        <>
                            <FunctType isShowIcon={false}></FunctType>
                            <NotDataAdd></NotDataAdd>
                        </>
                    )}
                </Wrap>
            </Container>
        )
    })
}

export default Detail
