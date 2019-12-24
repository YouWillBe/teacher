import React, { FC, useEffect, useContext, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import styled from '@emotion/styled'

import { IStore } from '../../../store'
import Block from '../templet/Block'
import Button from '../../../components/Button'
import LoreList from '../../../components/PointSelector/LoreList'
import Knowledge from '../../../components/Knowledge'
import noEntry from '../../../images/noEntry.png'

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
const LoreListWrap = styled.div`
    padding-right: 10px;
    border: 1px solid rgba(217, 217, 217, 1);
    border-radius: 4px;
`
const LoreListWrap1 = styled.div`
    max-height: 480px;
    overflow-y: auto;
    &::-webkit-scrollbar-button {
        background-color: #fff;
    }
    &::-webkit-scrollbar {
        background-color: #fff;
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(66, 88, 99, 0.4);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #ddd;
    }
`
const Title = styled.div`
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 20px;
`
const PointsWrap = styled.ul`
    box-sizing: border-box;
    width: 100%;
    min-height: 180px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid rgba(217, 217, 217, 1);
`
const PointsItem = styled.li``

const NoData = styled.div`
    position: relative;
    box-sizing: border-box;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(${noEntry}) no-repeat center;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    margin-bottom: 20px;
`
const NoLoreText = styled.div`
    position: absolute;
    right: 220px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
`
const Right = styled.div`
    box-sizing: border-box;
    padding: 20px;
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 4px;
`
const BlockWrap = styled.div`
    margin-bottom: 20px;
`
const NoVolume = styled.div`
    display: flex;
    box-sizing: border-box;
    height: 100%;
`
const VolumeImg = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: url(${noEntry}) no-repeat center;
`

const NoVolumeText = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
`
const FooterWrap = styled.div`
    width: 100%;
    margin-top: 20px;
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
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        volumeStore.getTemplateList(1)
        // eslint-disable-next-line
    }, [])

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
            volumeStore.templateObject = data
            setCurrentId(data.id)
        }
    }

    //编辑模板
    const handleClickTempletEdit = (id: number) => {
        volumeStore.getVolumeTemplateDetail(id)
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

    const optionButton1 = {
        bgColor: '#015691',
        HbgColor: '#186194',
    }

    return useObserver(() => {
        return (
            <Container>
                <Wrap>
                    <Left>
                        <Title>选择知识点范围</Title>
                        {volumeStore.selectedAutoPoints.length ? (
                            <>
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
                                <NoLoreText>点击下面添加知识点</NoLoreText>
                            </NoData>
                        )}
                        <LoreListWrap>
                            <LoreListWrap1>
                                <LoreList
                                    isSelected={true}
                                    selectedPoints={volumeStore.selectedAutoPoints}
                                    selectPoint={handleSelectPoint}
                                    selectedPointsId={volumeStore.selectedAutoPointsId}
                                ></LoreList>
                            </LoreListWrap1>
                        </LoreListWrap>
                    </Left>
                    <Right>
                        <Title>选择试卷模板</Title>
                        {volumeStore.templateList.length ? (
                            volumeStore.templateList.slice(0, 3).map((item, index) => (
                                <BlockWrap key={item.id}>
                                    <Block
                                        isSaveNext={true}
                                        data={{ ...item, index, currentId: volumeStore.templateObject.id }}
                                        deleteVolumeTemplate={handleDeleteVolumeTemplate}
                                        onClickTemplet={hanleClickTemplet}
                                        onClickTempletEdit={handleClickTempletEdit}
                                    ></Block>
                                </BlockWrap>
                            ))
                        ) : (
                            <NoVolume>
                                <VolumeImg></VolumeImg>
                                <NoVolumeText>点击下面添加知识点</NoVolumeText>
                            </NoVolume>
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
            </Container>
        )
    })
}

export default Automatic
