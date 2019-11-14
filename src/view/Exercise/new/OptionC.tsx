import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../../store'
import Editor from '../../../components/EditorX'

const AnswerItem = styled.div`
    width: 100%;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
`
const ItemIndex = styled.div`
    height: 1;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #072979;
    border-right: 1px solid #f5f5f5;
`

const RichTextWrap = styled.div`
    box-sizing: border-box;
    flex-grow: 1;
    min-height: 60px;
    padding: 8px 8px 8px 20px;
    font-size: 14px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`

interface IProps {
    data: {
        index: number
        value: any
    }
}

const OptionC: FC<IProps> = props => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)

    //答案
    const handleChange = (value: Value) => {
        exerciseStore.problemData.answer[props.data.index].value = value
    }

    return useObserver(() => {
        return (
            <AnswerItem>
                <ItemIndex>{props.data.index + 1}</ItemIndex>
                <RichTextWrap>
                    <Editor value={props.data.value} onChange={handleChange} />
                </RichTextWrap>
            </AnswerItem>
        )
    })
}
export default OptionC
