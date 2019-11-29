import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Location, LocationContext } from '@reach/router'
import { FaEye } from 'react-icons/fa'

import StudentList from './StudentList'
import Button from '../../../components/Button'

const Container = styled.div`
    width: 100%;
    display: flex;
`
const Left = styled.div`
    flex-grow: 1;
    margin-right: 20px;
`
const Right = styled.div`
    width: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ButtonWrap = styled.div`
    margin-top: 20px;
    svg {
        font-size: 16px;
        margin-left: 8px;
    }
`
const Span = styled.span`
    font-size: 16px;
    font-weight: 300px;
`

interface IUnfinishedStudentList {
    id: number
    testStatus: number
    studentId: number
    studentTestId: number
    studentStatus: number
    studentName: string
    studentSex: number
    accuracy: number
}
interface IProps {
    data: {
        unfinishedStudentList: IUnfinishedStudentList[]
        finishedStudentList: IUnfinishedStudentList[]
    }
    onClickStudentLink(studentTestId: number): void
    onClickLink(pathname: string): void
}
const Section: FC<IProps> = props => {
    const optionButton = {
        height: '50px',
        bgColor: '#248BCB',
    }

    return (
        <Container>
            <Left>
                <StudentList
                    data={{
                        title: '未录入',
                        Color: '#ef6666',
                        studentList: props.data.unfinishedStudentList,
                    }}
                    onClickLink={props.onClickStudentLink}
                ></StudentList>
                <StudentList
                    data={{
                        title: '已出成绩',
                        Color: '#4CDF78',
                        studentList: props.data.finishedStudentList,
                    }}
                    onClickLink={props.onClickStudentLink}
                ></StudentList>
            </Left>
            <Right>
                <ButtonWrap>
                    <Location>
                        {(location: LocationContext) => {
                            return (
                                <Button
                                    options={optionButton}
                                    onClick={() => props.onClickLink(location.location.pathname)}
                                >
                                    <Span>查看分析</Span>
                                    <FaEye></FaEye>
                                </Button>
                            )
                        }}
                    </Location>
                </ButtonWrap>
            </Right>
        </Container>
    )
}

export default Section
