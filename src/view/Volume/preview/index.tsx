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

    const optionDialog = {
        width: '70%',
        // marginTop: '5%',
        borderBottom: '1px solid #e5e5e5',
    }

    const buttonOption = {
        height: '40px',
        size: '16px',
        weight: '400',
        family: 'PingFangSC-Regular,PingFangSC',
        bgColor: '#409EFF',
        shadow: '0px 4px 11px 0px rgba(64,158,255,0.5)',
    }

    return useObserver(() => {
        return (
            <Dialog
                title={volumeStore.volumeProblemState ? '预览试卷' : '当前检测到 存在空题 无法预览试卷 '}
                options={optionDialog}
                onClickClose={props.onClickClose}
            >
                {volumeStore.volumeProblemState ? (
                    <ProblemList></ProblemList>
                ) : (
                    <NoData>
                        <Button options={buttonOption} onClick={handleClickShowStructure}>
                            前去查看空题目
                        </Button>
                    </NoData>
                )}
            </Dialog>
        )
    })
}

export default Preview
