import React, { FC, useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import styled from '@emotion/styled'
import { useObserver } from 'mobx-react-lite'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import { IStore } from '../../store'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    user-select: none;
    line-height: 50px;
    position: relative;
`
const Tag = styled.div`
    font-size: 20px;
    color: #aaa;
    transition: all 0.1s linear;
`
const SmallText = styled.div`
    color: #666;
    margin-left: 15px;
    margin-right: 15px;
    transition: all 0.1s linear;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
`
const Left = styled.div`
    display: flex;
    height: 100%;
    width: 120px;
    cursor: pointer;
    &:hover ${Tag} {
        color: #00a6f3;
    }
    &:hover ${SmallText} {
        color: #00a6f3;
    }
`
const Right = styled.div`
    display: flex;
    height: 100%;
    width: 120px;
    cursor: pointer;
    &:hover ${Tag} {
        color: #00a6f3;
    }
    &:hover ${SmallText} {
        color: #00a6f3;
    }
`
const Center = styled.div`
    margin: 0 20px;
    height: 100%;
    width: 100px;
`
const Text = styled.div`
    display: flex;
    color: #3a93df;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Number = styled.span`
    margin: 0 10px;
    font-size: 30px;
`
const SmallNumber = styled.span`
    margin: 0 10px;
    font-size: 21px;
`
const Blank = styled.div`
    width: 120px;
`
const ReSet = styled.div`
    position: absolute;
    right: 0;
    border: 1px solid #666;
    height: 26px;
    font-size: 12px;
    line-height: 26px;
    padding-left: 6px;
    padding-right: 6px;
    border-radius: 4px;
    top: 50%;
    margin-top: -14px;
    color: #666;
    transition: all 0.1s linear;
    cursor: pointer;
    &:hover {
        color: #3a93df;
        border-color: #3a93df;
    }
`

const WeekSelector: FC = () => {
    const { classTableStore } = useContext<IStore>(MobXProviderContext)
    return useObserver(() => (
        <Container>
            {classTableStore.currentWeek !== classTableStore.week && (
                <ReSet onClick={() => classTableStore.resetWeek()}>回到本周</ReSet>
            )}
            {classTableStore.week === 1 ? (
                <Blank />
            ) : (
                <Left title='上一周' onClick={() => classTableStore.previousWeek()}>
                    <Tag>
                        <FaAngleLeft></FaAngleLeft>
                    </Tag>
                    <SmallText>
                        第<SmallNumber>{classTableStore.week - 1}</SmallNumber>周
                    </SmallText>
                </Left>
            )}
            <Center>
                <Text>
                    第<Number>{classTableStore.week}</Number>周
                </Text>
            </Center>
            {classTableStore.week === 20 ? (
                <Blank />
            ) : (
                <Right title='下一周' onClick={() => classTableStore.nextWeek()}>
                    <SmallText>
                        第<SmallNumber>{classTableStore.week + 1}</SmallNumber>周
                    </SmallText>
                    <Tag>
                        <FaAngleRight></FaAngleRight>
                    </Tag>
                </Right>
            )}
        </Container>
    ))
}

export default WeekSelector
