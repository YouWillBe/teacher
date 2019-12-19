import React, { useEffect, FC, useRef } from 'react'
import styled from 'styled-components'
import Echart from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'

const Container = styled.div`
    width: 100%;
    height: 100%;
`
interface IProps {
    data: { week: number; accuracy: number }[]
}

const Radar: FC<IProps> = props => {
    const lineRef = useRef(null)

    useEffect(() => {
        const ec = Echart as any
        let myChart = ec.init(lineRef.current)

        // 指定图表的配置项和数据
        let option = {
            tooltip: {
                trigger: 'axis',
                formatter: (ticket: { data: number; name: string }[]) => {
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
                    data: props.data.map(item => item.accuracy.toFixed(2)),
                    type: 'line',
                    smooth: true,
                },
            ],
        }
        myChart.setOption(option)

        // eslint-disable-next-line
    }, [])
    return <Container ref={lineRef} />
}

export default Radar
