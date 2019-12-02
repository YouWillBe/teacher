//网络题库
import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Link, RouteComponentProps } from '@reach/router'
import { FaPlus } from 'react-icons/fa'

import image from '../../../images/blank.png'

const BlankWrap = styled.div`
    height: 100%;
    height: calc(100% - 80px);
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
const NoData: FC<RouteComponentProps> = () => {
    return (
        <BlankWrap>
            <BlankImg />
            <BlankText>还没有题目，请先添加</BlankText>
            <BlankButton to='/exercise/new' state={{ fromNewsFeed: sessionStorage.getItem('currentType') }}>
                <ButtonTag>
                    <FaPlus></FaPlus>
                </ButtonTag>
                <ButtonText>添加题目</ButtonText>
            </BlankButton>
        </BlankWrap>
    )
}

export default NoData
