import React, { useContext, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../store'
import TopicType from './TopicType'
import ObjProblemList from './ObjProblemList'
import SubProblemList from './SubProblemList'
import Button from '../../../components/Button'

const Container = styled.div`
    width: 100%;
`
const Wrap = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 20px;
`
const TypeWrap = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    margin-left: 1px;
`
const TotalScore = styled.div`
    position: absolute;
    left: 4px;
    top: 42px;
`
const Total = styled.div`
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
`
const Total1 = styled(Total)`
    margin-top: 6px;
`
const Input = styled.input`
    width: 50px;
    height: 30px;
    box-shadow: 0px 2px 4px 0px rgba(145, 224, 254, 0.5);
    border-radius: 6px;
    outline: none;
    border: none;
    text-align: center;
`

const ButtonWrap = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

interface IProps {
    totalScore(): {
        choiceTotal: number
        checkboxTotal: number
        judgeTotal: number
        fillingTotal: number
        shortAnswerTotal: number
        totalScore: number
        totalNumber: number
    }
    onClickClose(): void
}

function PreviewList(props: IProps) {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)

    //题总分
    const handleChangeTotal = (event: ChangeEvent<HTMLInputElement>, text: string) => {
        if (Number(event.target.value)) {
            ;(volumeStore.volumeOutline.problemFraction as any)[text] = Number(event.target.value)
        } else {
            ;(volumeStore.volumeOutline.problemFraction as any)[text] = 0
        }
    }

    const Problems = (value: any, text: string) => {
        value.map((item: any, index: number) => {
            if (text === '1') {
                item.fraction = volumeStore.volumeOutline.problemFraction!.chioceFraction
            } else if (text === '2') {
                item.fraction = volumeStore.volumeOutline.problemFraction!.checkboxFraction
            } else if (text === '3') {
                item.fraction = volumeStore.volumeOutline.problemFraction!.judgeFraction
            }
            item.number = index + 1
            return value
        })
        return value
    }

    //保存结构
    const handleClickSave = () => {
        let data = {
            deleteList: volumeStore.volumeOutlineId,
            ...volumeStore.volumeOutline,
            choiceProblems: Problems(volumeStore.volumeOutline.choiceProblems, '1'),
            checkboxProblems: Problems(volumeStore.volumeOutline.checkboxProblems, '2'),
            judgeProblems: Problems(volumeStore.volumeOutline.judgeProblems, '3'),
            fillingProblems: Problems(volumeStore.volumeOutline.fillingProblems, '4'),
            shortAnswerProblems: Problems(volumeStore.volumeOutline.shortAnswerProblems, '5'),
            totalScore: props.totalScore().totalScore,
            totalProblem: props.totalScore().totalNumber,
        }
        let problemArr = [
            data.choiceProblems,
            data.checkboxProblems,
            data.judgeProblems,
            data.fillingProblems,
            data.shortAnswerProblems,
        ]
        if (problemArr.some(item => item.length > 0)) {
            volumeStore.updateVolumeOutline(data)
            props.onClickClose()
        }
    }

    return useObserver(() => {
        return (
            <Container>
                <Wrap>
                    <TypeWrap>
                        <TotalScore>
                            <Total>题总分</Total>
                            <Total1>每题分</Total1>
                        </TotalScore>
                        <TopicType
                            data={{
                                text: '单',
                                count: props.totalScore().choiceTotal,
                            }}
                            option={{ bgColor: '#145869', color: '#145869' }}
                        ></TopicType>
                        <Input
                            value={volumeStore.volumeOutline.problemFraction!.chioceFraction}
                            onChange={e => handleChangeTotal(e, 'chioceFraction')}
                        ></Input>
                        <SubProblemList
                            data={{
                                list: volumeStore.volumeOutline.choiceProblems,
                                name: 'choiceProblems',
                                type: 1,
                                count: volumeStore.volumeOutline.problemFraction!.chioceFraction,
                            }}
                        ></SubProblemList>
                    </TypeWrap>
                    <TypeWrap>
                        <TopicType
                            data={{
                                text: '多',
                                count: props.totalScore().checkboxTotal,
                            }}
                            option={{ bgColor: '#F96C3B', color: '#F96C3B' }}
                        ></TopicType>
                        <Input
                            value={volumeStore.volumeOutline.problemFraction!.checkboxFraction}
                            onChange={e => handleChangeTotal(e, 'checkboxFraction')}
                        ></Input>
                        <SubProblemList
                            data={{
                                list: volumeStore.volumeOutline.checkboxProblems,
                                name: 'checkboxProblems',
                                type: 2,
                                count: volumeStore.volumeOutline.problemFraction!.checkboxFraction,
                            }}
                        ></SubProblemList>
                    </TypeWrap>
                    <TypeWrap>
                        <TopicType
                            data={{
                                text: '判',
                                count: props.totalScore().judgeTotal,
                            }}
                            option={{ bgColor: '#FF9A3C', color: '#FF9A3C' }}
                        ></TopicType>
                        <Input
                            value={volumeStore.volumeOutline.problemFraction!.judgeFraction}
                            onChange={e => handleChangeTotal(e, 'judgeFraction')}
                        ></Input>
                        <SubProblemList
                            data={{
                                list: volumeStore.volumeOutline.judgeProblems,
                                name: 'judgeProblems',
                                type: 3,
                                count: volumeStore.volumeOutline.problemFraction!.judgeFraction,
                            }}
                        ></SubProblemList>
                    </TypeWrap>
                    <TypeWrap>
                        <TopicType
                            data={{ text: '填', count: props.totalScore().fillingTotal }}
                            option={{ bgColor: '#E6255D', color: '#E6255D' }}
                        ></TopicType>
                        <ObjProblemList
                            data={{ list: volumeStore.volumeOutline.fillingProblems, name: 'fillingProblems', type: 4 }}
                        ></ObjProblemList>
                    </TypeWrap>
                    <TypeWrap>
                        <TopicType
                            data={{ text: '答', count: props.totalScore().shortAnswerTotal }}
                            option={{ bgColor: '#005691', color: '#005691' }}
                        ></TopicType>
                        <ObjProblemList
                            data={{
                                list: volumeStore.volumeOutline.shortAnswerProblems,
                                name: 'shortAnswerProblems',
                                type: 5,
                            }}
                        ></ObjProblemList>
                    </TypeWrap>
                </Wrap>
                <ButtonWrap>
                    <Button onClick={handleClickSave}>保存结构</Button>
                </ButtonWrap>
            </Container>
        )
    })
}

export default PreviewList
