import React, { FC, useEffect, useContext, useState, ChangeEventHandler, KeyboardEventHandler } from 'react'
import styled from 'styled-components'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { FiSearch } from 'react-icons/fi'

import { IStore } from '../../../store'
import TopicType from './TopicType'
import Section from './Section'
import NoData from '../NetQuestionBank/NoData'
import Loading from '../../../components/Loading'

const Container = styled.div`
    width: 100%;
    height: 100%;
`
const Header = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
`
const TypeWrap = styled.ul`
    display: flex;
    width: 100%;
`
const SearchWrap = styled.div`
    margin-right: 10px;
    position: relative;
`
const FontWrap = styled.div`
    position: absolute;
    left: 10px;
    height: 100%;
    color: #979797;
    font-size: 18px;
    display: flex;
    align-items: center;
`

const Input = styled.input`
    width: 150px;
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    outline: none;
    border: 1px solid #eee;
    padding: 8px 12px 8px 40px;
`
interface ITopicTypeArr {
    id: string
    name: string
}

const MyQuestionBank: FC = () => {
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
        if(event.which === 13) {
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
        if (exerciseStore.gettingProblemList) {
            return <Loading />
        }
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
                        />
                    </TypeWrap>
                    <SearchWrap>
                        <FontWrap>
                            <FiSearch />
                        </FontWrap>
                        <Input
                            value={keyWord}
                            placeholder='搜索知识点'
                            onChange={handleChangeKeyWord}
                            onKeyDown={handleKeyDownEdit}
                        />
                    </SearchWrap>
                </Header>
                {exerciseStore.problemList.length < 1 ? <NoData /> : <Section currentType={currentType} />}
            </Container>
        )
    })
}

export default MyQuestionBank
