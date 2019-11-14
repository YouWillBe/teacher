import React from 'react'
import styled from '@emotion/styled'
import { Link } from '@reach/router'
import { TiArrowBackOutline, TiPlus } from 'react-icons/ti'

const Container = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    padding-top: 30px;
`
const MyWrap = styled(Link)`
    box-sizing: border-box;
    width: 130px;
    height: 38px;
    padding: 0 15px;
    line-height: 38px;
    box-shadow: 0px 6px 5px 0px rgba(59, 141, 242, 0.2);
    border-radius: 4px;
    border: 1px solid rgba(153, 153, 153, 1);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: rgba(153, 153, 153, 1);
    cursor: pointer;
    :hover {
        color: #3a93df;
        border-color: #3a93df;
    }
`
const MySpan = styled.span`
    letter-spacing: 2px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    margin-left: 8px;
`

const MyWrap1 = styled.div`
    box-sizing: border-box;
    width: 130px;
    height: 40px;
    padding: 0 16px;
    line-height: 40px;
    background-color: rgba(64, 158, 255, 1);
    box-shadow: 0px 6px 5px 0px rgba(59, 141, 242, 0.2);
    border-radius: 4px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #fff;
    cursor: pointer;
`
const MySpan1 = styled.span`
    letter-spacing: 2px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    margin-right: 8px;
`

interface IProps {
    onClickCreateVolumeTemplate(): void
}

function BackList(props: IProps) {
    return (
        <Container>
            <MyWrap to='/volume'>
                <TiArrowBackOutline></TiArrowBackOutline>
                <MySpan>返回列表</MySpan>
            </MyWrap>
            <MyWrap1 onClick={props.onClickCreateVolumeTemplate}>
                <MySpan1>添加模板</MySpan1>
                <TiPlus></TiPlus>
            </MyWrap1>
        </Container>
    )
}

export default BackList
