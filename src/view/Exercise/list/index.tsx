import React, { FC, useEffect, useContext, useState, ChangeEventHandler, KeyboardEventHandler } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { FiSearch } from 'react-icons/fi'

import { IStore } from '../../../store'
import TopicType from './TopicType'
import Section from './Section'
import NoData from '../net/NoData'

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const Header = styled.header`
    box-sizing: border-box;
    display: flex;
    height: 80px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
`
const TypeWrap = styled.ul`
    display: flex;
    width: 100%;
    height: 40px;
`
const SearchWrap = styled.div`
    margin-right: 10px;
    position: relative;
`
const FontWrap = styled.div`
    position: absolute;
    top: 50%;
    left: 10px;
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
interface ITopicTypeArr {
    id: string
    name: string
}

const NetExercise: FC<RouteComponentProps> = props => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)
    const [typeArr] = useState([
        {
            id: '0',
            name: '全部',
        },
        {
            id: '1',
            name: '单选题',
        },
        {
            id: '2',
            name: '多选题',
        },
        {
            id: '3',
            name: '判断题',
        },
        {
            id: '4',
            name: '填空题',
        },
        {
            id: '5',
            name: '简答题',
        },
    ])
    const [currentType, setCurrentType] = useState('0')
    const [keyWord, setKeyWord] = useState('')

    useEffect(() => {
        let value = sessionStorage.getItem('currentType')
        let data = {
            limit: 10,
            page: 1,
            type: Number(value),
        }
        if (value) {
            if (value === '0') {
                delete data.type
                exerciseStore.getProblemList(data)
            } else {
                exerciseStore.getProblemTypeList(data)
            }
            setCurrentType(value)
        } else {
            exerciseStore.getProblemList(data)
        }
        // eslint-disable-next-line
    }, [])

    //点击类型
    const handleClickTypeLink = (data: ITopicTypeArr) => {
        if (currentType === data.id) {
            return
        }
        let datas = {
            limit: 10,
            page: 1,
            type: Number(data.id),
        }
        if (data.id === '0') {
            delete datas.type
            exerciseStore.getProblemList(datas)
        } else {
            exerciseStore.getProblemTypeList(datas)
        }
        setCurrentType(data.id)
        sessionStorage.setItem('currentType', data.id)
    }

    const handleKeyDownEdit: KeyboardEventHandler = event => {
        if (event.which === 13) {
            let datas = {
                limit: 10,
                page: 1,
                type: Number(currentType),
                keyword: keyWord,
            }
            if (currentType === '0') {
                delete datas.type
                exerciseStore.getProblemList(datas)
            } else {
                exerciseStore.getProblemTypeList(datas)
            }
        }
    }

    const handleChangeKeyWord: ChangeEventHandler<HTMLInputElement> = event => {
        setKeyWord(event.target.value)
    }

    return useObserver(() => {
        return (
            <Container>
                <Header>
                    <TypeWrap>
                        <TopicType
                            data={{
                                typeArr,
                                currentType,
                            }}
                            onClickType={handleClickTypeLink}
                        ></TopicType>
                    </TypeWrap>
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
                </Header>
                {exerciseStore.problemList.length < 1 ? <NoData></NoData> : <Section></Section>}
            </Container>
        )
    })
}

export default NetExercise
