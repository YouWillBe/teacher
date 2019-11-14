import React, { useContext, useState, useEffect } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import styled from '@emotion/styled'
import TypeNumber from './TypeNumber'

import { IStore } from '../../../store'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    min-height: 120px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    padding: 0 20px;
    margin-top: 20px;
`

const TypeWrap = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(151, 151, 151, 0.2);
`

const ItwmWrap = styled.div`
    box-sizing: border-box;
    width: 36px;
    height: 36px;
    margin-right: 30px;
`
const ItwmWrap1 = styled.div`
    box-sizing: border-box;
    width: 36px;
    height: 36px;
    margin-right: 20px;
`

const TypeWrap1 = styled.div`
    min-height: 60px;
    display: flex;
    align-items: center;
`

function Header() {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)
    const [typeArr] = useState([
        {
            id: 1,
            text: '单',
            name: 'choiceProblems',
        },
        {
            id: 2,
            text: '多',
            name: 'checkboxProblems',
        },
        {
            id: 3,
            text: '判',
            name: 'judgeProblems',
        },
        {
            id: 4,
            text: '填',
            name: 'fillingProblems',
        },
        {
            id: 5,
            text: '答',
            name: 'shortAnswerProblems',
        },
    ])
    const [currentType, setCurrentType] = useState({ id: 1, name: 'choiceProblems', number: 1 })

    useEffect(() => {
        let data = sessionStorage.getItem('sessionCurrentType')
        if (data) {
            setCurrentType(JSON.parse(data))
        }
    }, [])

    //点击类型
    const handleClickType = (id: number, name: string) => {
        if (currentType.id === id) {
            return
        }
        sessionStorage.setItem('sessionCurrentType', JSON.stringify({ id, name, number: 1 }))
        setCurrentType({ id, name, number: 1 })
        if ((volumeStore.volumeDetailList as any)[name].length) {
            volumeStore.getVolumeProblem((volumeStore.volumeDetailList as any)[name][0].id)
        } else {
            volumeStore.volumeProblem = {
                answer: '',
                fraction: 0,
                id: 0,
                type: 0,
                number: 0,
                loreList: [],
                solution: '',
                topic: '',
                volumeId: 0,
            }
        }
    }

    //点击number
    const handleClickNumber = (id: number, number: number) => {
        if (currentType.number === number) {
            return
        }
        sessionStorage.setItem(
            'sessionCurrentType',
            JSON.stringify({
                ...currentType,
                number,
            })
        )
        setCurrentType({
            ...currentType,
            number,
        })
        volumeStore.getVolumeProblem(id)
    }

    //类型
    const typeOption = (id: number) => {
        if (currentType.id === id) {
            return {
                bgColor: '#144E5E',
                color: '#fff',
                border: '',
            }
        } else {
            return {
                bgColor: '',
                color: '#144E5E',
                border: '',
            }
        }
    }

    //number
    const numberOption = (number: number, state: number) => {
        if (currentType.number === number) {
            return {
                bgColor: '#144E5E',
                color: '#fff',
                border: '#144E5E',
            }
        } else if (state === 0) {
            return {
                bgColor: '',
                color: '#ED497E',
                border: '#CECECE',
            }
        } else {
            return {
                bgColor: '',
                color: '#666',
                border: '#CECECE',
            }
        }
    }

    return useObserver(() => {
        return (
            <Container>
                <TypeWrap>
                    {typeArr.map(item => (
                        <ItwmWrap key={item.id} onClick={() => handleClickType(item.id, item.name)}>
                            <TypeNumber option={typeOption(item.id)} data={{ text: item.text }}></TypeNumber>
                        </ItwmWrap>
                    ))}
                </TypeWrap>
                <TypeWrap1>
                    {(volumeStore.volumeDetailList as any)[currentType.name].map((item: any, index: number) => (
                        <ItwmWrap1 key={item.id} onClick={() => handleClickNumber(item.id, item.number)}>
                            <TypeNumber
                                option={numberOption(item.number, item.state)}
                                data={{ text: item.number }}
                            ></TypeNumber>
                        </ItwmWrap1>
                    ))}
                </TypeWrap1>
            </Container>
        )
    })
}

export default Header
