import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../store'

interface ISetType {
    setType: {
        isColor: boolean
        mark: number
    }
}

interface IProblems {
    id: number
    ifEntering: number
    problemType: number
    number: number
    mark: number
    ifStudentAnswer: number
    index: number
    key: string
}

const Wrap = styled.div``
const ProblemNameWrap = styled.div`
    margin-top: 36px;
`
const ProblemName = styled.span<ISetType>`
    display: inline-block;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-right: 42px;
    color: ${props => (props.setType.isColor ? '#fff' : props.setType.mark === 1 ? '#fff' : '#666')};
    background-color: ${props =>
        props.setType.isColor ? 'rgba(24, 81, 97, 1)' : props.setType.mark === 1 ? '#fff' : '#fff'};
    border: 1px solid
        ${props =>
            props.setType.isColor
                ? 'rgba(24, 81, 97, 1)'
                : props.setType.mark === 1
                ? '#3B8DF2'
                : 'rgba(24, 81, 97, 1)'};
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    :hover {
        background-color: rgba(24, 81, 97, 1);
        color: #fff;
    }
`

const NumberWrap: FC = props => {
    const { courseIndexStore } = useContext<IStore>(MobXProviderContext)

    //题目number
    const handleClickTypeNumber = (data: IProblems) => {
        if (data.number === courseIndexStore.testProblemDetailData.number) {
            return
        }
        sessionStorage.setItem(
            'sessionCurrentType',
            JSON.stringify({ type: courseIndexStore.currentProblemDetailData.type, number: data.number })
        )
        courseIndexStore.getTestProblemEntering(courseIndexStore.studentVolume.id)
        courseIndexStore.testProblemDetailData.number = data.number
    }
    return useObserver(() => {
        return (
            <Wrap>
                <ProblemNameWrap>
                    {(courseIndexStore.studentVolume as any)[courseIndexStore.currentProblemDetailData.type].map(
                        (item: IProblems, index: number) => (
                            <ProblemName
                                key={index}
                                setType={{
                                    mark: item.mark,
                                    isColor: item.number === courseIndexStore.testProblemDetailData.number,
                                }}
                                onClick={() => handleClickTypeNumber({ ...item, index })}
                            >
                                {item.number}
                            </ProblemName>
                        )
                    )}
                </ProblemNameWrap>
            </Wrap>
        )
    })
}

export default NumberWrap
