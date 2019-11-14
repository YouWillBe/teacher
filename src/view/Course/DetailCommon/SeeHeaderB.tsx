import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps } from '@reach/router'

import { IStore } from '../../../store'
import NumberWrap from './NumberWrap'

export interface IProblems {
    id: number
    problemType: number
    number: number
    mark: number
    studentAnswer: number
    index: number
}

export interface IProblems {
    id: number
    problemType: number
    number: number
    mark: number
    studentAnswer: number
    index: number
}

const HeaderWrap = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
`
const TypeWrap = styled.div`
    flex: 1;
    box-sizing: border-box;
    padding: 24px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 7px 0px rgba(232, 91, 82, 0.15);
    border-radius: 4px;
`
const TypeName = styled.span<{ isColor: boolean }>`
    display: inline-block;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    margin-right: 42px;
    color: ${props => (props.isColor ? '#fff' : '#333')};
    background-color: ${props => (props.isColor ? 'rgba(24, 81, 97, 1)' : '#fff')};
    box-shadow: 0px 2px 4px 0px rgba(65, 145, 243, 0.2);
    border-radius: 50%;
    cursor: pointer;
    :hover {
        background-color: rgba(24, 81, 97, 1);
        color: #fff;
    }
`
interface IProps {}
const SeeHeaderB: FC<RouteComponentProps<IProps>> = props => {
    const { courseIndexStore } = useContext<IStore>(MobXProviderContext)

    //题目类型
    const handleClickTypeName = (data: { name: string; type: number; typeName: string }) => {
        if (data.type === courseIndexStore.currentProblemDetailData.id) {
            return
        }
        sessionStorage.setItem('sessionCurrentType', JSON.stringify({ id: data.type, type: data.typeName, number: 1 }))
        courseIndexStore.currentProblemDetailData = {
            id: data.type,
            number: 1,
            type: data.typeName,
        }
        courseIndexStore.getTestProblemEntering(courseIndexStore.studentVolume.id)
    }

    return useObserver(() => {
        return (
            <HeaderWrap>
                <TypeWrap>
                    {courseIndexStore.studentVolume.problemTypeIsExit.map((item, index) => (
                        <TypeName
                            key={index}
                            isColor={item.typeName === courseIndexStore.currentProblemDetailData.type}
                            onClick={() => handleClickTypeName(item)}
                        >
                            {item.name.slice(0, 1)}
                        </TypeName>
                    ))}
                    <NumberWrap />
                </TypeWrap>
            </HeaderWrap>
        )
    })
}

export default SeeHeaderB
