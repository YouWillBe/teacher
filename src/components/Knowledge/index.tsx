import React, { FC } from 'react'
import styled from '@emotion/styled'

const Text = styled.span`
    display: inline-block;
    box-sizing: border-box;
    max-width: 110px;
    height: 36px;
    line-height: 34px;
    text-align: center;
    background-color: rgba(221, 237, 241, 1);
    border-radius: 4px;
    border: 1px solid rgba(58, 147, 223, 1);
    font-size: 12px;
    font-family: PingFangSC,sans-serif;
    font-weight: 300;
    color: rgba(58, 147, 223, 1);
    padding: 0 10px;
    margin-right: 8px;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

interface IProps {
    data: {
        id: number
        name: string
        index: number
    }
}

const Knowledge: FC<IProps> = props => {
    return <Text title={props.data.name}>{props.data.name}</Text>
}

export default Knowledge
