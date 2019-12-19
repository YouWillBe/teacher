import React, { FC, useContext, useEffect, useState } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import styled from 'styled-components'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

import { IStore } from '../../../store'
import BackList from './BackList'
import Blank from './Blank'
import Block from './Block'
import Button from '../../../components/Button'

const Container = styled.div`
    width: 1260px;
    height: 100%;
    margin: 0 auto;
    position: relative;
`
const Section = styled.div`
    margin-top: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    height: 200px;
`
const Chevron = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    svg {
        color: #409eff;
        font-size: 40px;
        cursor: pointer;
    }
`
const ChevronLeft = styled(Chevron)`
    left: -70px;
    top: 180px;
`
const ChevronRight = styled(Chevron)`
    right: -70px;
    top: 180px;
`
const Span = styled.span`
    margin-right: 8px;
`
const FooterWrap = styled.div`
    width: 100%;
    height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Template: FC = () => {
    const history = useHistory()
    const { volumeStore } = useContext<IStore>(MobXProviderContext)
    const [currentId, setCurrentId] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        volumeStore.getTemplateList(1)
        // eslint-disable-next-line
    }, [])

    //创建模板
    const handleClickCreateVolumeTemplate = () => {
        volumeStore.createVolumeTemplate()
    }

    //空白模板
    const handleClickBlank = () => {
        sessionStorage.removeItem('sessionCurrentType')
        volumeStore
            .createVolume({
                choiceCount: 0,
                checkboxCount: 0,
                judgeCount: 0,
                fillingCount: 0,
                shortAnswerCount: 0,
                totalScore: 0,
            })
            .then(res => history.push(`/volume/${res}`))
    }

    //总分页数
    const totalPage = () => {
        let total = 0
        let page = 0
        if (volumeStore.templateListPage.page) {
            total = Math.ceil(volumeStore.templateListPage.total / volumeStore.templateListPage.limit)
            page = volumeStore.templateListPage.page
            if (volumeStore.templateListPage.page)
                if (page > 1 && page <= total) {
                    return true
                } else if (volumeStore.templateListPage.page > 1) {
                    return true
                }
        }
    }
    const totalPage1 = () => {
        let total = 0
        let page = 0
        if (volumeStore.templateListPage.page) {
            total = Math.ceil(volumeStore.templateListPage.total / volumeStore.templateListPage.limit)
            page = volumeStore.templateListPage.page + 1
            if (total === page - 1) return 0
        }
        return total
    }

    //上一页
    const handleClickPrevious = () => {
        volumeStore.getTemplateList(volumeStore.templateListPage.page - 1)
    }
    //下一页
    const handleClickNext = () => {
        volumeStore.getTemplateList(volumeStore.templateListPage.page + 1)
    }

    //删除模板
    const handleDeleteVolumeTemplate = (id: number) => {
        volumeStore.deleteVolumeTemplate(id)
    }

    //选择模板
    const handleClickTemplate = (data: any) => {
        setCurrentIndex(data.index)
        if (currentId === data.id) {
            setCurrentId(0)
        } else {
            setCurrentId(data.id)
        }
    }

    //编辑模板
    const handleClickTemplateEdit = (id: number) => {
        volumeStore.getVolumeTemplateDetail(id)
    }

    //下一步
    const handleClickNextSave = () => {
        let data = {
            checkboxCount: volumeStore.templateList[currentIndex].checkboxCount,
            choiceCount: volumeStore.templateList[currentIndex].choiceCount,
            fillingCount: volumeStore.templateList[currentIndex].fillingCount,
            id: volumeStore.templateList[currentIndex].id,
            judgeCount: volumeStore.templateList[currentIndex].judgeCount,
            shortAnswerCount: volumeStore.templateList[currentIndex].shortAnswerCount,
            totalScore: volumeStore.templateList[currentIndex].totalScore,
        }
        sessionStorage.removeItem('sessionCurrentType')
        volumeStore.createVolume(data).then(res => history.push(`/volume/${res}`))
    }

    return useObserver(() => {
        return (
            <Container>
                <BackList onClickCreateVolumeTemplate={handleClickCreateVolumeTemplate} />
                {totalPage() && (
                    <ChevronLeft onClick={handleClickPrevious}>
                        <FaChevronLeft title='上一页' />
                    </ChevronLeft>
                )}
                <Section>
                    <Blank onClickBlank={handleClickBlank} />
                    {volumeStore.templateList.slice(0, 3).map((item, index) => (
                        <Block
                            key={item.id}
                            data={{ ...item, index, currentId }}
                            deleteVolumeTemplate={handleDeleteVolumeTemplate}
                            onClickTemplate={handleClickTemplate}
                            onClickTemplateEdit={handleClickTemplateEdit}
                        />
                    ))}
                </Section>
                {totalPage1() > 1 && (
                    <ChevronRight onClick={handleClickNext}>
                        <FaChevronRight title='下一页' />
                    </ChevronRight>
                )}
                {currentId !== 0 && (
                    <FooterWrap>
                        <Button onClick={handleClickNextSave}>
                            <Span>下一步</Span>
                            <FaChevronRight title='下一步' />
                        </Button>
                    </FooterWrap>
                )}
            </Container>
        )
    })
}

export default Template
