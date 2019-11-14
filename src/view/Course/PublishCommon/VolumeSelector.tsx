import React, { FC, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import VolumeCard from './VolumeCard'

import { IStore } from '../../../store'

interface IProps {
    handleClick(id: number): void
}

const Container = styled.div<{ scroll: boolean }>`
    padding: 18px;
    border: 1px solid #eee;
    max-width: 80%;
    overflow-x: ${props => (props.scroll ? 'scroll' : 'auto')};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`

const VolumeSelector: FC<IProps> = props => {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        volumeStore.getVolumeList(1)
        // eslint-disable-next-line
    }, [])
    return useObserver(() => (
        <Container scroll={volumeStore.volumeList.length >= 5}>
            {volumeStore.volumeList.map(v => (
                <VolumeCard key={v.id} id={v.id} title={v.name} loreList={v.loreList} handleClick={props.handleClick} />
            ))}
        </Container>
    ))
}

export default VolumeSelector
