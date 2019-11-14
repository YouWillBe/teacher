import React, { FC } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import VolumeLore from './VolumeLore'

interface IProps {
    courseId: string
}

const VolumeWrap = styled.div`
    width: 280px;
    height: 100%;
    margin-left: 20px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 4px 0px rgba(51, 176, 243, 0.2);
    border-radius: 10px;
`
const VolumeUl = styled.ul`
    width: 280px;
`

const RecentText = styled.div`
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(3, 118, 215, 1);
`

const Right: FC<RouteComponentProps<IProps>> = props => {
    return (
        <VolumeWrap>
            <RecentText>选择最近编辑过的试卷</RecentText>
            <VolumeUl>
                <VolumeLore />
            </VolumeUl>
        </VolumeWrap>
    )
}

export default Right
