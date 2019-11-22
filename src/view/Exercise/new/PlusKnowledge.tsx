import React, { FC, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { FaPlus, FaArrowDown, FaArrowUp, FaMinusCircle } from 'react-icons/fa'

import { IStore } from '../../../store'
import Button from '../../../components/Button'
import Dialog from '../../../components/Dialog'
import Knowledge from '../../../components/Knowledge'

const ButtonWrap = styled.div`
    margin-right: 8px;
    margin-bottom: 6px;
    svg {
        font-size: 14px;
    }
`

const LoreListWrap = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 156px 1fr 200px;
    grid-column-gap: 20px;
    margin-top: 20px;
`

const Left = styled.div`
    width: 100%;
    height: 100%;
    border-right: 1px solid rgba(151, 151, 151, 0.3);
`

const LoreListName = styled.div<{ isLoreListId: boolean }>`
    box-sizing: border-box;
    width: 100%;
    min-height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFangSC, sans-serif;
    font-weight: 400;
    color: ${props => (props.isLoreListId ? 'rgba(58, 147, 223, 1)' : '')};
    background-color: ${props => (props.isLoreListId ? 'rgba(223, 237, 249, 1)' : '')};
    border-right: ${props => (props.isLoreListId ? '2px solid #3c94df' : '')};
    margin-bottom: 8px;
    cursor: pointer;
    :hover {
        background-color: rgba(223, 237, 249, 1);
        color: rgba(58, 147, 223, 1);
    }
`

const Center = styled.div``

const LoreWrap = styled.div``
const Header = styled.div`
    height: 40px;
    border-bottom: 2px solid rgba(58, 147, 223, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
        color: #ccc;
        cursor: pointer;
    }
`

const Name = styled.span`
    font-size: 16px;
    font-family: PingFangSC-Light, PingFangSC, sans-serif;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`
const FontWrap = styled.div``
const Section = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
`
const Span = styled.span<{ setStyle: boolean }>`
    display: inline-block;
    height: 36px;
    line-height: 36px;
    box-shadow: 0 3px 6px 0 rgba(162, 185, 240, 0.19);
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Light, PingFangSC, sans-serif;
    font-weight: 300;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 0 8px;
    background-color: ${props => (props.setStyle ? 'rgba(58, 147, 223, 1)' : '')};
    color: ${props => (props.setStyle ? '#fff' : 'rgba(58, 147, 223, 1)')};
    cursor: pointer;
    :hover {
        color: #fff;
        background-color: rgba(58, 147, 223, 1);
    }
`
const NoData = styled.div`
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFangSC, sans-serif;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
`

const Right = styled.div`
    padding: 0 10px;
    border-left: 1px solid #ccc;
`
const Added = styled.div`
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC, sans-serif;
    font-weight: 500;
    color: rgba(58, 147, 223, 1);
    padding: 0 10px;
    text-align: center;
    margin-bottom: 10px;
`

const LoreList = styled.ul``
const LoreItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const FontWrap1 = styled.div`
    svg {
        color: #eb5454;
        font-size: 20px;
        cursor: pointer;
    }
`

const PlusKnowledge: FC = () => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)
    const [isShowKnowledge, setIsShowKnowledge] = useState(false)
    const [setFont] = useState([
        {
            id: 1,
            icon: <FaArrowDown />,
            title: '收起',
        },
        {
            id: 2,
            icon: <FaArrowUp />,
            title: '展开',
        },
    ])

    //打开弹窗
    const handleClickKnowledge = () => {
        setIsShowKnowledge(true)
        exerciseStore.getLoreList()
    }

    //关闭弹窗
    const handleClickClose = () => {
        setIsShowKnowledge(false)
    }

    //侧边导航
    const handleClickLoreListName = (id: number) => {
        exerciseStore.loreList.checkedId = id
        exerciseStore.getLoreList({
            id: id,
        })
    }

    // 展开/收起
    const handleClickShow = (index: number) => {
        exerciseStore.loreList.lore[index].expanded = !exerciseStore.loreList.lore[index].expanded
    }

    //知识点添加
    const handleClickLoreItem = (data: { id: number; name: string }) => {
        if (exerciseStore.loreListId.includes(data.id)) {
            return
        }
        exerciseStore.problemData.loreList = [...exerciseStore.problemData.loreList, data]
        exerciseStore.loreListId = [...exerciseStore.loreListId, data.id]
    }

    //知识点删除
    const handleClickDeletLore = (index: number) => {
        exerciseStore.problemData.loreList.splice(index, 1)
        exerciseStore.loreListId.splice(index, 1)
    }

    const plusOption = {
        width: '90px',
        height: '36px',
        bgColor: 'rgba(50,158,245,1)',
        shadow: '0px 2px 4px 0px rgba(50,158,245,0.54)',
        radius: '4px',
    }
    const optionDialog = {
        width: '80%',
        // marginTop: '5%',
        borderBottom: '1px solid #e5e5e5',
    }

    return useObserver(() => {
        return (
            <ButtonWrap>
                <Button title='添加知识点' options={plusOption} onClick={handleClickKnowledge}>
                    <FaPlus />
                </Button>
                {isShowKnowledge && (
                    <Dialog title='添加知识点' options={optionDialog} onClickClose={handleClickClose}>
                        <LoreListWrap>
                            <Left>
                                {exerciseStore.loreList.loreList.map(item => (
                                    <LoreListName
                                        key={item.id}
                                        isLoreListId={exerciseStore.loreList.checkedId === item.id}
                                        onClick={() => handleClickLoreListName(item.id)}
                                    >
                                        {item.name}
                                    </LoreListName>
                                ))}
                            </Left>
                            <Center>
                                {exerciseStore.loreList.lore.map((item, index) => (
                                    <LoreWrap key={item.id}>
                                        <Header>
                                            <Name>{item.name}</Name>
                                            <FontWrap
                                                onClick={() => handleClickShow(index)}
                                                title={setFont[item.expanded ? 0 : 1].title}
                                            >
                                                {setFont[item.expanded ? 0 : 1].icon}
                                            </FontWrap>
                                        </Header>
                                        {item.expanded && (
                                            <Section>
                                                {item.children ? (
                                                    item.children.map(t => (
                                                        <Span
                                                            key={t.id}
                                                            onClick={() => handleClickLoreItem(t)}
                                                            setStyle={exerciseStore.loreListId.includes(t.id)}
                                                        >
                                                            {t.name}
                                                        </Span>
                                                    ))
                                                ) : (
                                                    <NoData>暂无知识点</NoData>
                                                )}
                                            </Section>
                                        )}
                                    </LoreWrap>
                                ))}
                            </Center>
                            <Right>
                                <Added>已添加的知识点</Added>
                                <LoreList>
                                    {exerciseStore.problemData.loreList.map((item, index) => (
                                        <LoreItem key={item.id}>
                                            <Knowledge key={item.id} data={{ ...item, index }} />
                                            <FontWrap1 onClick={() => handleClickDeletLore(index)} title='删除知识点'>
                                                <FaMinusCircle />
                                            </FontWrap1>
                                        </LoreItem>
                                    ))}
                                </LoreList>
                            </Right>
                        </LoreListWrap>
                    </Dialog>
                )}
            </ButtonWrap>
        )
    })
}
export default PlusKnowledge
