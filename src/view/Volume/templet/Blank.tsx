import React from 'react'
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
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.06);
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

function Create(props: IProps) {
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
