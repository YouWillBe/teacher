import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { FaPlusCircle } from 'react-icons/fa'

import { IStore } from '../../../store'
import Subjective from './Subjective'

const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
`

const ProblemListWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-height: 200px;
    max-height: 400px;
    box-shadow: 0px 2px 4px 0px rgba(157, 228, 255, 0.4);
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
    overflow: auto;
    &::-webkit-scrollbar-button {
        background-color: #fff;
    }
    &::-webkit-scrollbar {
        background-color: #fff;
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(66, 88, 99, 0.4);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #ddd;
    }
`
const NoData = styled.div`
    width: 100%;
`
const FontWrap = styled.div`
    margin-top: 10px;
    text-align: center;
    svg {
        color: #3a93df;
        cursor: pointer;
    }
`

interface IProps {
    data: {
        list: any
        name: string
        type: number
        count: number | undefined
    }
}

function SubProblemList(props: IProps) {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)

    //添加/删除
    const handleClickFont = (data: any) => {
        if (data.text === '添加') {
            ;(volumeStore.volumeOutline as any)[data.name].splice(data.index, 0, {
                fraction: props.data.count || 0,
                number: (volumeStore.volumeOutline as any)[data.name].length + 1,
                problemType: props.data.type,
                state: 0,
            })
        } else if (data.text === '删除') {
            let value = (volumeStore.volumeOutline as any)[data.name].splice(data.index, 1)
            if (value[0].id) {
                volumeStore.volumeOutlineId = [...volumeStore.volumeOutlineId, value[0].id]
            }
        }
    }

    return useObserver(() => {
        return (
            <Container>
                <ProblemListWrap>
                    {props.data.list.length ? (
                        props.data.list.map((item: any, index: number) => (
                            <Subjective
                                key={index}
                                data={{ ...item, index, name: props.data.name }}
                                onClickFont={handleClickFont}
                            ></Subjective>
                        ))
                    ) : (
                        <NoData>
                            <FontWrap onClick={() => handleClickFont({ text: '添加', name: props.data.name })}>
                                <FaPlusCircle title='添加'></FaPlusCircle>
                            </FontWrap>
                        </NoData>
                    )}
                </ProblemListWrap>
            </Container>
        )
    })
}

export default SubProblemList
