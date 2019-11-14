import React, { FC, MouseEventHandler } from 'react'

import styled from '@emotion/styled'

import KnowledgePoint from './KnowledgePoint'
// import Annex from './Annex'

const Container = styled.div`
    position: fixed;
    top: 20px;
    right: 30px;
    width: 230px;
`
const Save = styled.div`
    height: 50px;
    width: 100%;
    margin-top: 20px;
    border-radius: 6px;
    text-align: center;
    line-height: 50px;
    border: 1px solid #ccc;
    cursor: pointer;
    box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    color: #777;
`

interface IProps {
    canSave: boolean
    onSave: MouseEventHandler
}

const Addon: FC<IProps> = props => {
    return (
        <Container>
            <KnowledgePoint />
            {/* <Annex /> */}
            {props.canSave && <Save onClick={props.onSave}>保存</Save>}
        </Container>
    )
}

export default Addon
