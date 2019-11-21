import React, { FC } from 'react'
import styled from '@emotion/styled'

import CirclePie from '../../../components/Echarts/CirclePie'

const Container = styled.div`
    width: 100%;
`
const Header = styled.div`
    display: flex;
    align-items: center;
`
const TextWrap = styled.div``
const Text = styled.div`
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
`

const CirclePieWrap = styled.div`
    width: 100%;
    height: 260px;
`

interface IProps {
    data: {
        avgAccuracy: number
        name?: string
    }
    text: string
}

const Pie: FC<IProps> = props => {
    return (
        <Container>
            <Header>
                <TextWrap>
                    <Text>{props.text} </Text>
                </TextWrap>
            </Header>
            <CirclePieWrap>
                <CirclePie
                    data={{
                        seriesData: [
                            { value: props.data.avgAccuracy, name: '正确' },
                            {
                                value: 100 - props.data.avgAccuracy,
                                name: '错误',
                            },
                        ],
                    }}
                ></CirclePie>
            </CirclePieWrap>
        </Container>
    )
}

export default Pie
