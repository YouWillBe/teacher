import React, { FC, useContext, useEffect } from 'react'
import { RouteComponentProps, Link } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { FaPlus } from 'react-icons/fa'

import { IStore } from '../../../store'
import Loading from '../../../components/Loading'
import Paging from '../../../components/Paging'
import VolumeCard from './VolumeCard'
import image from '../../../images/blank.png'

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
const BlankWrap = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const BlankImg = styled.div`
    height: 400px;
    width: 400px;
    background-image: url(${image});
    background-size: 100% 100%;
`
const BlankText = styled.div`
    color: #777;
    user-select: none;
`
const BlankButton = styled(Link)`
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 8px 20px;
    margin-top: 50px;
    margin-bottom: 100px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 13px 1px;
    border-radius: 5px;
    color: #777;
    user-select: none;
    transition: color 0.1s linear, box-shadow 0.1s linear;
    &:hover {
        color: #00a6f3;
        box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    }
`
const ButtonTag = styled.div`
    font-size: 18px;
`
const ButtonText = styled.div`
    font-size: 14px;
    margin-left: 20px;
    height: 100%;
    line-height: 24px;
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

const Volume: FC<RouteComponentProps> = () => {
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

    return useObserver(() => {
        if (volumeStore.gettingVolumeList) {
            return <Loading />
        }
        if (volumeStore.volumeList.length === 0) {
            return (
                <BlankWrap>
                    <BlankImg />
                    <BlankText>还没有试卷，添加一个吧</BlankText>
                    <BlankButton to='/volume/templet'>
                        <ButtonTag>
                            <FaPlus></FaPlus>
                        </ButtonTag>
                        <ButtonText>添加试卷</ButtonText>
                    </BlankButton>
                </BlankWrap>
            )
        }
        return (
            <Wrap>
                <NewButtonWrap>
                    <NewButton to='/volume/templet'>添加试卷</NewButton>
                </NewButtonWrap>
                <Line></Line>
                <Container>
                    {volumeStore.volumeList.map((v, i) => (
                        <VolumeCard data={v} key={i} deleteVolume={handleClickDeleteVolume} />
                    ))}
                </Container>
                {volumeStore.volumePage.total > 8 && (
                    <PagingWrap>
                        <Paging
                            onChange={handleChangePaging}
                            current={volumeStore.volumePage.page}
                            total={Math.ceil(volumeStore.volumePage.total / volumeStore.volumePage.limit)}
                        ></Paging>
                    </PagingWrap>
                )}
            </Wrap>
        )
    })
}

export default Volume
