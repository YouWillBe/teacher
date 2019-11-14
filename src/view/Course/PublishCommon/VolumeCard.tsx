import React, { FC } from 'react'
import styled from '@emotion/styled'
import { take } from 'ramda'

interface ILore {
    id: number
    name: string
}

interface IProps {
    id: number
    title: string
    loreList: ILore[]
    handleClick(id: number): void
}

const Container = styled.div`
    height: 170px;
    width: 170px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 1px 1px;
    cursor: pointer;
    border: 1px solid #eee;
    transition: border-color 0.1s linear;
    &:hover {
        border-color: #3a93df;
        box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    }
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    user-select: none;
    position: relative;
    margin-left: 10px;
    margin-right: 10px;
`
const Title = styled.div`
    height: 30px;
    line-height: 30px;
    font-weight: 700;
    color: #555;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
    font-size: 14px;
`
const LoreTitle = styled.div`
    width: 100%;
    position: relative;
    height: 20px;
    margin-bottom: 8px;
`
const LoreTitleText = styled.div`
    width: 80px;
    position: absolute;
    z-index: 2;
    background-color: #fff;
    text-align: center;
    left: 50%;
    margin-left: -40px;
    font-size: 12px;
    color: #777;
    line-height: 20px;
`
const Line = styled.div`
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: #ccc;
    top: 11px;
    z-index: 1;
`
const LoreWrap = styled.div`
    flex-grow: 1;
    width: 100%;
    box-sizing: border-box;
    padding-left: 12px;
    padding-right: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`
const Lore = styled.div`
    padding: 8px;
    height: 35px;
    width: 100%;
    text-align: center;
    border: 1px solid rgba(58, 147, 223, 1);
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 12px;
    background-color: rgba(221, 237, 241, 1);
    color: #3a93df;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const VolumeCard: FC<IProps> = props => {
    const handleClick = () => {
        props.handleClick(props.id)
    }
    return (
        <Container onClick={handleClick}>
            <Title title={props.title}>{props.title}</Title>
            <LoreTitle>
                <LoreTitleText>知识点</LoreTitleText>
                <Line />
            </LoreTitle>
            <LoreWrap>
                {take(2, props.loreList).map((v, i) => (
                    <Lore key={i} title={v.name}>
                        {v.name}
                    </Lore>
                ))}
            </LoreWrap>
        </Container>
    )
}

export default VolumeCard
