import React, { useEffect, FC, useRef } from 'react'
import styled from '@emotion/styled'
import Echart from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/legend'

const Container = styled.div`
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
    const barclassRef = useRef(null)
    useEffect(() => {
        const ec = Echart as any
        let myChart = ec.init(barclassRef.current)
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
                            color: function(params: { data: number }) {
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
    }, [])
    return <Container ref={barclassRef} />
}

export default BarClass
