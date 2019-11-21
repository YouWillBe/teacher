import React, { FC, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { FaStopCircle, FaEye } from 'react-icons/fa'

import { IStore } from '../../../../store'
import Finished from '../../DetailCommon/Finished'
import Student from './Student'
import Button from '../../../../components/Button'
import Dialog from '../../../../components/Dialog'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-left: 60px;
`
const SituationWrap = styled.div`
    display: flex;
    width: 338px;
    justify-content: space-between;
    padding: 34px 0;
`
const StudentWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 258px;
`
const FunctWrap = styled.div``
const ButtonWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const ButtonText = styled.span``
const ButtonWrap1 = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
`

const Detail: FC = props => {
    const { courseExaminationStore } = useContext<IStore>(MobXProviderContext)
    const [isSshowOver, setIsSshowOver] = useState(false)

    //结束
    const handleClickTestOver = () => {
        setIsSshowOver(!isSshowOver)
    }
    //结束
    const handleClickTestOver1 = () => {
        setIsSshowOver(false)
        courseExaminationStore.testOver(courseExaminationStore.examination!.id)
    }

    //查看试卷
    const handleClickSee = () => {
        navigate(`examination/analysis/${courseExaminationStore.examination!.id}`)
    }

    const stopButton = {
        width: '180px',
        height: '50px',
        size: '18px',
        family: 'PingFangSC-Regular',
        weight: '400',
        bgColor: '#084DD0',
        shadow: '0px 2px 4px 0px rgba(31,122,171,0.2)',
        radius: '10px',
        border: '3px solid rgba(255,255,255,1)',
        HbgColor: '#285cbf',
    }
    const seeButton = {
        width: '180px',
        height: '50px',
        size: '18px',
        family: 'PingFangSC-Regular',
        weight: '400',
        bgColor: '#248BCB',
        shadow: '0px 2px 4px 0px rgba(31,122,171,0.2)',
        radius: '10px',
        border: '3px solid rgba(255,255,255,1)',
        HbgColor: '#2681b9',
    }
    const dialogButton = {
        height: '50px',
        size: '18px',
        family: 'PingFangSC-Regular',
        weight: '400',
        bgColor: '#248BCB',
        shadow: '0px 2px 4px 0px rgba(31,122,171,0.2)',
        radius: '10px',
        border: '3px solid rgba(255,255,255,1)',
        HbgColor: '#2681b9',
    }
    const dialogButton1 = {
        height: '50px',
        size: '18px',
        family: 'PingFangSC-Regular',
        weight: '400',
        bgColor: '#248BCB',
        shadow: '0px 2px 4px 0px rgba(31,122,171,0.2)',
        radius: '10px',
        border: '3px solid rgba(255,255,255,1)',
        HbgColor: '#2681b9',
    }
    const optionDialog = {
        width: '20%',
        // marginTop: '160px ',
        borderBottom: ' 1px solid rgba(151, 151, 151, 0.26)',
    }

    return useObserver(() => {
        return (
            <Container>
                <SituationWrap>
                    <Finished text='已交' people={courseExaminationStore.doExaminationInfo!.finished} />
                    <Finished text='未交' people={courseExaminationStore.doExaminationInfo!.Unfiltered} />
                </SituationWrap>
                <StudentWrap>
                    <Student />
                    <FunctWrap>
                        <Button options={stopButton} onClick={handleClickTestOver}>
                            <ButtonWrap>
                                <ButtonText>收卷</ButtonText>
                                <FaStopCircle></FaStopCircle>
                            </ButtonWrap>
                        </Button>
                        &nbsp;
                        <Button options={seeButton} onClick={handleClickSee}>
                            <ButtonWrap>
                                <ButtonText>查看试卷</ButtonText>
                                <FaEye></FaEye>
                            </ButtonWrap>
                        </Button>
                    </FunctWrap>
                </StudentWrap>
                {isSshowOver && (
                    <Dialog title='收卷' options={optionDialog} onClickClose={handleClickTestOver}>
                        <ButtonWrap1>
                            <Button options={dialogButton} onClick={handleClickTestOver1}>
                                确定
                            </Button>
                            <Button options={dialogButton1} onClick={handleClickTestOver}>
                                取消
                            </Button>
                        </ButtonWrap1>
                    </Dialog>
                )}
            </Container>
        )
    })
}

export default Detail
