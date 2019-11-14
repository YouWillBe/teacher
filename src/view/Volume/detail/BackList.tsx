import React, { useState, ChangeEventHandler, KeyboardEventHandler } from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { TiArrowBackOutline, TiPencil } from 'react-icons/ti'
import { MdSave } from 'react-icons/md'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    padding: 0 20px;
`
const MyWrap = styled.div`
    width: 100px;
    height: 38px;
    line-height: 38px;
    box-shadow: 0px 6px 5px 0px rgba(59, 141, 242, 0.2);
    border-radius: 4px;
    border: 1px solid rgba(153, 153, 153, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    color: rgba(153, 153, 153, 1);
    cursor: pointer;
    :hover {
        color: #3a93df;
        border-color: #3a93df;
    }
`
const Input = styled.input`
    padding: 0 8px;
    border: 1px solid #979797;
    border-radius: 4px;
    outline: none;
`
const NameWrap = styled.div`
    display: flex;
`
const FontWrap = styled.div`
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    margin-left: 20px;
    background-color: #409eff;
    border-radius: 50%;
    cursor: pointer;
    svg {
        font-size: 14px;
        color: #fff;
    }
`

const MySpan = styled.span`
    letter-spacing: 2px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
`
const MySpan1 = styled.span`
    letter-spacing: 2px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    margin-right: 20px;
`

interface IProps {
    name: string
    onChangeEdit(value: string): void
    onClickSave(): void
}

function BackList(props: IProps) {
    const [isEdit, setIsEdit] = useState(false)

    //编辑
    const handleClickEdit = () => {
        setIsEdit(!isEdit)
    }

    //保存
    const handleClickSave = () => {
        props.onClickSave()
        setIsEdit(false)
    }

    const handleKeyDownEdit: KeyboardEventHandler = event => {
        if (event.which === 13) {
            setIsEdit(false)
            props.onClickSave()
        }
    }

    //修改标题
    const handleChangeEdit: ChangeEventHandler<HTMLInputElement> = event => {
        props.onChangeEdit(event.target.value)
    }

    //返回列表
    const handleClickLink = () => {
        sessionStorage.removeItem('sessionCurrentType')
        navigate(`/volume`)
    }

    return (
        <Container>
            <MyWrap onClick={handleClickLink}>
                <TiArrowBackOutline></TiArrowBackOutline>
                <MySpan>返回列表</MySpan>
            </MyWrap>
            <NameWrap>
                {isEdit ? (
                    <>
                        <Input
                            type='text'
                            value={props.name}
                            onChange={handleChangeEdit}
                            onKeyDown={handleKeyDownEdit}
                        />
                        <FontWrap title='保存' onClick={handleClickSave}>
                            <MdSave></MdSave>
                        </FontWrap>
                    </>
                ) : (
                    <>
                        <MySpan1>{props.name}</MySpan1>
                        <FontWrap title='点击修改标题' onClick={handleClickEdit}>
                            <TiPencil></TiPencil>
                        </FontWrap>
                    </>
                )}
            </NameWrap>
        </Container>
    )
}

export default BackList
