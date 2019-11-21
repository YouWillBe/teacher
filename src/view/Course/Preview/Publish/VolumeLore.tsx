import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { take } from 'ramda'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../../store'

const Container = styled.div<{ currentStyle: boolean }>`
    height: 210px;
    width: 210px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 13px 1px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border-color 0.1s linear;
    border-color: ${props => (props.currentStyle ? '#3a93df' : '')};
    &:hover {
        border-color: #3a93df;
        box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    }
    box-sizing: border-box;
    padding: 10px;
    margin-bottom: 20px;
    user-select: none;
    position: relative;
`
const Title = styled.div`
    height: 50px;
    line-height: 50px;
    font-weight: 700;
    color: #555;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
`
const LoreTitle = styled.div`
    width: 100%;
    position: relative;
    height: 20px;
    margin-bottom: 12px;
`
const LoreTitleText = styled.div`
    width: 80px;
    position: absolute;
    z-index: 2;
    background-color: #fff;
    text-align: center;
    left: 50%;
    margin-left: -40px;
    font-size: 12px;
    color: #777;
    line-height: 20px;
`
const Line = styled.div`
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: #ccc;
    top: 11px;
    z-index: 1;
`
const LoreWrap = styled.div`
    flex-grow: 1;
    width: 100%;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`
const Lore = styled.div`
    padding: 8px;
    height: 35px;
    width: 100%;
    text-align: center;
    border: 1px solid rgba(58, 147, 223, 1);
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 12px;
    background-color: rgba(221, 237, 241, 1);
    color: #3a93df;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const VolumeLore: FC = () => {
    const { coursePreviewStore } = useContext<IStore>(MobXProviderContext)
    const handleClickVolumeLore = (id: number) => {
        coursePreviewStore.bindingPreview(coursePreviewStore.courseId, id)
    }
    return useObserver(() => {
        return (
            <>
                {coursePreviewStore.volumeLore.slice(0, 2).map(item => (
                    <Container
                        key={item.id}
                        currentStyle={item.id === coursePreviewStore.preview!.useVolumeId}
                        onClick={() => handleClickVolumeLore(item.id)}
                    >
                        <Title title={item.name}>{item.name}</Title>
                        <LoreTitle>
                            <LoreTitleText>知识点</LoreTitleText>
                            <Line />
                        </LoreTitle>
                        <LoreWrap>
                            {take(2, item.loreList).map((v, i) => (
                                <Lore key={i} title={v.name}>
                                    {v.name}
                                </Lore>
                            ))}
                        </LoreWrap>
                    </Container>
                ))}
            </>
        )
    })
}

export default VolumeLore
