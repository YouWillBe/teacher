import React, { useContext, useState } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { FaSave, FaExchangeAlt, FaMinusCircle, FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { IStore } from '../../../store'
import Button from '../../../components/Button'
import Popconfirm from '../../../components/Popconfirm'
import Dialog from '../../../components/Dialog'
import QuestionType from '../../../components/QuestionType'
import PreviewList from './PreviewList'
import Structure from '../structure'
import PreviewVolume from '../preview'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Left = styled.div`
    display: flex;
`
const ButtonWrap = styled.div`
    margin-right: 20px;
`
const ButtonSpan = styled.span`
    margin-left: 8px;
`
const IconWrap = styled.div`
    display: flex;
`
const FontIcon1 = styled.div`
    width: 30px;
    height: 30px;
    box-shadow: 0px 2px 4px 0px rgba(118, 143, 255, 0.14);
    border-radius: 3px;
    text-align: center;
    line-height: 30px;
    margin-right: 8px;
    cursor: pointer;
    position: relative;
    svg {
        color: #ea6565;
    }
`
const FontIcon = styled.div<{ setColor: string }>`
    width: 30px;
    height: 30px;
    box-shadow: 0px 2px 4px 0px rgba(118, 143, 255, 0.14);
    border-radius: 3px;
    text-align: center;
    line-height: 30px;
    margin-right: 8px;
    cursor: pointer;
    svg {
        color: ${props => props.setColor};
    }
`
const PreviewWrap = styled.div`
    margin-top: 20px;
    margin-right: 20px;
`

const Right = styled.div`
    display: flex;
`
interface IProps {
    isShowIcon: boolean
}

function FunctType(props: IProps) {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)
    const [isPreview, setIsPreview] = useState(false)
    const [isDeleteTopic, setIsDeleteTopic] = useState(false)
    const [isShowSelect, setIsShowSelect] = useState(false)
    const [isShowStructure, setIsShowStructure] = useState(false)
    const [isPreviewVolume, setIsPreviewVolume] = useState(false)
    const [answerOption] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])

    //icon功能
    const handleClickIcon = (text: string) => {
        if (text === '替换') {
            volumeStore.getProblemTypeList({
                page: 1,
                limit: 10,
                type: volumeStore.volumeProblem.type,
            })
            setIsShowSelect(true)
        } else if (text === '删除') {
            setIsDeleteTopic(!isDeleteTopic)
        } else if (text === '预览') {
            let type = [1, 2]
            if (type.includes(volumeStore.volumeProblem.type)) {
                let answer: string[] = []
                volumeStore.volumeProblem.option.map((item: any, index: number) => {
                    if (item.statu) {
                        answer.push(answerOption[index])
                    }
                    return item
                })
                volumeStore.volumeProblem.answer = answer.toString()
            }
            setIsPreview(true)
        }
    }
    //关闭预览
    const handlePreview = () => {
        setIsPreview(!isPreview)
    }
    //删除
    const handleConfirm = () => {
        volumeStore.removeVolumeProblem({
            id: volumeStore.volumeProblem.id,
            volumeId: volumeStore.volumeProblem.volumeId,
        })
        setIsDeleteTopic(!isDeleteTopic)
    }

    const handleClose = () => {
        setIsDeleteTopic(false)
    }
    //关闭替换
    const handleIsShowSelect = () => {
        setIsShowSelect(false)
    }

    //修改试卷结构
    const handleClickOutline = () => {
        setIsShowStructure(true)
        volumeStore.getVolumeOutline(volumeStore.volumeDetailList.id)
    }
    const handleClickClose = () => {
        setIsShowStructure(false)
    }

    //预览试卷
    const handleClickPreviewVolume = () => {
        volumeStore.getVolumeProblemState()
        setIsPreviewVolume(!isPreviewVolume)
    }

    //上一题
    const handleClickLast = () => {
        volumeStore.volumeProblem.number = volumeStore.volumeProblem.number - 1
        console.log(volumeStore.volumeProblem.number)
        // let typeArr = ['choiceProblems', 'checkboxProblems', 'judgeProblems', 'fillingProblems', 'shortAnswerProblems']
        // let number = (volumeStore.volumeDetailList as any)[typeArr[volumeStore.volumeProblem.type - 1]][
        //     volumeStore.volumeProblem.number - 1
        // ]
        // sessionStorage.setItem(
        //     'sessionCurrentType',
        //     JSON.stringify({
        //         id: volumeStore.volumeProblem.type,
        //         name: typeArr[volumeStore.volumeProblem.type - 1],
        //         number: number.number - 1,
        //     })
        // )
        // volumeStore.currentType.number = number.number - 1
        // volumeStore.getVolumeProblem(number.id)
        // console.log(
        //     1111,
        //     typeArr[volumeStore.volumeProblem.type - 1],
        //     number,
        //     volumeStore.volumeDetailList,
        //     volumeStore.volumeProblem.number
        // )
    }
    //下一题
    const handleClickNext = () => {
        volumeStore.volumeProblem.number = volumeStore.volumeProblem.number + 1
        console.log(volumeStore.volumeProblem.number)
        // let typeArr = ['choiceProblems', 'checkboxProblems', 'judgeProblems', 'fillingProblems', 'shortAnswerProblems']
        // let number = (volumeStore.volumeDetailList as any)[typeArr[volumeStore.volumeProblem.type - 1]][
        //     volumeStore.volumeProblem.number
        // ]
        // sessionStorage.setItem(
        //     'sessionCurrentType',
        //     JSON.stringify({
        //         id: volumeStore.volumeProblem.type,
        //         name: typeArr[volumeStore.volumeProblem.type - 1],
        //         number: number.number,
        //     })
        // )
        // volumeStore.currentType.number = number.number
        // volumeStore.getVolumeProblem(number.id)
        // console.log(
        //     typeArr[volumeStore.volumeProblem.type - 1],
        //     number,
        //     volumeStore.volumeDetailList,
        //     volumeStore.volumeProblem.number
        // )
    }

    //保存
    const handleClickSave = () => {
        let answer: string[] = []
        let type = [1, 2]
        let type1 = [4, 5]
        let option: any = []
        if (type.includes(volumeStore.volumeProblem.type)) {
            volumeStore.volumeProblem.option.map((item: any, index: number) => {
                if (item.statu) {
                    answer.push(answerOption[index])
                }
                option.push({
                    id: item.id,
                    value: item.value,
                })
                return item
            })
        } else if (volumeStore.volumeProblem.type === 3) {
            answer = [volumeStore.volumeProblem.answer]
        } else if (type1.includes(volumeStore.volumeProblem.type)) {
            answer = [JSON.stringify(volumeStore.volumeProblem.answer)]
        }

        let data = {
            id: volumeStore.volumeProblem.id,
            topic: JSON.stringify(volumeStore.volumeProblem.topic),
            option: JSON.stringify(option),
            answer: answer.toString(),
            solution: JSON.stringify(volumeStore.volumeProblem.solution),
            loreIdList: volumeStore.loreListId,
            type: volumeStore.volumeProblem.type,
            answerCount: volumeStore.volumeProblem.answerCount,
            volumeId: volumeStore.volumeProblem.volumeId,
        }
        volumeStore.updateVolumeProblem(data)
    }

    const buttonOption1 = {
        height: '30px',
        size: '14px',
        weight: '400',
        family: 'PingFangSC-Regular,PingFangSC',
        bgColor: '#144E5E',
        shadow: '0px 4px 11px 0px rgba(20,78,94,0.5)',
    }

    const buttonOption2 = {
        height: '30px',
        size: '14px',
        weight: '400',
        family: 'PingFangSC-Regular,PingFangSC',
        bgColor: '#409EFF',
        shadow: '0px 4px 11px 0px rgba(64,158,255,0.5)',
    }
    const buttonOption3 = {
        height: '30px',
        size: '14px',
        weight: '400',
        family: 'PingFangSC-Regular,PingFangSC',
        color: '#333',
        shadow: '0px 4px 11px 0px rgba(64,158,255,0.1)',
    }

    const optionDialog = {
        width: '80%',
        // marginTop: '5%',
        borderBottom: '1px solid #e5e5e5',
    }

    return useObserver(() => {
        return (
            <>
                <Container>
                    <Left>
                        <ButtonWrap>
                            {props.isShowIcon && (
                                <Button options={buttonOption1} onClick={handleClickPreviewVolume}>
                                    预览试卷
                                </Button>
                            )}
                        </ButtonWrap>
                        <ButtonWrap>
                            {props.isShowIcon && (
                                <Button options={buttonOption2} onClick={handleClickSave}>
                                    <FaSave></FaSave>
                                    <ButtonSpan>保存</ButtonSpan>
                                </Button>
                            )}
                        </ButtonWrap>
                        <ButtonWrap>
                            <Button options={buttonOption3} onClick={handleClickOutline}>
                                修改试卷结构
                            </Button>
                        </ButtonWrap>
                        {props.isShowIcon && (
                            <IconWrap>
                                <FontIcon setColor='#9013fe' title='替换题目' onClick={() => handleClickIcon('替换')}>
                                    <FaExchangeAlt></FaExchangeAlt>
                                </FontIcon>
                                <FontIcon setColor='#3D8EF3' title='预览题目' onClick={() => handleClickIcon('预览')}>
                                    <FaEye></FaEye>
                                </FontIcon>
                                <FontIcon1 title='删除题目' onClick={() => handleClickIcon('删除')}>
                                    <FaMinusCircle></FaMinusCircle>
                                    {isDeleteTopic && (
                                        <Popconfirm confirm={handleConfirm} close={handleClose}></Popconfirm>
                                    )}
                                </FontIcon1>
                            </IconWrap>
                        )}
                    </Left>
                    <Right>
                        <ButtonWrap>
                            <Button title='上一题' onClick={handleClickLast}>
                                <FaChevronLeft></FaChevronLeft>
                            </Button>
                        </ButtonWrap>
                        <ButtonWrap>
                            <Button title='下一题' onClick={handleClickNext}>
                                <FaChevronRight></FaChevronRight>
                            </Button>
                        </ButtonWrap>
                    </Right>
                </Container>
                {isPreview && (
                    <Dialog title='预览' options={optionDialog} onClickClose={handlePreview}>
                        <PreviewWrap>
                            <QuestionType
                                data={{
                                    ...volumeStore.volumeProblem,
                                    index: volumeStore.volumeProblem.number - 1,
                                }}
                            ></QuestionType>
                        </PreviewWrap>
                    </Dialog>
                )}
                {isShowSelect && <PreviewList onClickClose={handleIsShowSelect}></PreviewList>}
                {isShowStructure && <Structure onClickClose={handleClickClose}></Structure>}
                {isPreviewVolume && (
                    <PreviewVolume
                        onClickClose={handleClickPreviewVolume}
                        osClickShowStructure={handleClickOutline}
                    ></PreviewVolume>
                )}
            </>
        )
    })
}

export default FunctType
