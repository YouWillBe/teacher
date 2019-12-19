import React, { FC, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import styled from 'styled-components'

import { IStore } from '../../../store'
import Loading from '../../../components/Loading'
import Paging from '../../../components/Paging'
import VolumeCard from './VolumeCard'
import NoContent from './NoContent'
import Header from '../../../components/Header'

const ListWrap = styled.div`
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding-top: 80px;
    position: relative;
`

const Container = styled.div`
    width: 1000px;
    margin: 0 auto;
    height: 500px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
`
const Wrap = styled.div`
    margin: 0 auto;
    width: 1000px;
    height: 100%;
    padding-top: 30px;
    padding-bottom: 30px;
    box-sizing: border-box;
`
const NewButtonWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
const NewButton = styled(Link)`
    border: 1px solid #999;
    color: #777;
    margin-right: 5px;
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.1s linear;
    &:hover {
        color: #00a6f3;
        border-color: #00a6f3;
    }
`
const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: #ddd;
    margin-top: 10px;
`
const PagingWrap = styled.div`
    margin-top: 20px;
`

const Volume: FC = () => {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        volumeStore.getVolumeList(1)
        // eslint-disable-next-line
    }, [])

    //分页
    const handleChangePaging = (value: number) => {
        volumeStore.volumePage.page = value
        volumeStore.getVolumeList(value)
    }

    const handleClickDeleteVolume = (id: number) => {
        volumeStore.deleteVolume(id)
    }

    return useObserver(() => (
        <ListWrap>
            <Header />
            {!volumeStore.volumeListReady ? (
                <Loading />
            ) : volumeStore.volumeList.length === 0 ? (
                <NoContent />
            ) : (
                <Wrap>
                    <NewButtonWrap>
                        <NewButton to='/volume/template'>添加试卷</NewButton>
                    </NewButtonWrap>
                    <Line />
                    <Container>
                        {volumeStore.volumeList.map(v => (
                            <VolumeCard data={v} key={v.id} deleteVolume={handleClickDeleteVolume} />
                        ))}
                    </Container>
                    {volumeStore.volumePage.total > 8 && (
                        <PagingWrap>
                            <Paging
                                onChange={handleChangePaging}
                                current={volumeStore.volumePage.page}
                                total={Math.ceil(volumeStore.volumePage.total / volumeStore.volumePage.limit)}
                            />
                        </PagingWrap>
                    )}
                </Wrap>
            )}
        </ListWrap>
    ))
}

export default Volume
