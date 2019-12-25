import React, { FC, useContext, useState } from 'react'
import styled from 'styled-components'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../store'
import QuestionType from '../../../components/QuestionType'
import Paging from '../../../components/Paging'
import NoData from '../NetQuestionBank/NoData'
import Loading from '../../../components/Loading'

const ScrollbarWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 80px);
    overflow-y: auto;
    padding: 0 20px;
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
const Container = styled.ul`
    width: 100%;
`
const Li = styled.li`
    box-sizing: border-box;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 11px 0 rgba(64, 158, 255, 0.1);
    border-radius: 4px;
    border: 3px solid rgba(255, 255, 255, 1);
    margin-bottom: 20px;
    padding: 20px;
`
const PagingWrap = styled.div`
    margin-bottom: 20px;
`
interface ILoreList {
    id: number
    name: string
}
interface IProblemList {
    index: number
    id?: number | 0
    topic: any
    answer: any
    studentAnswer?: any
    fraction?: number
    option?: any
    type: number
    loreList: ILoreList[]
    solution: any
    showEditPick?: number | 0
}

const List: FC = () => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)
    const [answerOption] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])

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
                item.statu = data.answer === answerOption[index]
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

        return { ...data, showEditPick: 1 }
    }

    return useObserver(() => {
        if (exerciseStore.gettingProblemList) {
            return <Loading />
        } else if (exerciseStore.problemList.length < 1) {
            return <NoData />
        }
        return (
            <ScrollbarWrap>
                <Container>
                    {exerciseStore.problemList.map((item, index) => (
                        <Li key={item.id}>
                            <QuestionType data={problemList({ ...item, index })} />
                        </Li>
                    ))}
                </Container>
                {exerciseStore.problemListPage.total > 10 && (
                    <PagingWrap>
                        <Paging
                            onChange={(page: number) => exerciseStore.changePage(page)}
                            current={exerciseStore.problemListPage.page}
                            total={Math.ceil(exerciseStore.problemListPage.total / exerciseStore.problemListPage.limit)}
                        />
                    </PagingWrap>
                )}
            </ScrollbarWrap>
        )
    })
}

export default List
