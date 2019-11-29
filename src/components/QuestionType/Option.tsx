import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Value } from 'slate'

import Editor from '../EditorX'

const OptionItem = styled.div`
    box-sizing: border-box;
    min-height: 60px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(42, 71, 139, 0.2);
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    border-radius: 4px;
`
const ItemCommon = styled.div`
    height: 1;
    width: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(7, 41, 121, 1);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    border-right: 1px solid #f5f5f5;
`
const ItemIndex = styled(ItemCommon)`
    font-size: 18px;
    background-color: rgba(245, 245, 245, 1);
`

const RichTextWrap = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 8px 8px 20px;
    font-size: 14px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`

interface IProps {
    data: {
        value: Value
        index: number | string
    }
}
const Option: FC<IProps> = props => {
    return (
        <OptionItem>
            <ItemIndex>{props.data.index}</ItemIndex>
            <RichTextWrap>
                <Editor value={Value.fromJSON(props.data.value)} readonly></Editor>
            </RichTextWrap>
        </OptionItem>
    )
}

export default Option
