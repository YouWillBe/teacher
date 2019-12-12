import React, { FC, useContext, useState } from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import styled from '@emotion/styled'

import { IStore } from '../../../store'
import Block from '../templet/Block'
import Button from '../../../components/Button'
import PointSelector from '../../../components/PointSelector'
import Knowledge from '../../../components/Knowledge'

const Container = styled.div`
    width: 1260px;
    margin: 20px auto 0;
`
const Wrap = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 340px;
    grid-gap: 20px;
`
const Left = styled.div`
    box-sizing: border-box;
    padding: 20px;
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 4px;
`
const ButtonWrap = styled.div`
    margin-bottom: 20px;
`
const PointsWrap = styled.ul`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid rgba(217, 217, 217, 1);
`
const PointsItem = styled.li``

const NoData = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Right = styled.div`
    box-sizing: border-box;
    padding: 20px;
    height: 312px;
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 4px;
`
const FooterWrap = styled.div`
    width: 100%;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
`

interface IPoint {
    id: number
    name: string
}

const Automatic: FC<RouteComponentProps> = () => {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)
    const [isShowKnowledge, setIsShowKnowledge] = useState(false)
    const [currentId, setCurrentId] = useState(0)

    //打开弹窗
    const handleClickKnowledge = () => {
        setIsShowKnowledge(true)
        volumeStore.getLoreList()
    }

    //关闭弹窗
    const handleClickClose = () => {
        setIsShowKnowledge(false)
    }

    //知识点
    const handleSelectPoint = (point: IPoint) => {
        volumeStore.selectAutoPoint(point)
    }

    //删除模板
    const handleDeleteVolumeTemplate = (id: number) => {
        volumeStore.deleteVolumeTemplate(id)
    }

    //选择模板
    const hanleClickTemplet = (data: any) => {
        if (currentId === data.id) {
            setCurrentId(0)
        } else {
            setCurrentId(data.id)
        }
    }

    //编辑模板
    const handleClickTempletEdit = (id: number) => {
        volumeStore.getVolumeTemplateDetail(id)
    }

    //
    const handleClickLine = () => {
        navigate('/volume/templet', { state: { status: 'auto' } })
    }

    //生成试卷
    const handleClickAutoVolume = () => {
        let data = {
            volumesTemplate: {
                id: volumeStore.templateObject.id,
                choiceCount: volumeStore.templateObject.choiceCount,
                checkboxCount: volumeStore.templateObject.checkboxCount,
                judgeCount: volumeStore.templateObject.judgeCount,
                fillingCount: volumeStore.templateObject.fillingCount,
                shortAnswerCount: volumeStore.templateObject.shortAnswerCount,
                totalScore: volumeStore.templateObject.totalScore,
            },
            loreIdList: volumeStore.selectedAutoPointsId,
        }
        sessionStorage.removeItem('sessionCurrentType')
        volumeStore.createAutomaticVolume(data)
    }

    const optionButton = {
        height: '32px',
        bgColor: '#409EFF',
    }

    const optionButton1 = {
        bgColor: '#015691',
        HbgColor: '#186194',
    }

    return useObserver(() => {
        return (
            <Container>
                <Wrap>
                    <Left>
                        {volumeStore.selectedAutoPoints.length ? (
                            <>
                                <ButtonWrap>
                                    <Button options={optionButton} onClick={handleClickKnowledge}>
                                        选择知识点
                                    </Button>
                                </ButtonWrap>
                                <PointsWrap>
                                    {volumeStore.selectedAutoPoints.map(item => (
                                        <PointsItem key={item.id}>
                                            <Knowledge
                                                data={item}
                                                closable
                                                onClickDeleted={handleSelectPoint}
                                            ></Knowledge>
                                        </PointsItem>
                                    ))}
                                </PointsWrap>
                            </>
                        ) : (
                            <NoData>
                                <Button options={optionButton} onClick={handleClickKnowledge}>
                                    选择知识点
                                </Button>
                            </NoData>
                        )}
                    </Left>
                    <Right>
                        {volumeStore.templateObject.id ? (
                            <>
                                <ButtonWrap>
                                    <Button options={optionButton} onClick={handleClickLine}>
                                        选择模板
                                    </Button>
                                </ButtonWrap>
                                <Block
                                    data={{ ...volumeStore.templateObject, index: 0, currentId }}
                                    deleteVolumeTemplate={handleDeleteVolumeTemplate}
                                    onClickTemplet={hanleClickTemplet}
                                    onClickTempletEdit={handleClickTempletEdit}
                                ></Block>
                            </>
                        ) : (
                            <NoData>
                                <Button options={optionButton} onClick={handleClickLine}>
                                    选择模板
                                </Button>
                            </NoData>
                        )}
                    </Right>
                </Wrap>
                {volumeStore.templateObject.id && volumeStore.selectedAutoPoints.length ? (
                    <FooterWrap>
                        <Button options={optionButton1} onClick={handleClickAutoVolume}>
                            生成试卷
                        </Button>
                    </FooterWrap>
                ) : null}
                {isShowKnowledge && (
                    <PointSelector
                        selectedPoints={volumeStore.selectedAutoPoints}
                        onClose={handleClickClose}
                        selectPoint={handleSelectPoint}
                        selectedPointsId={volumeStore.selectedAutoPointsId}
                    />
                )}
            </Container>
        )
    })
}

export default Automatic
