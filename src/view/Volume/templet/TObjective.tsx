import React, { useContext, ChangeEventHandler } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { FaPlus, FaMinus } from 'react-icons/fa'

import { IStore } from '../../../store'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 200px;
`
const Left = styled.div`
    display: grid;
    grid-template-columns: 120px 120px 1fr 1fr;
    align-items: center;
    margin-bottom: 10px;
    height: 80px;
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 8px;
    margin-left: 1px;
`
const Less = styled.div`
    width: 14px;
    height: 14px;
`
const NoLess = styled.div`
    width: 14px;
    height: 14px;
`

const ProblemCount = styled.input`
    width: 30px;
    height: 40px;
    box-shadow: 0px 2px 4px 0px rgba(51, 181, 185, 0.33);
    border-radius: 4px;
    outline: none;
    border: none;
    margin: 0 8px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(20, 78, 94, 1);
`
const Plus = styled.div`
    width: 14px;
    height: 14px;
`

const Font = styled.div`
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
`
const AmountWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        font-size: 14px;
        color: rgba(64, 158, 255, 1);
        cursor: pointer;
    }
`
const TotalWrap = styled(Font)`
    display: flex;
    align-items: center;
    justify-content: center;
`
const ProblemScore = styled.input`
    width: 80px;
    height: 34px;
    box-shadow: 0px 2px 4px 0px rgba(145, 224, 254, 0.5);
    border-radius: 6px;
    outline: none;
    border: none;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(64, 158, 255, 1);
`
const ScoreWrap = styled(Font)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
`

const TypeWrap = styled.div`
    text-align: center;
`
const TopicType = styled.span<{ bgColor: string }>`
    display: inline-block;
    width: 36px;
    height: 36px;
    background-color: ${props => props.bgColor};
    border-radius: 50%;
    line-height: 36px;
    color: rgba(255, 255, 255, 1);
    text-align: center;
`
const Right = styled.div``

interface IProps {
    data: {
        bgColor: string
        index: number
        type: string
        problemCount: number
        problemScore: number
    }
}
function TObjective(props: IProps) {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)

    //减
    const handleClickLess = () => {
        volumeStore.templateDetail.objectiveProblems[props.data.index].problemCount -= 1
    }

    //加
    const handleClickPlus = () => {
        volumeStore.templateDetail.objectiveProblems[props.data.index].problemCount += 1
    }

    const handleChangeProblemCount: ChangeEventHandler<HTMLInputElement> = event => {
        volumeStore.templateDetail.objectiveProblems[props.data.index].problemCount = Number(event.target.value)
    }
    const handleChangeProblemScore: ChangeEventHandler<HTMLInputElement> = event => {
        volumeStore.templateDetail.objectiveProblems[props.data.index].problemScore = Number(event.target.value)
    }

    return (
        <Container>
            <Left>
                <TypeWrap>
                    <TopicType bgColor={props.data.bgColor}>{props.data.type}</TopicType>
                </TypeWrap>
                <AmountWrap>
                    {props.data.problemCount === 0 ? (
                        <NoLess></NoLess>
                    ) : (
                        <Less title='减一题' onClick={handleClickLess}>
                            <FaMinus></FaMinus>
                        </Less>
                    )}

                    <ProblemCount value={props.data.problemCount} onChange={handleChangeProblemCount}></ProblemCount>
                    <Plus title='加一题' onClick={handleClickPlus}>
                        <FaPlus></FaPlus>
                    </Plus>
                </AmountWrap>
                <TotalWrap>
                    <ProblemScore value={props.data.problemScore} onChange={handleChangeProblemScore} />
                </TotalWrap>
                <ScoreWrap>{props.data.problemCount * props.data.problemScore}</ScoreWrap>
            </Left>
            <Right></Right>
        </Container>
    )
}

export default TObjective
