import React, { useContext, useState, ChangeEventHandler, KeyboardEventHandler } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { FiSearch } from 'react-icons/fi'

import { IStore } from '../../../store'
import Dialog from '../../../components/Dialog'
import QuestionType from '../../../components/QuestionType'

const SearchWrap = styled.div`
    margin-right: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: right;
    position: relative;
`
const PreviewWrap = styled.div`
    padding: 20px;
    margin-right: 20px;
    margin-left: 1px;
    margin-top: 20px;
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 4px;
`
const FontWrap = styled.div`
    position: absolute;
    top: 50%;
    right: 310px;
    transform: translateY(-50%);
    svg {
        color: #979797;
        font-size: 20px;
    }
`
const Input = styled.input`
    width: 300px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 6px 0px rgba(88, 96, 247, 0.1);
    border-radius: 10px;
    outline: none;
    border: 1px solid #fff;
    padding-left: 40px;
`

const NotData = styled.div`
    width: 100%;
    height: 300px;
    line-height: 300px;
    text-align: center;
`

interface ILoreList {
    id: number
    name: string
}
interface IProblemList {
    answer: any
    fraction: number
    id: number
    option?: any
    type: number
    loreList: ILoreList[]
    solution: any
    topic: any
    answerCount?: any
    volumeId: number
}

interface IProps {
    onClickClose(): void
}

function PreviewList(props: IProps) {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)
    const [answerOption] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])
    const [keyWord, setKeyWord] = useState('')

    //处理数据
    const problemList = (data: IProblemList) => {
        let type1 = [4, 5]
        if (typeof data.topic === 'string') {
            data.topic = JSON.parse(data.topic)
        }
        if (typeof data.solution === 'string') {
            data.solution = JSON.parse(data.solution)
        }
        if (data.type === 1) {
            if (typeof data.option === 'string') {
                data.option = JSON.parse(data.option)
            }
            data.option.map((item: any, index: number) => {
                item.statu = false
                if (data.answer === answerOption[index]) {
                    item.statu = true
                }
                return item
            })
        } else if (data.type === 2) {
            if (typeof data.option === 'string') {
                data.option = JSON.parse(data.option)
            }
            let answer = data.answer.split(',')
            data.option.map((item: any, index: number) => {
                item.statu = false
                answer.map((t: string) => {
                    if (answerOption[index] === t) {
                        item.statu = true
                    }
                    return t
                })
                return item
            })
        } else if (type1.includes(data.type) && typeof data.answer === 'string') {
            data.answer = JSON.parse(data.answer)
        }

        return { ...data, showEditPick: 2 }
    }

    //选择
    const handleClickSelect = (data: IProblemList) => {
        let option: any = []
        let type = [1, 2]
        let type1 = [4, 5]

        let datas: any = {
            id: volumeStore.volumeProblem.id,
            topic: JSON.stringify(data.topic),
            option: [],
            answer: data.answer,
            solution: JSON.stringify(data.solution),
            loreIdList: [3, 4],
            type: data.type,
            answerCount: Number(data.answerCount),
            volumeId: volumeStore.volumeProblem.volumeId,
        }

        if (type.includes(data.type)) {
            data.option.map((item: any) => {
                option.push({
                    id: item.id,
                    value: item.value,
                })
                return item
            })
            delete datas.answerCount
            datas.option = JSON.stringify(option)
        } else if (type1.includes(data.type)) {
            delete datas.option
            datas.answer = JSON.stringify(data.answer)
        } else if (data.type === 3) {
            delete datas.option
            delete datas.answerCount
        }

        volumeStore.updateVolumeProblem(datas)
        volumeStore.volumeProblem = {
            ...volumeStore.volumeProblem,
            topic: data.topic,
            option: data.option,
            answer: data.answer,
            solution: data.solution,
            answerCount: data.answerCount,
            type: data.type,
            loreList: data.loreList,
        }
        props.onClickClose()
    }

    const handleKeyDownEdit: KeyboardEventHandler = event => {
        if (event.which === 13) {
            volumeStore.getProblemTypeList({
                page: 1,
                limit: 10,
                type: volumeStore.volumeProblem.type,
                keyword: keyWord,
            })
        }
    }

    const handleChangeKeyWord: ChangeEventHandler<HTMLInputElement> = event => {
        setKeyWord(event.target.value)
    }

    return useObserver(() => {
        return (
            <Dialog title='题目列表' onClickClose={props.onClickClose}>
                <SearchWrap>
                    <FontWrap>
                        <FiSearch></FiSearch>
                    </FontWrap>
                    <Input
                        value={keyWord}
                        placeholder='搜索知识点'
                        onChange={handleChangeKeyWord}
                        onKeyDown={handleKeyDownEdit}
                    ></Input>
                </SearchWrap>
                {volumeStore.problemList.length ? (
                    volumeStore.problemList.map(item => (
                        <PreviewWrap key={item.id}>
                            <QuestionType data={problemList(item)} onClickSelect={handleClickSelect}></QuestionType>
                        </PreviewWrap>
                    ))
                ) : (
                    <NotData>空题</NotData>
                )}
            </Dialog>
        )
    })
}

export default PreviewList
