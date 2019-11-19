import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { Link } from '@reach/router'
import { RouteComponentProps } from '@reach/router'

const Container = styled.div`
    height: 100%;
    display: flex;
`
const Line = styled.span<{ isActive: boolean }>`
    height: 8px;
    width: 90px;
    border-radius: 8px;
    position: absolute;
    bottom: 6px;
    transition: background-color 0.1s linear;
    background-color: ${props => (props.isActive ? '#00a6f3' : '#fff')};
`
const Text = styled.div<{ isActive: boolean }>`
    font-size: 22px;
    font-family: PingFangSC, sans-serif;
    font-weight: 400;
    transition: color 0.1s linear;
    color: ${props => (props.isActive ? '#00a6f3' : '#3a4760')};
`
const Item = styled(Link)`
    width: 90px;
    height: 80px;
    cursor: pointer;
    margin-left: 25px;
    margin-right: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

const Nav: FC<RouteComponentProps> = () => {
    const [current, setCurrent] = useState(1)

    const checkActive = (text: string, index: number) => {
        let pathname = window.location.pathname.split('/')
        if (text === pathname[1]) {
            setCurrent(index)
        }
        return {}
    }

    return (
        <Container>
            <Item to='/' getProps={() => checkActive('', 1)}>
                <Text isActive={current === 1}>首页</Text>
                <Line isActive={current === 1} />
            </Item>
            <Item to='plan' getProps={() => checkActive('plan', 2)}>
                <Text isActive={current === 2}>教案</Text>
                <Line isActive={current === 2} />
            </Item>
            <Item to='volume' getProps={() => checkActive('volume', 3)}>
                <Text isActive={current === 3}>试卷</Text>
                <Line isActive={current === 3} />
            </Item>
            <Item to='exercise' getProps={() => checkActive('exercise', 4)}>
                <Text isActive={current === 4}>题库</Text>
                <Line isActive={current === 4} />
            </Item>
            <Item to='analysis' getProps={() => checkActive('analysis', 5)}>
                <Text isActive={current === 5}>学情分析</Text>
                <Line isActive={current === 5} />
            </Item>
            <Item to='analysis/knowledge' getProps={() => checkActive('/analysis/knowledge', 6)}>
                <Text isActive={current === 6}>知识结构</Text>
                <Line isActive={current === 6} />
            </Item>
        </Container>
    )
}

export default Nav
