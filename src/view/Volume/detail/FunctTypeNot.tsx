import React, { useState } from 'react'
import styled from '@emotion/styled'

import Button from '../../../components/Button'
import Structure from '../structure'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Left = styled.div`
    display: flex;
`
const ButtonWrap = styled.div<{ setWidth?: string }>`
    width: ${props => props.setWidth};
    margin-right: 20px;
`

interface IProps {
    onClickOutLine(): void
}
function FunctTypeNot(props: IProps) {
    const [isShow, setIsShow] = useState(false)

    const handleClickIsShow = () => {
        props.onClickOutLine()
        setIsShow(true)
    }

    const handleClickClose = () => {
        setIsShow(false)
    }

    const optionButton = {
        height: '30px',
        shadow: '0px 4px 11px 0px rgba(64,158,255,0.1)',
    }

    return (
        <Container>
            <Left>
                <ButtonWrap setWidth='88px'></ButtonWrap>
                <ButtonWrap setWidth='80px'></ButtonWrap>
                <ButtonWrap>
                    <Button options={optionButton} onClick={handleClickIsShow}>
                        修改试卷结构
                    </Button>
                </ButtonWrap>
                {isShow && <Structure onClickClose={handleClickClose}></Structure>}
            </Left>
        </Container>
    )
}

export default FunctTypeNot
