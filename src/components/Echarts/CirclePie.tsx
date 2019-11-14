import React, { useEffect, FC } from 'react'
import styled from '@emotion/styled'
import Echart from 'echarts'

const Container = styled.div`
    width: 100%;
    height: 100%;
`
interface IProps {
    data: {
        id: string
        name?: {
            text: string
        }
        seriesData: object
        avgAccuracy: number
        textStyle?: {
            color: string
        }
        itemStyle?: {
            color: string[]
        }
    }
}

const CirclePie: FC<IProps> = props => {
    useEffect(() => {
        const ec = Echart as any
        let myChart = ec.init(document.getElementById(`CirclePie${props.data.id}`))
        let colorList = props.data.itemStyle
            ? props.data.itemStyle.color
            : ['#5AD8A6', '#E4EFEB', '#FFC821', '#CEA7E9', '#9EE379', '#68DCE7', '#FFEDE0']
        let dataIndex = 0

        // 指定图表的配置项和数据
        let option = {
            title: {
                text: props.data.name ? props.data.name.text : '',
                left: 'center',
                textStyle: {
                    color: props.data.textStyle ? props.data.textStyle.color : '#2C6A51',
                },
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}:  {d}%',
            },

            series: [
                {
                    name: '正确率',
                    type: 'pie',
                    radius: ['70%', '36%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold',
                            },
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: function(params: any) {
                                if (params.dataIndex === 0) {
                                    dataIndex = 0
                                } else if (params.dataIndex === 1) {
                                    dataIndex = 1
                                }
                                return colorList[dataIndex]
                            },
                        },
                    },
                    data: props.data.seriesData,
                },
            ],
        }
        myChart.setOption(option)
        // eslint-disable-next-line
    }, [props.data.id, props.data.avgAccuracy])
    return <Container id={`CirclePie${props.data.id}`}></Container>
}

export default CirclePie
