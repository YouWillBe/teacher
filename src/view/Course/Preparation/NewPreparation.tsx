import React, { useEffect, useState, FC, useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import styled from '@emotion/styled'
import { Link, RouteComponentProps, navigate } from '@reach/router'
import { TiArrowBackOutline } from 'react-icons/ti'
import { Value } from 'slate'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../store'

import Addon from './Addon'
import Editor from '../../../components/EditorX'
// import Loading from '../../../components/Loading'

const Wrap = styled.div`
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding-right: 5px;
`
const Container = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    padding-top: 20px;
    padding-bottom: 20px;
    box-sizing: border-box;
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

const Back = styled(Link)`
    position: absolute;
    color: #666;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #fff;
    top: 50px;
    left: 50px;
    margin-top: -20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 20;
    transition: all 0.1s linear;
    &:hover {
        background-color: #eee;
        color: #00a6f3;
    }
`

const Content = styled.div`
    width: 800px;
    min-height: 100%;
    background-color: #fff;
    margin: 0 auto;
    box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 30px 50px;
`
const Title = styled.div`
    height: 80px;
    font-size: 30px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
`

interface IProps {
    courseId: string
}

const NewPreparation: FC<RouteComponentProps<IProps>> = props => {
    const { coursePreparationStore } = useContext<IStore>(MobXProviderContext)
    const [canSave, setCanSave] = useState(false)

    useEffect(() => {
        if (!coursePreparationStore.preparationReady) {
            props.courseId && coursePreparationStore.getPreparation(props.courseId)
        }
        // eslint-disable-next-line
    }, [])

    const onChange = (value: Value) => {
        coursePreparationStore.preparationData.content = value
        if (!canSave) setCanSave(true)
    }

    //保存并返回
    const onSave = () => {
        navigate(`/course/${props.courseId}/preparation`)
        coursePreparationStore.preparationData.statu = 1
        coursePreparationStore.currentStatu = false
    }

    return useObserver(() => {
        return (
            <Wrap>
                <Container>
                    <Addon onSave={onSave} canSave={canSave} />
                    <Back to={`/course/${props.courseId}/preparation`} title='返回'>
                        <TiArrowBackOutline></TiArrowBackOutline>
                    </Back>
                    <Content>
                        <Title>请输入预习内容</Title>
                        <Editor value={coursePreparationStore.preparationData.content} onChange={onChange} />
                    </Content>
                </Container>
            </Wrap>
        )
    })
}

export default NewPreparation
