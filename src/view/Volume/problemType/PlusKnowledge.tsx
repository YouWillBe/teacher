import React, { FC, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { FaPlus } from 'react-icons/fa'

import { IStore } from '../../../store'
import Button from '../../../components/Button'
import PointSelector from '../../../components/PointSelector'

const ButtonWrap = styled.div`
    margin-right: 8px;
    margin-bottom: 6px;
    svg {
        font-size: 14px;
    }
`

interface IPoint {
    id: number
    name: string
}

const PlusKnowledge: FC = props => {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)
    const [isShowKnowledge, setIsShowKnowledge] = useState(false)

    //打开弹窗
    const handleClickKnowledge = () => {
        setIsShowKnowledge(true)
        volumeStore.getLoreList()
    }

    //关闭弹窗
    const handleClickClose = () => {
        setIsShowKnowledge(false)
    }

    const handleSelectPoint = (point: IPoint) => {
        volumeStore.selectPoint(point)
    }

    const optionButton = {
        width: '90px',
        height: '36px',
        bgColor: 'rgba(50,158,245,1)',
        shadow: '0px 2px 4px 0px rgba(50,158,245,0.54)',
    }

    return useObserver(() => {
        return (
            <ButtonWrap>
                <Button options={optionButton} onClick={handleClickKnowledge}>
                    <FaPlus></FaPlus>
                </Button>
                {isShowKnowledge && (
                    <PointSelector
                        selectedPoints={volumeStore.selectedPoints}
                        onClose={handleClickClose}
                        selectPoint={handleSelectPoint}
                        selectedPointsId={volumeStore.selectedPointsId}
                    />
                )}
            </ButtonWrap>
        )
    })
}
export default PlusKnowledge
