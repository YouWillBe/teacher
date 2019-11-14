import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { Value } from 'slate'
import { FaAngleDoubleUp, FaAngleDoubleDown } from 'react-icons/fa'

import Editor from '../EditorX'
import HeaderType from './HeaderType'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
`
const Package = styled.div`
    padding: 20px;
    border: 1px solid rgba(42, 71, 139, 0.2);
    border-radius: 4px;
`

const TopicWrap = styled.div`
    display: flex;
`
const TagWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    opacity: 0.8178;
    margin: 14px 10px 14px 0;
`
const Index = styled.div`
    color: #072979;
    font-size: 20px;
`
const Fraction = styled.div`
    border-top: 1px solid #e2eef4;
    font-size: 12px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`
const Topic = styled.div`
    display: flex;
    align-items: center;
    margin: 14px 0;
    flex: 1;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
`
const OptionWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 60px;
`
const OptionItem = styled.div`
    box-sizing: border-box;
    min-height: 60px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(42, 71, 139, 0.2);
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    border-radius: 4px;
`
const ItemCommon = styled.div`
    height: 1;
    width: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(7, 41, 121, 1);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    border-right: 1px solid #f5f5f5;
`
const ItemIndex = styled(ItemCommon)`
    font-size: 18px;
    background-color: rgba(245, 245, 245, 1);
`
const AnswerItem = styled.div`
    flex: 1;
    box-sizing: border-box;
    min-height: 60px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(42, 71, 139, 0.2);
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    border-radius: 4px;
`
const AnswerWrap = styled.div<{ setMargin: boolean }>`
    display: flex;
    margin-top: 20px;
    & ${AnswerItem}:first-of-type {
        margin-right: ${props => (props.setMargin ? '60px' : '')};
    }
`

const ItemName = styled(ItemCommon)`
    text-align: center;
    font-size: 16px;
`

const AnswerRichText = styled.div`
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(7, 41, 121, 1);
    margin: 0 10px;
`

const RichTextWrap = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 8px 8px 20px;
    font-size: 14px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`

const Expand = styled.div`
    margin-top: 20px;
    text-align: center;
    svg {
        cursor: pointer;
        color: #444;
        font-size: 18px;
    }
`

const AngleDouble = styled.span`
    :hover svg {
        color: #3a93df;
    }
`

const SolutionWrap = styled.div`
    background-color: rgba(216, 216, 216, 0.37);
    border-radius: 4px;
    border: 1px solid rgba(151, 151, 151, 0);
    margin-top: 20px;
`
const Analysis = styled.div`
    box-sizing: border-box;
    border-bottom: 1px solid #dfdfdf;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding: 8px 0px 8px 20px;
`

interface ILoreList {
    id: number
    name: string
}
interface Iprops {
    data: {
        index?: number | 0
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
    onClickSelect?(data: any): void
}

const myMap = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const ChoiceProblem: FC<Iprops> = props => {
    const [currentExpand, setCurrentExpand] = useState(0)
    const [expandArr] = useState([
        {
            name: '展开',
            icon: <FaAngleDoubleDown></FaAngleDoubleDown>,
        },
        {
            name: '收起',
            icon: <FaAngleDoubleUp></FaAngleDoubleUp>,
        },
    ])

    //展开/收起
    const handleClickExpand = () => {
        if (currentExpand === 0) {
            setCurrentExpand(1)
        } else {
            setCurrentExpand(0)
        }
    }

    //选择
    const haneleClickSelect = () => {
        if (props.onClickSelect) {
            props.onClickSelect(props.data)
        }
    }

    return (
        <Container>
            <Package>
                <HeaderType
                    data={{
                        id: props.data.id,
                        type: props.data.type,
                        loreList: props.data.loreList,
                        showEditPick: props.data.showEditPick,
                    }}
                    onClickSelect={haneleClickSelect}
                ></HeaderType>
                <TopicWrap>
                    {(props.data.fraction || props.data.fraction === 0) && (
                        <TagWrap>
                            <Index>{props.data.index! + 1}</Index>
                            <Fraction>{props.data.fraction}</Fraction>
                        </TagWrap>
                    )}
                    <Topic>
                        <Editor value={Value.fromJSON(props.data.topic)} readonly></Editor>
                    </Topic>
                </TopicWrap>
                <OptionWrap>
                    {props.data.option.map((v: { value: Value }, i: number) => (
                        <OptionItem key={i}>
                            <ItemIndex>{myMap[i]}</ItemIndex>
                            <RichTextWrap>
                                <Editor value={Value.fromJSON(v.value)} readonly></Editor>
                            </RichTextWrap>
                        </OptionItem>
                    ))}
                </OptionWrap>
            </Package>
            {currentExpand === 1 ? (
                <>
                    <AnswerWrap setMargin={props.data.studentAnswer}>
                        <AnswerItem>
                            <ItemName>答案</ItemName>
                            <AnswerRichText>{props.data.answer}</AnswerRichText>
                        </AnswerItem>
                        {props.data.studentAnswer && (
                            <AnswerItem>
                                <ItemName>学生作答</ItemName>
                                <AnswerRichText>{props.data.studentAnswer}</AnswerRichText>
                            </AnswerItem>
                        )}
                    </AnswerWrap>
                    <SolutionWrap>
                        <Analysis>解析</Analysis>
                        <RichTextWrap>
                            <Editor value={Value.fromJSON(props.data.solution)} readonly></Editor>
                        </RichTextWrap>
                    </SolutionWrap>
                </>
            ) : null}
            <Expand onClick={handleClickExpand}>
                <AngleDouble title={expandArr[currentExpand].name + '答案&解析'}>
                    {expandArr[currentExpand].icon}
                </AngleDouble>
            </Expand>
        </Container>
    )
}

export default ChoiceProblem
