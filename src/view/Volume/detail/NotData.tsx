import React from 'react'
import styled from '@emotion/styled'

import Xiugaijiegou from './xiugaijiegou.png'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 280px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    padding: 0 20px;
`
const Background = styled.div`
    width: 130px;
    height: 100%;
    background: url(${Xiugaijiegou}) no-repeat center;
`
const Span = styled.span`
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(22, 80, 96, 1);
`

function NotData() {
    return (
        <Container>
            <Background></Background>
            <Span>点击上方“修改试卷结构” 添加题目数量</Span>
        </Container>
    )
}

export default NotData
