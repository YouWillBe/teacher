import React, { useEffect, FC, useRef } from 'react'
import styled from 'styled-components'
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
        name: {
            text: string
            subtext: string
        }
        yAxisName: string[]
        seriesData: number[]
        totalCount: number
        height?: string
    }
}

const BarCylindrical: FC<IProps> = props => {
    const barcylidricalRef = useRef(null)

    useEffect(() => {
        const ec = Echart as any
        let myChart = ec.init(barcylidricalRef.current)
        let colorList = ['#FF6383', '#FF9F40', '#FFCB48', '#5C89FF', '#46BC15']
        let dataIndex = 0
        // 指定图表的配置项和数据
        let option = {
            title: {
                text: props.data.name.text,
                subtext: props.data.name.subtext,
            },
            tooltip: {
                trigger: 'axis',
                formatter: (params: { name: string; data: number | string }[]) => {
                    return `正确率：${params[0].name}<br>
                            人数：${params[0].data}`
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'value',
                max: props.data.totalCount,
            },
            yAxis: {
                data: props.data.yAxisName,
            },
            series: [
                {
                    name: '人数',
                    type: 'bar',
                    barWidth: 10,
                    barCategoryGap: '20px',
                    data: props.data.seriesData,
                    itemStyle: {
                        normal: {
                            color: function(params: any) {
                                if (params.dataIndex === 4) {
                                    dataIndex = 4
                                } else if (params.dataIndex === 3) {
                                    dataIndex = 3
                                } else if (params.dataIndex === 2) {
                                    dataIndex = 2
                                } else if (params.dataIndex === 1) {
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
    return <Container ref={barcylidricalRef} />
}

export default BarCylindrical
