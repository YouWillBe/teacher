import React, { FC, useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import styled from '@emotion/styled'
import { RouteComponentProps, Link } from '@reach/router'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'
import { FaPen, FaLocationArrow } from 'react-icons/fa'

import { IStore } from '../../../store'
import Editor from '../../../components/EditorX'
import Button from '../../../components/Button'

interface IParams {
    courseId: string
}

const Container = styled.div`
    width: 100%;
    height: calc(100% - 60px);
`
const ScrollbarWrap = styled.div`
    box-sizing: border-box;
    overflow-y: auto;
    height: 100%;

    padding: 0 20px;
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
const Funct = styled.div`
    height: 28px;
`
const Funct1 = styled.div`
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const Button1 = styled(Link)``
const Button2 = styled.div`
    margin-left: 30px;
    margin-right: 94px;
`
const Span = styled.span`
    margin-right: 18px;
`

const EditorWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 20px);
    border: 1px solid #ccc;
    box-shadow: 0px 2px 4px 0px rgba(181, 183, 250, 0.5);
    border-radius: 8px;
    padding: 20px;
`

const ReadOnly: FC<RouteComponentProps<IParams>> = props => {
    const { coursePreparationStore } = useContext<IStore>(MobXProviderContext)

    const handleClickSave = () => {
        if (props.courseId && coursePreparationStore.preparationData.content.document.text.length > 0) {
            coursePreparationStore.preparationCreate(
                props.courseId,
                JSON.stringify(coursePreparationStore.preparationData.content)
            )
        }
    }

    const editButton = {
        width: '136px',
        height: '40px',
        bgColor: '#52C41A',
        radius: '30px',
        size: '18px',
        family: 'PingFangSC-Regular',
        weight: '400',
    }
    const arrowButton = {
        width: '160px',
        height: '40px',
        bgColor: '#0376D7',
        radius: '30px',
        size: '18px',
        family: 'PingFangSC-Regular',
        weight: '400',
    }
    return useObserver(() => {
        return (
            <Container>
                {coursePreparationStore.preparationData.id ? (
                    <Funct />
                ) : (
                    <Funct1>
                        <Button1 to='new'>
                            <Button options={editButton}>
                                <Span>编辑</Span>
                                <FaPen></FaPen>
                            </Button>
                        </Button1>
                        <Button2>
                            <Button options={arrowButton} onClick={handleClickSave}>
                                <Span>确定发布</Span>
                                <FaLocationArrow></FaLocationArrow>
                            </Button>
                        </Button2>
                    </Funct1>
                )}

                <ScrollbarWrap>
                    <EditorWrap>
                        <Editor value={Value.fromJSON(coursePreparationStore.preparationData.content)} readonly />
                    </EditorWrap>
                </ScrollbarWrap>
            </Container>
        )
    })
}

export default ReadOnly
