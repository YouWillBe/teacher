import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../store'
import Dialog from '../../../components/Dialog'
import Button from '../../../components/Button'
import ProblemList from './ProblemList'

const NoData = styled.div`
    display: flex;
    height: 300px;
    align-items: center;
    justify-content: center;
`

interface IProps {
    onClickClose(): void
    osClickShowStructure(): void
}

function Preview(props: IProps) {
    const { volumeStore } = useContext<IStore>(MobXProviderContext)

    //弹窗
    const handleClickShowStructure = () => {
        props.onClickClose()
        props.osClickShowStructure()
    }

    return useObserver(() => {
        return (
            <Dialog
                title={volumeStore.volumeProblemState ? '预览试卷' : '当前检测到 存在空题 无法预览试卷 '}
                onClickClose={props.onClickClose}
            >
                {volumeStore.volumeProblemState ? (
                    <ProblemList></ProblemList>
                ) : (
                    <NoData>
                        <Button onClick={handleClickShowStructure}>前去查看空题目</Button>
                    </NoData>
                )}
            </Dialog>
        )
    })
}

export default Preview
