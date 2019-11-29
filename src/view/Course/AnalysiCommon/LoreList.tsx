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
    font-family: PingFangSC-Regular, PingFang SC;
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
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
`
const LoreName = styled.div`
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-bottom: 20px;
`

interface ILoreDTOList {
    avgAccuracy: number
    id: number
    name: string
}
interface IProps {
    data: {
        loreList: ILoreDTOList[]
        name: string
        colorArr: string[]
    }
}

const LoreList: FC<IProps> = props => {
    return (
        <Ul>
            <LoreName>{props.data.name}</LoreName>
            {props.data.loreList.map((item, index) => (
                <Li title={`正确率${item.avgAccuracy}%`} key={item.id}>
                    <Name>{item.name}</Name>
                    <ScheduleWrap>
                        <Article
                            setStyle={{ setWidth: item.avgAccuracy, bgColor: props.data.colorArr[index] }}
                        ></Article>
                    </ScheduleWrap>
                    <Numerical>{item.avgAccuracy}%</Numerical>
                </Li>
            ))}
        </Ul>
    )
}

export default LoreList
