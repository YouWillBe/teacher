import React, { useEffect, FC } from 'react'
import styled from '@emotion/styled'
import Echart from 'echarts'

const Container = styled.div<{ setHeight: string | undefined }>`
    width: 100%;
    min-height: 200px;
`
interface IProps {
    data: {
        yAxisData: string[]
        seriesData: number[]
        titleText: string
    }
}

const BarClass: FC<IProps> = props => {
    useEffect(() => {
        const ec = Echart as any
        let myChart = ec.init(document.getElementById(`BarClass`))
        let colorList = ['#FF8C8C', '#FFC821', '#CEA7E9', '#68DCE7', '#9EE379']
        let dataIndex = 0
        let option = {
            title: {
                text: props.data.titleText,
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c}人',
            },

            xAxis: [
                {
                    max: 100,
                    type: 'value',
                },
            ],
            yAxis: [
                {
                    data: props.data.yAxisData,
                    type: 'category',
                },
            ],

            series: [
                {
                    name: '人数统计',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                        },
                    },
                    data: props.data.seriesData,
                    itemStyle: {
                        normal: {
                            color: function(params: any) {
                                if (params.data >= 90) {
                                    dataIndex = 4
                                } else if (params.data >= 80) {
                                    dataIndex = 3
                                } else if (params.data >= 70) {
                                    dataIndex = 2
                                } else if (params.data >= 60) {
                                    dataIndex = 1
                                } else {
                                    dataIndex = 0
                                }
                                return colorList[dataIndex]
                            },
                        },
                    },
                },
            ],
        }
        myChart.setOption(option)
        // eslint-disable-next-line
    }, [props.data.seriesData, props.data.yAxisData])
    return <Container id={`BarClass`} setHeight={'200px'} />
}

export default BarClass
