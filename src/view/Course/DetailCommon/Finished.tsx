import React, { FC } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'

const SituationWrap = styled.div``
const FinishedWrap = styled.div`
    display: flex;
    align-items: center;
`
const FinishedText = styled.span`
    margin: 0 20px;
`

const Circle = styled.span<{ bgColor: string }>`
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: ${props => props.bgColor};
    border-radius: 10px;
`
const People = styled.span<{ Color: string }>`
    color: ${props => props.Color};
`

interface IProps {
    text: string
    people: number | null
}

const Finished: FC<RouteComponentProps<IProps>> = props => {
    return (
        <SituationWrap>
            <FinishedWrap>
                <Circle bgColor={props.text === '已交' ? '#4CDF78' : '#EF6666'} />
                <FinishedText>{props.text}</FinishedText>
                <People Color={props.text === '已交' ? '#4CDF78' : '#EF6666'}>{props.people && props.people}</People>
            </FinishedWrap>
        </SituationWrap>
    )
}

export default Finished
