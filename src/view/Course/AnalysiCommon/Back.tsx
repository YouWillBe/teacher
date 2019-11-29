import React, { FC } from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { TiArrowBackOutline } from 'react-icons/ti'

import Button from '../../../components/Button'

const Container = styled.div``
const MySpan = styled.span`
    margin-left: 8px;
`

interface IProps {
    data: {
        url: string | undefined
    }
}

const Back: FC<IProps> = props => {
    const handleClickLink = () => {
        let urlArr = props.data.url!.split('/')
        navigate(`/${urlArr[1]}/${urlArr[2]}/${urlArr[3]}`)
    }

    const setRouterName = () => {
        let urlArr = props.data.url!.split('/')
        if (urlArr[3] === 'preview') {
            return '返回预习'
        } else if (urlArr[3] === 'classTest') {
            return '返回随堂测'
        } else if (urlArr[3] === 'task') {
            return '返回作业'
        } else if (urlArr[3] === 'examination') {
            return '返回测试'
        }
    }

    const optionButton = {
        color: 'rgba(153, 153, 153, 1)',
        shadow: '0px 6px 5px 0px rgba(59,141,242,0.2)',
        bgColor: '#fff',
        HBorder: '1px solid #40a9ff',
        HColor: '#40a9ff',
        HbgColor: '#fff',
    }
    return (
        <Container>
            <Button options={optionButton} onClick={handleClickLink}>
                <TiArrowBackOutline></TiArrowBackOutline>
                <MySpan>{setRouterName()}</MySpan>
            </Button>
        </Container>
    )
}

export default Back
