import React, { useEffect, FC } from 'react'
import styled from '@emotion/styled'
import Echart from 'echarts'

const Container = styled.div<{ setHeight: string | undefined }>`
    width: 100%;
    min-height: 200px;
`
interface IProps {
    data: {
        nameData: string[]
        titleText: string
        xAxisData: number[]
        metaDate: number[]
    }
}

const MultiLine: FC<IProps> = props => {
    useEffect(() => {
        const ec = Echart as any
        let myChart = ec.init(document.getElementById(`MultiLine`))

        let xAxisData = props.data.xAxisData[0] || [
            '第一周',
            '第二周',
            '第三周',
            '第四周',
            '第五周',
            '第六周',
            '第七周',
            '第八周',
        ]
        let legendData = props.data.nameData
        let serieData = []

        for (let v = 0; v < props.data.nameData.length; v++) {
            let serie = {
                name: props.data.nameData[v],
                type: 'line',
                smooth: true, //是否平滑曲线显示
                symbol: 'circle',
                symbolSize: 10,
                data: props.data.metaDate[v],
            }
            serieData.push(serie)
        }
        let colors = ['#036BC8', '#4A95FF', '#5EBEFC', '#2EF7F3', '#FFFFFF']
        let option = {
            title: {
                text: props.data.titleText,
                textAlign: 'left',
                textStyle: { fontSize: '16', fontWeight: 'normal' },
            },
            legend: {
                show: true,
                left: 'right',
                data: legendData,
                y: '5%',
                itemWidth: 18,
                itemHeight: 12,
                textStyle: { fontSize: 14 },
            },
            color: colors,
            grid: { left: '2%', top: '12%', bottom: '5%', right: '5%', containLabel: true },
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            xAxis: [
                {
                    type: 'category',
                    axisLine: { show: true, lineStyle: { color: '#6173A3' } },
                    axisLabel: { interval: 0, textStyle: { color: '#9ea7c4', fontSize: 14 } },
                    axisTick: { show: false },
                    data: xAxisData,
                },
            ],
            yAxis: [
                {
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: { textStyle: { color: '#9ea7c4', fontSize: 14 } },
                    axisLine: { show: true, lineStyle: { color: '#6173A3' } },
                },
            ],
            series: serieData,
        }
        myChart.setOption(option)
        // eslint-disable-next-line
    }, [props.data.nameData, props.data.xAxisData])
    return <Container id={`MultiLine`} setHeight={'200px'} />
}

export default MultiLine
