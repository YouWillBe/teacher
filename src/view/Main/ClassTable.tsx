import React, { useState, useContext, FC } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { range } from 'ramda'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../store'
import WeekSelector from './WeekSelector'
import Class from './Class'
import Loading from '../../components/Loading'

const Container = styled.div`
    width: 950px;
    height: 800px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 13px 1px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 5px 25px 25px;
    user-select: none;
`
const Content = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`
const DateWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: 1fr;
    justify-items: center;
    align-items: center;
    background-color: #fff;
`
const DateItem = styled.div<{ index: number }>`
    grid-column: ${props => props.index + 2};
    color: #3a93df;
`
const WeekWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 1fr;
    justify-items: center;
    align-items: center;
    grid-column-gap: 1px;
    background-color: #ccc;
    width: 100%;
    height: 100%;
`
const WeekItem = styled.div`
    height: 100%;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Table = styled.div`
    flex-grow: 1;
    display: grid;
    grid-template-columns: 8fr;
    grid-template-rows: 30px 1fr;
    grid-row-gap: 1px;
    background-color: #ccc;
`
const TableWrap = styled.div<{ y: number }>`
    border: 1px solid #ccc;
    border-top: none;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr ${props => props.y}fr;
    background-color: #3a93df;
    grid-row-gap: 1px;
`
const TableHeader = styled.div`
    display: grid;
    grid-template-columns: 1fr 7fr;
    grid-template-rows: 1fr;
    justify-items: center;
    align-items: center;
    grid-column-gap: 1px;
    background-color: #3a93df;
`
const TableContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 7fr;
    grid-template-rows: 1fr;
    justify-items: center;
    align-items: center;
    grid-column-gap: 1px;
    background-color: #3a93df;
`
const Am = styled.div<{ section: number }>`
    background-color: #fff;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(${props => props.section}, 1fr);
    grid-row-gap: 1px;
    background-color: #ccc;
`
const Pm = styled.div<{ section: number }>`
    background-color: #fff;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(${props => props.section}, 1fr);
    grid-row-gap: 1px;
    background-color: #ccc;
`
const Night = styled.div<{ section: number }>`
    background-color: #fff;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(${props => props.section}, 1fr);
    grid-row-gap: 1px;
    background-color: #ccc;
`
const AmRow = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 1fr;
    background-color: #ccc;
    grid-column-gap: 1px;
`
const Title = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`
const TitleText = styled.div`
    font-size: 14px;
`
const TitleTime = styled.div`
    font-size: 12px;
`
const YAxis = styled.div<{ am: number; pm: number; night: number }>`
    background-color: #3a93df;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: ${props => props.am}fr ${props => props.pm}fr ${props => props.night}fr;
    grid-row-gap: 1px;
`
const TitleSection = styled.div<{ section: number }>`
    height: 100%;
    width: 100%;
    background-color: #ccc;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(${props => props.section}, 1fr);
    grid-row-gap: 1px;
`
const TableItems = styled.div<{ am: number; pm: number; night: number }>`
    background-color: #3a93df;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: ${props => props.am}fr ${props => props.pm}fr ${props => props.night}fr;
    grid-row-gap: 1px;
`

const ClassTable: FC = () => {
    const { classTableStore } = useContext<IStore>(MobXProviderContext)

    const [weeks] = useState(['周一', '周二', '周三', '周四', '周五', '周六', '周日'])
    return useObserver(() => (
        <Container>
            <Content>
                <WeekSelector />
                <Table>
                    <DateWrap>
                        {classTableStore.abscissa.map((v, i) => (
                            <DateItem key={i} index={i}>
                                {v}
                            </DateItem>
                        ))}
                    </DateWrap>
                    <TableWrap y={classTableStore.am.length + classTableStore.pm.length + classTableStore.night.length}>
                        <TableHeader>
                            <WeekItem />
                            <WeekWrap>
                                {weeks.map((v, i) => (
                                    <WeekItem key={i}>{v}</WeekItem>
                                ))}
                            </WeekWrap>
                        </TableHeader>
                        <TableContent>
                            <YAxis
                                am={classTableStore.am.length}
                                pm={classTableStore.pm.length}
                                night={classTableStore.night.length}
                            >
                                <TitleSection section={classTableStore.am.length}>
                                    {classTableStore.am.map(v => (
                                        <Title key={v.id}>
                                            <TitleText>{v.name}</TitleText>
                                            <TitleTime>
                                                {v.startTimeString} ~ {v.endTimeString}
                                            </TitleTime>
                                        </Title>
                                    ))}
                                </TitleSection>
                                <TitleSection section={classTableStore.pm.length}>
                                    {classTableStore.pm.map(v => (
                                        <Title key={v.id}>
                                            <TitleText>{v.name}</TitleText>
                                            <TitleTime>
                                                {v.startTimeString} ~ {v.endTimeString}
                                            </TitleTime>
                                        </Title>
                                    ))}
                                </TitleSection>
                                <TitleSection section={classTableStore.night.length}>
                                    {classTableStore.night.map(v => (
                                        <Title key={v.id}>
                                            <TitleText>{v.name}</TitleText>
                                            <TitleTime>
                                                {v.startTimeString} ~ {v.endTimeString}
                                            </TitleTime>
                                        </Title>
                                    ))}
                                </TitleSection>
                            </YAxis>
                            {classTableStore.gettingCourses || !classTableStore.coursesReady ? (
                                <Loading></Loading>
                            ) : (
                                <TableItems
                                    am={classTableStore.am.length}
                                    pm={classTableStore.pm.length}
                                    night={classTableStore.night.length}
                                >
                                    <Am section={classTableStore.am.length}>
                                        {classTableStore.am.map((v, i) => (
                                            <AmRow key={i}>
                                                {range(1, 8).map(x => (
                                                    <Class
                                                        data={
                                                            classTableStore.amCourses.filter(
                                                                y => y.courseSection === i && y.weekDay === x
                                                            )[0]
                                                        }
                                                        key={x}
                                                    />
                                                ))}
                                            </AmRow>
                                        ))}
                                    </Am>
                                    <Pm section={classTableStore.pm.length}>
                                        {classTableStore.pm.map((v, i) => (
                                            <AmRow key={i}>
                                                {range(1, 8).map(x => (
                                                    <Class
                                                        data={
                                                            classTableStore.pmCourses.filter(
                                                                y => y.courseSection === i && y.weekDay === x
                                                            )[0]
                                                        }
                                                        key={x}
                                                    />
                                                ))}
                                            </AmRow>
                                        ))}
                                    </Pm>
                                    <Night section={classTableStore.night.length}>
                                        {classTableStore.night.map((v, i) => (
                                            <AmRow key={i}>
                                                {range(1, 8).map(x => (
                                                    <Class
                                                        data={
                                                            classTableStore.nightCourses.filter(
                                                                y => y.courseSection === i && y.weekDay === x
                                                            )[0]
                                                        }
                                                        key={x}
                                                    />
                                                ))}
                                            </AmRow>
                                        ))}
                                    </Night>
                                </TableItems>
                            )}
                        </TableContent>
                    </TableWrap>
                </Table>
            </Content>
        </Container>
    ))
}

export default ClassTable
