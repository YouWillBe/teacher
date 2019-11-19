import React, { FC } from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { TiArrowBackOutline } from 'react-icons/ti'

import Button from '../../../components/Button'

const Container = styled.div`
    display: flex;
    & button:first-of-type {
        margin-right: 16px;
    }
`
const MySpan = styled.span`
    margin-left: 8px;
`

interface IProps {
    data: {
        url: string | undefined
        returnLine: string | undefined
    }
}

const Back: FC<IProps> = props => {
    const handleClickLink = () => {
        let urlArr = props.data.url!.split('/')
        navigate(`/${urlArr[1]}/${urlArr[2]}/${urlArr[3]}`)
    }

    const handleClickLink1 = () => {
        let urlArr = props.data.url!.split('/')
        if (urlArr[4]) {
            navigate(`/${urlArr[1]}/${urlArr[2]}/${urlArr[3]}/${urlArr[4]}`)
        } else if (props.data.returnLine) {
            navigate(props.data.returnLine)
        } else {
            navigate(`/${urlArr[1]}`)
        }
    }

    const setRouterName = (): { name: string; name1: string } => {
        let urlArr = props.data.url!.split('/')
        if (urlArr[3] === 'preview') {
            return { name: '返回预习', name1: '返回上一层' }
        } else if (urlArr[3] === 'classTest') {
            return { name: '返回随堂测', name1: '返回上一层' }
        } else if (urlArr[3] === 'task') {
            return { name: '返回作业', name1: '返回上一层' }
        } else if (urlArr[3] === 'test') {
            return { name: '返回测试', name1: '返回上一层' }
        } else {
            return { name: '返回分析', name1: '返回上一层' }
        }
    }

    const buttonOption = {
        height: '40px',
        color: 'rgba(153, 153, 153, 1)',
        border: '1px solid rgba(153,153,153,1)',
        shadow: '0px 6px 5px 0px rgba(59,141,242,0.2)',
        HColor: '#3a93df',
        HBorder: '1px solid #3a93df',
    }

    return (
        <Container>
            {props.data.url!.split('/')[4] && (
                <Button options={buttonOption} onClick={handleClickLink}>
                    <TiArrowBackOutline />
                    <MySpan>{setRouterName().name}</MySpan>
                </Button>
            )}
            <Button options={buttonOption} onClick={handleClickLink1}>
                <TiArrowBackOutline />
                <MySpan>{setRouterName().name1}</MySpan>
            </Button>
        </Container>
    )
}

export default Back
