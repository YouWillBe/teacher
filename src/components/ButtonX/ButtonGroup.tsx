import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Container as Button } from './index'

const Container = styled.div`
    margin-right: 15px;
    display: inline-block;
    & ${Button} {
        border-radius: 0;
    }
    & ${Button}:first-of-type {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    & ${Button}:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    & ${Button}:not(:first-of-type) {
        margin-left: -1px;
    }
`

const ButtonGroup: FC = props => {
    return <Container>{props.children}</Container>
}

export default ButtonGroup
