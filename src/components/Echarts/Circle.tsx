import React, { useEffect, FC } from 'react'
import styled from '@emotion/styled'
import Echart from 'echarts'

const Container = styled.div`
    width: 100%;
    height: 100%;
`
interface IProps {
    data: {
        accuracy: number
        type: string
        circleId: string
    }
}

const Circle: FC<IProps> = props => {
    useEffect(() => {
        const ec = Echart as any
        let myChart = ec.init(document.getElementById(props.data.circleId))
        let colorList = ['#E4E4E4', '#FF8C8C', '#FFC821', '#CEA7E9', '#9EE379', '#68DCE7', '#FFEDE0']
        let dataIndex = 0

        // 指定图表的配置项和数据
        let option = {
            title: {
                subtext: props.data.type,
                text: props.data.accuracy || 0 + '%',
                x: 'center',
                y: 'center',
                top: '60px',
                subtextStyle: {
                    color: '#666',
                    fontSize: 16,
                },
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {d}%',
            },
            series: [
                {
                    name: props.data.type,
                    type: 'pie',
                    radius: ['50%', '80%'],
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: function(params: any) {
                                if (params.name === '正确率') {
                                    if (params.data.value === 100) {
                                        dataIndex = 5
                                    } else if (params.data.value >= 80) {
                                        dataIndex = 4
                                    } else if (params.data.value >= 60) {
                                        dataIndex = 3
                                    } else if (params.data.value >= 40) {
                                        dataIndex = 2
                                    } else if (params.data.value >= 20) {
                                        dataIndex = 1
                                    }
                                }
                                return colorList[dataIndex]
                            },
                        },
                    },
                    labelLine: {
                        normal: {
                            show: false,
                        },
                    },
                    data: [
                        { value: 100 - props.data.accuracy, name: '错误率' },
                        { value: props.data.accuracy, name: '正确率' },
                    ],
                },
            ],
        }
        myChart.setOption(option)
        // eslint-disable-next-line
    }, [props.data.accuracy, props.data.circleId])
    return <Container id={props.data.circleId}></Container>
}

export default Circle
