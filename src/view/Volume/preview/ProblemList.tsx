import React, { useContext, useState } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../store'
import QuestionType from '../../../components/QuestionType'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`
const Header = styled.div`
    width: 100px;
`
const TypeWrap = styled.div`
    width: 100%;
    margin: 20px 0;
`
const TypeItem = styled.div<{ currentType: boolean }>`
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding: 0 10px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    cursor: pointer;
    border-radius: 6px;
    background-color: ${props => (props.currentType ? '#409eff' : '#fff')};
    color: ${props => (props.currentType ? '#fff' : '#333')};
    margin-top: 8px;
    :hover {
        background-color: #409eff;
        color: #fff;
    }
`
const TypeItem1 = styled.div`
    display: flex;
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding: 0 10px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
`
const Section = styled.table`
    flex: 1;
    margin-left: 20px;
`
const Package = styled.tbody``
const Tr = styled.tr`
    display: flex;
    flex-direction: column;
`
const PreviewWrap = styled.td``

interface IProps {}

function ProblemList(props: IProps) {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)
    const [typeArr] = useState([
        { id: '1', name: '单选', key: 'choiceProblems' },
        { id: '2', name: '多选', key: 'checkboxProblems' },
        { id: '3', name: '判断', key: 'judgeProblems' },
        { id: '4', name: '填空', key: 'fillingProblems' },
        { id: '5', name: '简答', key: 'shortAnswerProblems' },
    ])
    const [currentType, setCurrentType] = useState({ id: '0', key: '' })

    const handleClickType = (data: any) => {
        setCurrentType(data)
    }

    const typeLength = (key: string) => {
        return (volumeStore.volumeVolumeProblemAll as any)[key].length
    }

    const handleClickPrint = () => {
        var printBox = document.getElementById('printJS-form')
        //拿到打印的区域的html内容
        var newContent = printBox!.innerHTML
        //将旧的页面储存起来，当打印完成后返给给页面。
        // var oldContent = document.body.innerHTML
        //赋值给body
        document.body.innerHTML = newContent
        //执行window.print打印功能
        window.print()
        // 重新加载页面，以刷新数据。以防打印完之后，页面不能操作的问题
        return false
        // print({ printable: 'printJS-form', type: 'html', targetStyles: ['*'] })
        // console.log(printJS('printJS-form', 'html'))
    }

    const problemType = (data: any) => {
        let type = [1, 2]
        let type1 = [4, 5]
        if (type.includes(data.problemType) && typeof data.option === 'string') {
            data.option = JSON.parse(data.option)
        }
        if (typeof data.topic === 'string') {
            data.topic = JSON.parse(data.topic)
        }
        if (typeof data.solution === 'string') {
            data.solution = JSON.parse(data.solution)
        }
        if (type1.includes(data.problemType) && typeof data.answer === 'string') {
            if (data.answer !== '') {
                data.answer = JSON.parse(data.answer)
            }
        }
        data.index = data.number - 1
        data.loreList = []
        data.type = data.problemType
        return data
    }

    return useObserver(() => {
        return (
            <Container>
                <Header>
                    <TypeWrap>
                        <TypeItem1>总分&nbsp;{volumeStore.volumeVolumeProblemAll.totalScore}</TypeItem1>
                        <TypeItem
                            currentType={currentType.id === '0'}
                            onClick={() => handleClickType({ id: '0', key: '' })}
                        >
                            全部
                        </TypeItem>
                        {typeArr.map((item, index) => (
                            <TypeItem
                                key={item.id}
                                currentType={currentType.id === item.id}
                                onClick={() => handleClickType(item)}
                            >
                                {item.name}&nbsp;{typeLength(item.key)}
                            </TypeItem>
                        ))}
                    </TypeWrap>
                </Header>
                <Section id='printJS-form'>
                    {currentType.id === '0' ? (
                        <Package>
                            <Tr>
                                <PreviewWrap>
                                    {volumeStore.volumeVolumeProblemAll['choiceProblems'].map(
                                        (item: any, index: number) => (
                                            <QuestionType
                                                key={item.id}
                                                data={problemType({ ...item, index })}
                                            ></QuestionType>
                                        )
                                    )}
                                </PreviewWrap>
                                <PreviewWrap>
                                    {volumeStore.volumeVolumeProblemAll['checkboxProblems'].map(
                                        (item: any, index: number) => (
                                            <QuestionType
                                                key={item.id}
                                                data={problemType({ ...item, index })}
                                            ></QuestionType>
                                        )
                                    )}
                                </PreviewWrap>
                                <PreviewWrap>
                                    {volumeStore.volumeVolumeProblemAll['judgeProblems'].map((item: any) => (
                                        <QuestionType key={item.id} data={problemType(item)}></QuestionType>
                                    ))}
                                </PreviewWrap>
                                <PreviewWrap>
                                    {volumeStore.volumeVolumeProblemAll['fillingProblems'].map((item: any) => (
                                        <QuestionType key={item.id} data={problemType(item)}></QuestionType>
                                    ))}
                                </PreviewWrap>
                                <PreviewWrap>
                                    {volumeStore.volumeVolumeProblemAll['shortAnswerProblems'].map((item: any) => (
                                        <QuestionType key={item.id} data={problemType(item)}></QuestionType>
                                    ))}
                                </PreviewWrap>
                            </Tr>
                        </Package>
                    ) : (
                        <PreviewWrap>
                            {(volumeStore.volumeVolumeProblemAll as any)[currentType.key].map((item: any) => (
                                <QuestionType key={item.id} data={problemType(item)}></QuestionType>
                            ))}
                        </PreviewWrap>
                    )}
                </Section>
            </Container>
        )
    })
}

export default ProblemList
