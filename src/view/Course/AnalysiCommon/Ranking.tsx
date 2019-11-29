import React, { FC } from 'react'
import styled from '@emotion/styled'

const Ul = styled.ul`
    width: 100%;
`
const Li = styled.li`
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    :hover {
        background-color: rgba(153, 153, 153, 0.1);
    }
`
const Name = styled.span`
    width: 150px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
`
const ScheduleWrap = styled.div`
    flex: 1;
    width: 100%;
    height: 10px;
    background-color: rgba(239, 239, 239, 1);
    border-radius: 9px;
    position: relative;
`
const Article = styled.div<{ setStyle: { bgColor: string; setWidth: number } }>`
    position: absolute;
    width: ${props => Math.ceil(props.setStyle.setWidth) + '%'};
    background-color: ${props => props.setStyle.bgColor};
    height: 10px;
    border-radius: 9px;
`
const Numerical = styled.span`
    width: 60px;
    text-align: center;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
`

interface ILoreDTOList {
    avgAccuracy: number
    id: number
    name: string
}
interface IProps {
    data: ILoreDTOList
}

const Ranking: FC<IProps> = props => {
    const setColorDate = () => {
        if (props.data.avgAccuracy >= 90) {
            return {
                bgColor: '#46BC15',
                setWidth: props.data.avgAccuracy,
            }
        } else if (props.data.avgAccuracy >= 80) {
            return {
                bgColor: '#5C89FF',
                setWidth: props.data.avgAccuracy,
            }
        } else if (props.data.avgAccuracy >= 60) {
            return {
                bgColor: '#FFCB48',
                setWidth: props.data.avgAccuracy,
            }
        } else if (props.data.avgAccuracy >= 40) {
            return {
                bgColor: '#FF9F40',
                setWidth: props.data.avgAccuracy,
            }
        } else {
            return {
                bgColor: '#FF6383',
                setWidth: props.data.avgAccuracy,
            }
        }
    }

    return (
        <Ul>
            <Li title={`正确率${props.data.avgAccuracy}%`}>
                <Name>{props.data.name}</Name>
                <ScheduleWrap>
                    <Article setStyle={setColorDate()} />
                </ScheduleWrap>
                <Numerical>{props.data.avgAccuracy}%</Numerical>
            </Li>
        </Ul>
    )
}

export default Ranking
