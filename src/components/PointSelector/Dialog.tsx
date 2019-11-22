import React, { FC, useRef } from 'react'
import styled from '@emotion/styled'
import useOnClickOutside from 'use-onclickoutside'
import { FaTimes } from 'react-icons/fa'

interface IDialog {
    title: string
    onClose(): void
}

const Container = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(102, 102, 102, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Wrap = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 1160px;
    border-radius: 4px;
    background-color: #fff;
    height: calc(100vh - 200px);
`

const Header = styled.header`
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(151, 151, 151, 0.3);
    padding-left: 12px;
    padding-right: 12px;
    box-sizing: border-box;
`
const TagWrap = styled.div`
    cursor: pointer;
    color: #aaa;
    font-size: 24px;
    height: 40px;
    width: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    transition: all 0.1s linear;
    &:hover {
      color: #3a93df;
    }
`

const Title = styled.span`
    font-size: 18px;
    font-family: PingFangSC-Semibold, sans-serif;
    font-weight: 500;
    color: #777;
`
const Section = styled.section`
    box-sizing: border-box;
    height: calc(100% - 50px);
    padding: 6px;
    overflow: hidden;
    //overflow: auto;
    //&::-webkit-scrollbar-button {
    //    background-color: #fff;
    //}
    //&::-webkit-scrollbar {
    //    background-color: #fff;
    //    width: 8px;
    //}
    //&::-webkit-scrollbar-thumb {
    //    background-color: rgba(66, 88, 99, 0.4);
    //    border-radius: 10px;
    //}
    //&::-webkit-scrollbar-track {
    //    border-radius: 10px;
    //    background-color: #ddd;
    //}
`

const Dialog: FC<IDialog> = ({title, onClose, children}) => {
    const ref = useRef(null)
    useOnClickOutside(ref, onClose)
    return (
        <Container>
            <Wrap ref={ref}>
                <Header>
                    <Title>{title}</Title>
                    <TagWrap onClick={() => onClose()}>
                        <FaTimes title='关闭' />
                    </TagWrap>
                </Header>
                <Section>{children}</Section>
            </Wrap>
        </Container>
    )
}

export default Dialog
