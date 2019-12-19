import React, { FC, useState, useContext } from 'react'
import styled from 'styled-components'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps, navigate, Router } from '@reach/router'
import { TiArrowBackOutline } from 'react-icons/ti'

import { IStore } from '../../store'
import Button from '../../components/Button'
import Overall from './Overall'
import ClassAnalysis from './Overall/Class'
import PersonalAnalysis from '../Course/PersonalAnalysis'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar-button {
        background-color: #fff;
    }
    &::-webkit-scrollbar {
        background-color: #fff;
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(66, 88, 99, 0.4);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #ddd;
    }
`
const Package = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-right: 5px;
`
const Wrap = styled.div<{ setType: boolean }>`
    box-sizing: border-box;
    width: ${props => (props.setType ? '100%' : '1260px')};
    height: calc(100% - 40px);
    margin: 0 auto;
`

const NavWrap = styled.ul`
    width: 100%;
    height: 40px;
    display: flex;
    background-color: rgba(245, 247, 250, 1);
`
const MySpan = styled.span`
    margin-left: 8px;
`
const Li = styled.li<{ setStyle: boolean }>`
    width: 110px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    cursor: pointer;
    color: ${props => (props.setStyle ? '#3C94DF' : '#666')};
    background-color: ${props => (props.setStyle ? '#DFEDF9' : '#F5F7FA')};
    & ::after {
        border-right: 20px solid red;
    }
`
const ButtonWrap = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
`
const RouterWrap = styled(Router)`
    box-sizing: border-box;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

const AnalysisWrap: FC<RouteComponentProps> = props => {
    const { analysisStore } = useContext<IStore>(MobXProviderContext)
    const [currenLink, setCurrenLink] = useState(props.location!.pathname)

    const handleClickLink = (link: string) => {
        if (currenLink === link) {
            return
        } else {
            navigate(link)
            setCurrenLink(link)
        }
    }

    const optionButton = {
        color: '#3C94DF',
        bgColor: '#f5f7fa',
        HbgColor: '#fff',
    }

    return useObserver(() => {
        return (
            <Package>
                <Container>
                    {props.location!.pathname.split('/')[2] !== 'student' && (
                        <NavWrap>
                            <ButtonWrap>
                                <Button options={optionButton} onClick={() => handleClickLink('/')}>
                                    <TiArrowBackOutline />
                                    <MySpan>返回首页</MySpan>
                                </Button>
                            </ButtonWrap>
                            <Li
                                onClick={() => handleClickLink('/analysis')}
                                setStyle={props.location!.pathname === '/analysis'}
                            >
                                总体分析
                            </Li>
                            {analysisStore.teacherTeams.map(item => (
                                <Li
                                    key={item.id}
                                    onClick={() => handleClickLink(`/analysis/class/${item.id}`)}
                                    setStyle={props.location!.pathname === `/analysis/class/${item.id}`}
                                >
                                    {item.className}
                                </Li>
                            ))}
                        </NavWrap>
                    )}
                    <Wrap setType={props.location!.pathname.split('/')[2] === 'student'}>
                        <RouterWrap>
                            <Overall path='/' />
                            <PersonalAnalysis path='student/:studentId' />
                            <ClassAnalysis path='class/:studentId' />
                        </RouterWrap>
                    </Wrap>
                </Container>
            </Package>
        )
    })
}

export default AnalysisWrap
