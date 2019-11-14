import React, { FC } from 'react'
import styled from '@emotion/styled'

import noEntry from './noEntry.png'

const NoDataWrap = styled.div`
    width: 100%;
    height: 176px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`
const NoBackgroundWrap = styled.div`
    flex-grow: 1;
    text-align: right;
    text-align: -webkit-right;
    margin-right: 100px;
`
const NoBackground = styled.div`
    width: 100px;
    height: 100px;
    background-image: url(${noEntry});
`

const Text = styled.div`
    width: 300px;
    font-size: 24px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
`

const NoEntry: FC = props => {
    return (
        <NoDataWrap>
            <NoBackgroundWrap>
                <NoBackground></NoBackground>
            </NoBackgroundWrap>
            <Text>等待学生录入</Text>
        </NoDataWrap>
    )
}

export default NoEntry
