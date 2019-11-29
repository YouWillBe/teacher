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
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
`

const CirclePieWrap = styled.div`
    width: 100%;
    height: 160px;
`

interface IProps {
    data: {
        avgAccuracy: number
        name: string
    }
    text: string
}

const Pie: FC<IProps> = props => {
    return (
        <Container>
            <Header>
                <TextWrap>
                    <Text>{props.text} </Text>
                    <Text> 知识点</Text>
                </TextWrap>
            </Header>
            <CirclePieWrap>
                <CirclePie
                    data={{
                        name: { text: props.data.name },
                        seriesData: [
                            { value: props.data.avgAccuracy, name: '正确' },
                            {
                                value: 100 - props.data.avgAccuracy,
                                name: '错误',
                            },
                        ],
                        textStyle: {
                            color: props.text === '正确率最高的' ? '#5AD8A6' : '#E23712',
                        },
                        itemStyle: {
                            color: props.text === '正确率最高的' ? ['#5AD8A6', '#E4EFEB'] : ['#FF8166', '#FFEADB'],
                        },
                    }}
                />
            </CirclePieWrap>
        </Container>
    )
}

export default Pie
