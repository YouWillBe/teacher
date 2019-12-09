import React, { FC } from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.06);
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    color: #3a93df;
`
const MyIconWrap = styled.div`
    width: 30px;
    height: 30px;
    font-size: 30px;
    border: 2px dashed;
`
const MyNameWrap = styled.div`
    margin-top: 20px;
`

interface IProps {
    onClickBlank(): void
}

const Create: FC<IProps> = props => {
    const handleClick = () => {
        props.onClickBlank()
    }
    return (
        <Container onClick={handleClick}>
            <MyIconWrap />
            <MyNameWrap>使用空白模板</MyNameWrap>
        </Container>
    )
}

export default Create
