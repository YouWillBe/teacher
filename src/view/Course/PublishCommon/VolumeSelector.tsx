import React, { FC, useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Link } from '@reach/router'

import VolumeCard from './VolumeCard'

import { IStore } from '../../../store'

interface IProps {
    handleClick(id: number): void
}

const Container = styled.div`
    padding: 18px;
    border: 1px solid #eee;
    max-width: 80%;
    overflow-x: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`
const AddLine = styled(Link)`
    color: #666;
    margin-bottom: 20px;
    :hover {
        color: #00a6f3;
    }
`

const VolumeSelector: FC<IProps> = props => {
    const { courseClassTestStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        courseClassTestStore.getVolumeLore()
        // eslint-disable-next-line
    }, [])
    return useObserver(() => (
        <>
            {courseClassTestStore.volumeLore.length > 0 ? (
                <Container>
                    {courseClassTestStore.volumeLore.slice(0, 4).map(v => (
                        <VolumeCard
                            key={v.id}
                            id={v.id}
                            title={v.name}
                            loreList={v.loreList}
                            handleClick={props.handleClick}
                        />
                    ))}
                </Container>
            ) : (
                <AddLine to='/volume'>去试卷新增</AddLine>
            )}
        </>
    ))
}

export default VolumeSelector
