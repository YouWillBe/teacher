import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Link } from '@reach/router'

const Container = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    box-sizing: border-box;
    padding: 8px 10px;
`
const Content = styled(Link)`
    background-color: transparent;
    height: 100%;
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    border-radius: 4px;
    color: #00a6f3;
    &:hover {
        background-color: #00a6f3;
        color: #fff;
    }
`
interface IProps {
    data: {
        courseId: number
        teamName: string
        teamFullName: string
    }
}

const Class: FC<IProps> = props => {
    return (
        <Container>
            {props.data ? <Content to={`/course/${props.data.courseId}/plan`}>{props.data.teamFullName}</Content> : ''}
        </Container>
    )
}

export default Class
