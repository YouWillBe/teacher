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
            <Button options={buttonOption} onClick={handleClickLink}>
                <TiArrowBackOutline></TiArrowBackOutline>
                <MySpan>{setRouterName()}</MySpan>
            </Button>
        </Container>
    )
}

export default Back
