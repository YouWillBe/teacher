import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../../store'
import Editor from '../../../components/EditorX'

const MyTopicTEditor = styled.div`
    min-height: 60px;
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    padding-left: 22px;
    flex-grow: 1;
`

interface Iprops {
    data: {
        value: Value
        index: number
    }
}

const OptionListA: FC<Iprops> = props => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)

    const handleChangeOption = (value: Value) => {
        exerciseStore.problemData.option[props.data.index].value = value
    }

    return useObserver(() => {
        return (
            <MyTopicTEditor>
                <Editor value={Value.fromJSON(props.data.value)} onChange={handleChangeOption}></Editor>
            </MyTopicTEditor>
        )
    })
}
export default OptionListA
