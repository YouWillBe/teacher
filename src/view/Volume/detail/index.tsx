import React, { FC, useContext, useEffect } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

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

const Detail: FC = () => {
    const { volumeId } = useParams()
    const { volumeStore } = useContext<IStore>(MobXProviderContext)

    useEffect(() => {
        volumeStore.getVolume(Number(volumeId))
        // eslint-disable-next-line
    }, [volumeId])

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
        if (volumeStore.gettingVolumeDetailList) {
            return <Loading />
        }

        return (
            <Container>
                <Wrap>
                    <BackList
                        name={volumeStore.volumeDetailList.name}
                        onChangeEdit={handleChangeEdit}
                        onClickSave={handleClickSave}
                    />
                    <Header />
                    {volumeStore.volumeProblem.id === 0 ? (
                        <>
                            <FunctTypeNot onClickOutLine={handleClickOutline} />
                            <NotData />
                        </>
                    ) : volumeStore.volumeProblem.topic ? (
                        <>
                            <FunctType isShowIcon={true} />
                            <Section />
                        </>
                    ) : (
                        <>
                            <FunctType isShowIcon={false} />
                            <NotDataAdd />
                        </>
                    )}
                </Wrap>
            </Container>
        )
    })
}

export default Detail
