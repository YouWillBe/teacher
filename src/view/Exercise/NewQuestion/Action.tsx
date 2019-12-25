import React, {FC} from 'react'
import styled from 'styled-components'
import { FiPlayCircle, FiSave, FiXCircle } from 'react-icons/fi'

const Container = styled.div`
    display: flex;
    justify-content: center;
`
const Button = styled.div<{color: string}>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC, sans-serif;
    font-weight: 400;
    background-color: #fff;
    color: ${props => props.color};
    border-radius: 6px;
    border: 2px solid ${props => props.color};
    cursor: pointer;
    padding: 6px 12px;
    margin: 0 5px;
    transition: all 0.1s linear;
    &:hover {
      background-color: ${props => props.color};
      color: #fff;
    }
`
const ButtonIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 6px;
    font-size: 22px;
`

interface IProps {
    handlePreview():void
    handleCancel():void
    handleSave():void
}

const Action:FC<IProps> = ({handleCancel, handlePreview, handleSave}) => {
    return <Container>
        <Button onClick={handlePreview} color='#00a6f3'>
            <ButtonIcon>
                <FiPlayCircle />
            </ButtonIcon>
            预览
        </Button>
        <Button onClick={handleCancel} color='#F09BA5'>
            <ButtonIcon>
                <FiXCircle />
            </ButtonIcon>
            取消
        </Button>
        <Button onClick={handleSave} color='#43B3A4'>
            <ButtonIcon>
                <FiSave />
            </ButtonIcon>
            保存
        </Button>
    </Container>
}

export default Action