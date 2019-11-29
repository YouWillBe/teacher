import React, { useEffect, FC, useRef } from 'react'
import styled from '@emotion/styled'
import Echart from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/legend'

const Container = styled.div`
    width: 100%;
    height: 100%;
`
interface IProps {
    data: {
        yAxisData: string[]
        titleText: string
        excellent: number[]
        fine: number[]
        medium: number[]
        poor: number[]
        bad: number[]
    }
}

const BarStackedStrip: FC<IProps> = props => {
    const barstaskedRef = useRef(null)

    useEffect(() => {
        const ec = Echart as any
        let myChart = ec.init(barstaskedRef.current)
        let colorList = ['#FF8C8C', '#FFC821', '#CEA7E9', '#68DCE7', '#9EE379']

        let option = {
            title: {
                text: props.data.titleText,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                },
            },
            legend: {
                data: ['优秀 90 - 100', '良好 80 - 90', '中等 70 - 80', '及格 60 - 70', '不及格 0 - 60'],
            },

            xAxis: {
                type: 'value',
                max: 100,
            },
            yAxis: {
                type: 'category',
                data: props.data.yAxisData,
            },
            series: [
                {
                    name: '优秀 90 - 100',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                        },
                    },
                    data: props.data.excellent,
                    itemStyle: {
                        normal: {
                            color: function() {
                                return colorList[4]
                            },
                        },
                    },
                },
                {
                    name: '良好 80 - 90',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                        },
                    },
                    data: props.data.fine,
                    itemStyle: {
                        normal: {
                            color: function() {
                                return colorList[3]
                            },
                        },
                    },
                },
                {
                    name: '中等 70 - 80',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                        },
                    },
                    data: props.data.medium,
                    itemStyle: {
                        normal: {
                            color: function() {
                                return colorList[2]
                            },
                        },
                    },
                },
                {
                    name: '及格 60 - 70',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                        },
                    },
                    data: props.data.poor,
                    itemStyle: {
                        normal: {
                            color: function() {
                                return colorList[1]
                            },
                        },
                    },
                },
                {
                    name: '不及格 0 - 60',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                        },
                    },
                    data: props.data.bad,
                    itemStyle: {
                        normal: {
                            color: function() {
                                return colorList[0]
                            },
                        },
                    },
                },
            ],
        }
        myChart.setOption(option)
        // eslint-disable-next-line
    }, [])
    return <Container ref={barstaskedRef} />
}

export default BarStackedStrip
