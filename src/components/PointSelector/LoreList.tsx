import React, { FC, useEffect, useContext, Fragment } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../store'

const LoreListWrap = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-between;
`
const TagWrap = styled.div`
    width: 180px;
    height: 100%;
    border-right: 1px solid rgba(151, 151, 151, 0.3);
    flex-shrink: 0;
`
const Tag = styled.div<{ checked: boolean }>`
    box-sizing: border-box;
    width: 100%;
    min-height: 56px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 8px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFangSC, sans-serif;
    color: ${props => (props.checked ? 'rgba(58, 147, 223, 1)' : '#666')};
    background-color: ${props => (props.checked ? 'rgba(223, 237, 249, 1)' : '#fff')};
    border-left: 2px solid ${props => (props.checked ? '#3c94df' : '#fff')};
    margin-bottom: 3px;
    cursor: pointer;
    transition: all 0.1s linear;
    :hover {
        background-color: rgba(223, 237, 249, 1);
        color: rgba(58, 147, 223, 1);
    }
`
const Center = styled.div`
    flex-grow: 1;
    padding-left: 6px;
    padding-right: 6px;
`
const Header = styled.div`
    height: 40px;
    border-bottom: 1px solid rgba(151, 151, 151, 0.3);
    font-size: 16px;
    font-family: PingFangSC-Light, PingFangSC, sans-serif;
    font-weight: 300;
    color: #666;
    line-height: 40px;
    text-indent: 6px;
`

const Section = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
`
const Span = styled.span<{ selected: boolean }>`
    display: inline-block;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    font-size: 12px;
    font-family: PingFangSC-Light, PingFangSC, sans-serif;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 0 8px;
    background-color: ${props => (props.selected ? 'rgba(221, 237, 241, 1)' : '#fff')};
    color: ${props => (props.selected ? '#3a93df' : '#666')};
    cursor: pointer;
    border: 1px solid ${props => (props.selected ? 'rgba(58, 147, 223, 1)' : '#ccc')};
    &:hover {
        color: #3a93df;
        background-color: rgba(221, 237, 241, 1);
        border-color: rgba(58, 147, 223, 1);
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
    height: 100%;
    width: 180px;
    flex-shrink: 0;
    border-left: 1px solid rgba(151, 151, 151, 0.3);
    padding-left: 15px;
    padding-right: 15px;
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
const Point = styled.div`
    display: inline-block;
    box-sizing: border-box;
    max-width: 110px;
    height: 36px;
    line-height: 34px;
    text-align: center;
    background-color: rgba(221, 237, 241, 1);
    border-radius: 4px;
    border: 1px solid rgba(58, 147, 223, 1);
    font-size: 12px;
    font-family: PingFangSC, sans-serif;
    font-weight: 300;
    color: rgba(58, 147, 223, 1);
    padding: 0 10px;
    margin-right: 8px;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
`

interface IPoint {
    id: number
    name: string
}

interface IProps {
    selectedPoints: IPoint[]
    isSelected?: boolean
    selectPoint(point: IPoint): void
    selectedPointsId: number[]
}

const PointSelector: FC<IProps> = props => {
    const { pointStore } = useContext<IStore>(MobXProviderContext)
    const handleClickTag = (id: number) => {
        pointStore.getPoints(id)
    }
    useEffect(() => {
        pointStore.getTags()
        // eslint-disable-next-line
    }, [])
    return useObserver(() => (
        <LoreListWrap>
            <TagWrap>
                {pointStore.tagReady
                    ? pointStore.tags.map(item => (
                          <Tag
                              key={item.id}
                              checked={pointStore.currentTag === item.id}
                              onClick={() => handleClickTag(item.id)}
                          >
                              {item.name}
                          </Tag>
                      ))
                    : 'loading'}
            </TagWrap>
            <Center>
                {pointStore.currentPoints.map(item => (
                    <Fragment key={item.id}>
                        <Header>{item.name}</Header>
                        <Section>
                            {item.children ? (
                                item.children.map(t => (
                                    <Span
                                        key={t.id}
                                        onClick={() => props.selectPoint(t)}
                                        selected={props.selectedPointsId.includes(t.id)}
                                    >
                                        {t.name}
                                    </Span>
                                ))
                            ) : (
                                <NoData>暂无知识点</NoData>
                            )}
                        </Section>
                    </Fragment>
                ))}
            </Center>
            {!props.isSelected && (
                <Right>
                    <Added>已添加的知识点</Added>
                    <>
                        {props.selectedPoints.map(item => (
                            <Point key={item.id} onClick={() => props.selectPoint(item)} title={item.name}>
                                {item.name}
                            </Point>
                        ))}
                    </>
                </Right>
            )}
        </LoreListWrap>
    ))
}

export default PointSelector
