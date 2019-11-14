import React, { useEffect, FC } from 'react'
import styled from '@emotion/styled'
import Echart from 'echarts'

const Container = styled.div`
    width: 100%;
    height: 100%;
`
interface IProps {
    data: {
        indicator: { name: string; max: number }[]
        series: number[]
        labels: string[]
        textStyle: {
            titleText: string
            titleColor?: string
            nameColor?: string
        }
    }
}

const Radar: FC<IProps> = props => {
    useEffect(() => {
        const ec = Echart as any
        let myChart = ec.init(document.getElementById('radar1'))
        // 指定图表的配置项和数据
        if (props.data.indicator.length) {
            let labels = props.data.labels

            let option = {
                title: {
                    text: props.data.textStyle!.titleText,
                    left: 'left',
                    top: 0,
                    textStyle: {
                        color: props.data.textStyle.titleColor || '#999',
                        fontSize: 14,
                    },
                },
                tooltip: {
                    formatter: function(params: any) {
                        let results = ''
                        for (let i = 0; i < labels.length; i++) {
                            results += labels[i] + '：' + params.value[i] + '%<br>'
                        }
                        return results
                    },
                },
                radar: {
                    name: {
                        textStyle: {
                            color: props.data.textStyle.nameColor || '#804774',
                        },
                    },
                    indicator: props.data.indicator,
                },

                series: [
                    {
                        type: 'radar',
                        data: [
                            {
                                value: props.data.series,
                            },
                        ],
                        areaStyle: {
                            normal: {},
                        },
                    },
                ],
            }
            myChart.setOption(option)
        }

        // eslint-disable-next-line
    }, [props.data.indicator.length])
    return <Container id='radar1'></Container>
}

export default Radar
