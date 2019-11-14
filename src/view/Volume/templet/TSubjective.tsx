import React, { useContext, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'

import { IStore } from '../../../store'

const Container = styled.div`
    margin-bottom: 10px;
    min-height: 80px;
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 8px;
    margin-left: 1px;
    padding-bottom: 20px;
`

const TypeWrap = styled.div`
    display: flex;
    align-items: center;
    width: 180px;
    justify-content: center;
    padding-top: 20px;
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
const FontWrap = styled.div`
    width: 60px;
    display: flex;
    justify-content: space-evenly;
    svg {
        font-size: 20px;
        cursor: pointer;
    }
`
const FontWrap1 = styled.div`
    width: 20px;
    height: 20px;
    svg {
        color: #eb5454;
    }
`
const FontWrap2 = styled.div`
    width: 20px;
    height: 20px;
`
const FontWrap3 = styled.div`
    width: 20px;
    height: 20px;
    svg {
        color: #409eff;
    }
`

const Ul = styled.ul`
    width: calc(100% - 150px);
    margin-left: 150px;
    display: flex;
    flex-wrap: wrap;
`
const Li = styled.li`
    width: 110px;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 8px;
`
const Number = styled.span`
    box-sizing: border-box;
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid rgba(58, 147, 223, 0.4);
    border-radius: 50%;
    line-height: 30px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(2, 97, 156, 1);
    text-align: center;
`
const ProblemScore = styled.input`
    width: 50px;
    height: 30px;
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

interface IProblem {
    problemScore: number
    problemType: number
}

interface IProps {
    data: {
        bgColor: string
        type: string
        problem: IProblem[]
    }
}
function TSubjective(props: IProps) {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)

    //减
    const handleClickLess = () => {
        if (props.data.type === '填') {
            let data = volumeStore.templateDetail.fillingProblems.splice(
                volumeStore.templateDetail.fillingProblems.length - 1,
                1
            )
            if (data[0].id) {
                volumeStore.deleteListId = [...volumeStore.deleteListId, data[0].id]
            }
        } else if (props.data.type === '答') {
            let data = volumeStore.templateDetail.shortAnswerProblems.splice(
                volumeStore.templateDetail.shortAnswerProblems.length - 1,
                1
            )
            if (data[0].id) {
                volumeStore.deleteListId = [...volumeStore.deleteListId, data[0].id]
            }
        }
    }

    //加
    const handleClickPlus = () => {
        if (props.data.type === '填') {
            volumeStore.templateDetail.fillingProblems = [
                ...volumeStore.templateDetail.fillingProblems,
                {
                    problemScore: 0,
                    problemType: 4,
                    volumesTemplateId: volumeStore.templateDetail.objectiveProblems[0].volumesTemplateId,
                },
            ]
        } else if (props.data.type === '答') {
            volumeStore.templateDetail.shortAnswerProblems = [
                ...volumeStore.templateDetail.shortAnswerProblems,
                {
                    problemScore: 0,
                    problemType: 5,
                    volumesTemplateId: volumeStore.templateDetail.objectiveProblems[0].volumesTemplateId,
                },
            ]
        }
    }

    //分
    const handleChangeProblemScore = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        if (props.data.type === '填') {
            if (parseInt(event.target.value)) {
                volumeStore.templateDetail.fillingProblems[index].problemScore = parseInt(event.target.value)
            } else {
                volumeStore.templateDetail.fillingProblems[index].problemScore = 0
            }
        } else if (props.data.type === '答') {
            if (parseInt(event.target.value)) {
                volumeStore.templateDetail.shortAnswerProblems[index].problemScore = parseInt(event.target.value)
            } else {
                volumeStore.templateDetail.shortAnswerProblems[index].problemScore = 0
            }
        }
    }

    return useObserver(() => {
        return (
            <Container>
                <TypeWrap>
                    <TopicType bgColor={props.data.bgColor}>{props.data.type}</TopicType>
                    <FontWrap>
                        {props.data.problem.length ? (
                            <FontWrap1 title='减一题' onClick={handleClickLess}>
                                <FaMinusCircle></FaMinusCircle>
                            </FontWrap1>
                        ) : (
                            <FontWrap2></FontWrap2>
                        )}
                        <FontWrap3 title='加一题' onClick={handleClickPlus}>
                            <FaPlusCircle></FaPlusCircle>
                        </FontWrap3>
                    </FontWrap>
                </TypeWrap>
                <Ul>
                    {props.data.problem.map((item, index) => (
                        <Li key={index}>
                            <Number>{index + 1}</Number>
                            <ProblemScore
                                value={item.problemScore}
                                onChange={e => handleChangeProblemScore(e, index)}
                            ></ProblemScore>
                        </Li>
                    ))}
                </Ul>
            </Container>
        )
    })
}

export default TSubjective
