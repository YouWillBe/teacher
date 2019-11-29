import React, { FC, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { FaStopCircle, FaEye } from 'react-icons/fa'

import { IStore } from '../../../../store'
import Finished from '../../DetailCommon/Finished'
import Student from '../../DetailCommon/Student'
import Button from '../../../../components/Button'
import Dialog from '../../../../components/Dialog'

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 258px;
    grid-column-gap: 30px;
    margin-top: 20px;
`
const Left = styled.div``
const Right = styled.div``

const Header = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 90px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 10px;
    opacity: 0.8178;
    border: 3px solid rgba(255, 255, 255, 1);
`
const Leisure = styled.div`
    height: 90px;
    border-bottom: 1px solid #979797;
    opacity: 0.3;
`

const TypeName = styled.span`
    display: inline-block;
    height: 90px;
    line-height: 90px;
    font-size: 16px;
    font-family: PingFangSC, sans-serif;
    font-weight: 500;
    color: rgba(20, 78, 94, 1);
    margin-left: 20px;
`
const Vertical = styled.span`
    display: inline-block;
    height: 90px;
    line-height: 90px;
    width: 50px;
    text-align: center;
`
const TestName = styled.span`
    display: inline-block;
    height: 90px;
    line-height: 90px;
    font-size: 18px;
    font-family: PingFangSC, sans-serif;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
`

const SituationWrap = styled.div`
    display: flex;
    width: 338px;
    justify-content: space-between;
    padding: 30px 0;
`

const FunctWrap = styled.div`
    width: 100%;
    display: block;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    button:first-of-type {
        margin-bottom: 20px;
    }
`
const ButtonWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const ButtonText = styled.span`
    margin-right: 8px;
`
const ButtonWrap1 = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
`

const Detail: FC = () => {
    const { courseClassTestStore } = useContext<IStore>(MobXProviderContext)
    const [isSshowOver, setIsSshowOver] = useState(false)

    //结束
    const handleClickTestOver = () => {
        setIsSshowOver(!isSshowOver)
    }
    //结束
    const handleClickTestOver1 = () => {
        setIsSshowOver(false)
        courseClassTestStore.testOver(courseClassTestStore.classTest!.id)
    }

    //查看试卷
    const handleClickSee = () => {
        sessionStorage.removeItem('sessionCurrentType')
        navigate(`classTest/analysis/${courseClassTestStore.classTest!.id}`)
    }

    const optionButton = {
        border: '1px solid #d9d9d9',
        bgColor: '#fff',
        shadow: '0px 2px 4px 0px rgba(31,122,171,0.2)',
        color: 'rgba(0,0,0,0.65)',
        HbgColor: '#fff',
        HColor: '#3a93df',
        HBorder: '1px solid #3a93df',
    }
    const optionDialog = {
        width: '20%',
    }

    return useObserver(() => {
        return (
            <Container>
                <Left>
                    <Header>
                        <TypeName>随堂测</TypeName>
                        <Vertical>|</Vertical>
                        <TestName>{courseClassTestStore.classTest!.name}</TestName>
                    </Header>
                    <SituationWrap>
                        <Finished text='已交' people={courseClassTestStore.doClassTestInfo!.finished} />
                        <Finished text='未交' people={courseClassTestStore.doClassTestInfo!.Unfiltered} />
                    </SituationWrap>
                    <Student data={courseClassTestStore.doClassTestInfo!.testDTOS} />
                </Left>
                <Right>
                    <Leisure />
                    <FunctWrap>
                        <Button onClick={handleClickTestOver}>
                            <ButtonWrap>
                                <ButtonText>收卷</ButtonText>
                                <FaStopCircle />
                            </ButtonWrap>
                        </Button>
                        <Button onClick={handleClickSee}>
                            <ButtonWrap>
                                <ButtonText>查看试卷</ButtonText>
                                <FaEye />
                            </ButtonWrap>
                        </Button>
                    </FunctWrap>
                </Right>
                {isSshowOver && (
                    <Dialog title='收卷' options={optionDialog} onClickClose={handleClickTestOver}>
                        <ButtonWrap1>
                            <Button onClick={handleClickTestOver1}>确定</Button>
                            <Button options={optionButton} onClick={handleClickTestOver}>
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
