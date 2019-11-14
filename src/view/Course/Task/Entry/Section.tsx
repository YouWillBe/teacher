import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { navigate, Location, LocationContext } from '@reach/router'
import { FaEye } from 'react-icons/fa'

import { IStore } from '../../../../store'
import StudentList from './StudentList'
import Button from '../../../../components/Button'

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
        margin-left: 8px;
    }
`
const Span = styled.span``

const Section: FC = props => {
    const { courseTaskStore } = useContext<IStore>(MobXProviderContext)

    const handleClickLink = ({ location }: LocationContext) => {
        navigate(`${location.pathname}/analysis/${courseTaskStore.doTaskInfo!.testId}`)
    }

    const buttonOption = {
        height: '50px',
        bgColor: '#248BCB',
        size: '16px',
        family: 'PingFangSC',
        weight: '300',
        radius: '10px',
        shadow: '0px 2px 4px 0px rgba(31,122,171,0.2)',
        border: '3px solid rgba(255,255,255,1)',
    }
    return useObserver(() => {
        return (
            <Container>
                <Left>
                    <StudentList
                        data={{
                            title: '未录入',
                            Color: '#ef6666',
                            url: '',
                            studentList: courseTaskStore.unfinishedStudentList,
                        }}
                    ></StudentList>
                    <StudentList
                        data={{
                            title: '已出成绩',
                            Color: '#4CDF78',
                            url: '',
                            studentList: courseTaskStore.finishedStudentList,
                        }}
                    ></StudentList>
                </Left>
                <Right>
                    <ButtonWrap>
                        <Location>
                            {(location: LocationContext) => {
                                return (
                                    <Button options={buttonOption} onClick={() => handleClickLink(location)}>
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
    })
}

export default Section
