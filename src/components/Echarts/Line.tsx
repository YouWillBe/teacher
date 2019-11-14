import React, { useEffect, FC } from 'react'
import styled from '@emotion/styled'
import Echart from 'echarts'

const Container = styled.div`
    width: 100%;
    height: 100%;
`
interface IProps {
    data: { week: number; accuracy: number }[]
}

const Radar: FC<IProps> = props => {
    useEffect(() => {
        const ec = Echart as any
        let myChart = ec.init(document.getElementById('line1'))

        if (props.data.length) {
            // 指定图表的配置项和数据
            let option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: (ticket: { data: number; name: string }[], html: string) => {
                        return `第：${ticket[0].name}&nbsp;周<br />正确率：${ticket[0].data}%`
                    },
                },
                xAxis: {
                    type: 'category',
                    data: props.data.map(item => item.week),
                },
                yAxis: {
                    type: 'value',
                    max: 100,
                },
                series: [
                    {
                        data: props.data.map(item => item.accuracy),
                        type: 'line',
                        smooth: true,
                    },
                ],
            }
            myChart.setOption(option)
        }

        // eslint-disable-next-line
    }, [props.data.length])
    return <Container id='line1'></Container>
}

export default Radar
