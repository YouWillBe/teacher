import React, { FC } from 'react'
import styled from '@emotion/styled'
import { FaProjectDiagram } from 'react-icons/fa'

const NoDataWrap = styled.div``
const ProblemType = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    height: 50px;
    background-color: rgba(7, 41, 121, 0.0974);
    border-radius: 10px;
    border: 1px solid rgba(0, 30, 232, 0.0974);
    color: #072979;
`
const Tag = styled.div`
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Text = styled.div`
    line-height: 50px;
    font-size: 18px;
    margin-left: 16px;
`

const Count = styled.div`
    font-size: 18px;
    margin-right: 20px;
`
const Left = styled.div`
    display: flex;
`

const NoDataSection = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    line-height: 80px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 10px;
    border: 3px solid rgba(255, 255, 255, 0.8178);
    padding: 8px 12px 30px 12px;
    margin-top: 25px;
    margin-bottom: 25px;
    font-size: 14px;
    font-family: PingFangSC-Light, sans-serif;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`

interface IProps {
    text: string
}
const NoData: FC<IProps> = props => {
    return (
        <NoDataWrap>
            <NoDataWrap>
                <ProblemType>
                    <Left>
                        <Tag>
                            <FaProjectDiagram />
                        </Tag>
                        <Text>{props.text}</Text>
                    </Left>
                    <Count>0 题</Count>
                </ProblemType>
            </NoDataWrap>
            <NoDataSection>暂无判{props.text}</NoDataSection>
        </NoDataWrap>
    )
}

export default NoData
