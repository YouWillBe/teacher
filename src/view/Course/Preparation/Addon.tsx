import React, { FC, MouseEventHandler } from 'react'
// import { Link, RouteComponentProps } from '@reach/router'

import styled from '@emotion/styled'
import { FaSave } from 'react-icons/fa'

// import KnowledgePoint from './KnowledgePoint'
// import Annex from './Annex'

const Container = styled.div`
    position: fixed;
    top: 20px;
    right: 30px;
    width: 200px;
`
const Save = styled.div`
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 20px;
    border-radius: 6px;
    border: 1px solid #ccc;
    cursor: pointer;
    box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    svg {
        font-size: 18px;
    }
`
const Span = styled.span`
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
`

interface IProps {
    canSave: boolean
    onSave: MouseEventHandler
}

const Addon: FC<IProps> = props => {
    return (
        <Container>
            {/* <KnowledgePoint /> */}
            {/* <Annex /> */}

            {props.canSave && (
                <Save onClick={props.onSave}>
                    <FaSave></FaSave>
                    <Span>保存并返回</Span>
                </Save>
            )}
        </Container>
    )
}

export default Addon
