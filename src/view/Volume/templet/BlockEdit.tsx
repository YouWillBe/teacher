import React, { useContext, useState, ChangeEventHandler, KeyboardEventHandler } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { FaPen, FaSave } from 'react-icons/fa'

import { IStore } from '../../../store'
import BlockEditSection from './BlockEditSection'
import Button from '../../../components/Button'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 20px;
`

const Header = styled.div`
    display: flex;
    position: relative;
`
const NameWrap = styled.div`
    display: flex;
    margin-bottom: 30px;
`

const Input = styled.input`
    padding: 0 8px;
    border: 1px solid #979797;
    border-radius: 4px;
    outline: none;
`
const Name = styled.span`
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
`
const FontWrap = styled.div`
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    margin-left: 20px;
    background-color: #409eff;
    border-radius: 50%;
    cursor: pointer;
    svg {
        font-size: 14px;
        color: #fff;
    }
`

const FunctWrap = styled.div`
    position: absolute;
    right: 0px;
    top: 56px;
`
const ButtonWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
`

interface IProps {
    isSaveNext?: boolean
    onClickClose(): void
}

let currentTotalScore = 0

function BlockEdit(props: IProps) {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)
    const [isEdit, setIsEdit] = useState(false)

    //编辑
    const handleClickEdit = () => {
        setIsEdit(!isEdit)
    }
    //修改标题
    const handleChangeEdit: ChangeEventHandler<HTMLInputElement> = event => {
        volumeStore.templateDetail.name = event.target.value
    }
    const handleKeyDownEdit: KeyboardEventHandler = event => {
        if (event.which === 13) {
            setIsEdit(!isEdit)
        }
    }

    //保存/保存下一步
    const handleClickClose = (text: string) => {
        let data = {
            id: volumeStore.templateDetail.objectiveProblems[0].volumesTemplateId,
            name: volumeStore.templateDetail.name,
            choiceCount: volumeStore.templateDetail.objectiveProblems[0].problemCount,
            checkboxCount: volumeStore.templateDetail.objectiveProblems[1].problemCount,
            judgeCount: volumeStore.templateDetail.objectiveProblems[2].problemCount,
            fillingCount: volumeStore.templateDetail.fillingProblems.length,
            shortAnswerCount: volumeStore.templateDetail.shortAnswerProblems.length,
            totalScore: currentTotalScore,
            deleteListId: volumeStore.deleteListId,
            fillingProblems: volumeStore.templateDetail.fillingProblems,
            shortAnswerProblems: volumeStore.templateDetail.shortAnswerProblems,
            objectiveProblems: volumeStore.templateDetail.objectiveProblems,
        }
        volumeStore.updateVolumeTemplate(data, text)
        props.onClickClose()
    }

    //总分/总题数
    const totalScore = () => {
        let choiceTotal = 0
        let choiceTotalNumber = 0
        let checkboxTotal = 0
        let checkboxTotalNumber = 0
        let judgeTotal = 0
        let judgeTotalNumber = 0
        let fillingTotal = 0
        let fillingTotalNumber = 0
        let shortAnswerTotal = 0
        let shortAnswerTotalNumber = 0
        if (volumeStore.templateDetail.objectiveProblems.length) {
            let data = volumeStore.templateDetail.objectiveProblems
            choiceTotal = data[0].problemCount * data[0].problemScore
            checkboxTotal = data[1].problemCount * data[1].problemScore
            judgeTotal = data[2].problemCount * data[2].problemScore
            choiceTotalNumber = data[0].problemCount
            checkboxTotalNumber = data[1].problemCount
            judgeTotalNumber = data[2].problemCount
        }
        if (volumeStore.templateDetail.fillingProblems.length) {
            fillingTotalNumber = volumeStore.templateDetail.shortAnswerProblems.length
            fillingTotal = volumeStore.templateDetail.fillingProblems.reduce(
                (total, num) => total + num.problemScore,
                0
            )
        }
        if (volumeStore.templateDetail.shortAnswerProblems.length) {
            shortAnswerTotalNumber = volumeStore.templateDetail.shortAnswerProblems.length
            shortAnswerTotal = volumeStore.templateDetail.shortAnswerProblems.reduce(
                (total, num) => total + num.problemScore,
                0
            )
        }
        currentTotalScore = choiceTotal + checkboxTotal + judgeTotal + fillingTotal + shortAnswerTotal
        return {
            totalScore: choiceTotal + checkboxTotal + judgeTotal + fillingTotal + shortAnswerTotal,
            totalNumber:
                choiceTotalNumber +
                checkboxTotalNumber +
                judgeTotalNumber +
                fillingTotalNumber +
                shortAnswerTotalNumber,
        }
    }

    return useObserver(() => {
        return (
            <Container>
                <Header>
                    <NameWrap>
                        {isEdit ? (
                            <>
                                <Input
                                    type='text'
                                    value={volumeStore.templateDetail.name}
                                    onKeyDown={handleKeyDownEdit}
                                    onChange={handleChangeEdit}
                                />
                                <FontWrap title='保存' onClick={handleClickEdit}>
                                    <FaSave></FaSave>
                                </FontWrap>
                            </>
                        ) : (
                            <>
                                <Name>{volumeStore.templateDetail.name}</Name>
                                <FontWrap title='点击修改标题' onClick={handleClickEdit}>
                                    <FaPen></FaPen>
                                </FontWrap>
                            </>
                        )}
                    </NameWrap>
                    <FunctWrap>
                        <ButtonWrap>
                            <Button onClick={() => handleClickClose('保存')}>
                                <FaSave></FaSave>保存
                            </Button>
                        </ButtonWrap>
                        {!props.isSaveNext && (
                            <ButtonWrap>
                                <Button onClick={() => handleClickClose('保存并下一步')}>
                                    <FaSave></FaSave>保存并下一步
                                </Button>
                            </ButtonWrap>
                        )}
                    </FunctWrap>
                </Header>
                <BlockEditSection totalScore={totalScore}></BlockEditSection>
            </Container>
        )
    })
}

export default BlockEdit
