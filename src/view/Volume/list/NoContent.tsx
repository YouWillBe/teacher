import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

const Wrap = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Img = styled.div`
    height: 400px;
    width: 400px;
    background-image: url(https://img2.heartdynamic.cn/static/blank.png);
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
    box-shadow: rgba(0, 0, 0, 0.12) 0 3px 13px 1px;
    border-radius: 5px;
    color: #777;
    user-select: none;
    transition: color 0.1s linear, box-shadow 0.1s linear;
    &:hover {
        color: #00a6f3;
        box-shadow: rgba(16, 36, 94, 0.4) 0 2px 6px 0;
    }
`
const ButtonTag = styled.div`
    font-size: 18px;
    display: flex;
    align-items: center;
`
const ButtonText = styled.div`
    font-size: 14px;
    margin-left: 20px;
    height: 100%;
    line-height: 24px;
`

const NoContent: FC = () => (
    <Wrap>
        <Img />
        <BlankText>还没有试卷，添加一个吧</BlankText>
        <BlankButton to='/volume/template'>
            <ButtonTag>
                <FaPlus />
            </ButtonTag>
            <ButtonText>添加试卷</ButtonText>
        </BlankButton>
    </Wrap>
)

export default NoContent
