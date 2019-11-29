import React, { FC, useRef } from 'react'
import styled from '@emotion/styled'
import useOnClickOutside from 'use-onclickoutside'
import { FaTimes } from 'react-icons/fa'

import Modal from './Modal'

interface IOptions {
    width?: string
    top?: string
}

interface IDialog {
    baseline?: boolean
    title?: string
    options?: IOptions
    onClickClose(): void
}

const Container = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background-color: rgba(102, 102, 102, 0.9);
`

const MyWrap = styled.div<IOptions>`
    box-sizing: border-box;
    position: relative;
    width: ${props => props.width || '80%'};
    top: ${props => props.top || '100px'};
    margin: 0 auto;
    border-radius: 4px;
    background-color: #fff;
`

const MyHeader = styled.header<{ baseline: boolean | undefined }>`
    box-sizing: border-box;
    width: 100%;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: ${props => (props.baseline ? '' : '1px solid #e5e5e5')};
`
const FontWrap = styled.div`
    cursor: pointer;
    color: #aaa;
    font-size: 16px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    transition: all 0.1s linear;
    &:hover {
        color: #3a93df;
    }
`

const MyTitle = styled.span`
    font-size: 18px;
    font-family: PingFangSC-Semibold, sans-serif;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
`
const MySection = styled.section`
    box-sizing: border-box;
    padding: 20px 10px 20px 20px;
`
const ChildrenWrap = styled.div`
    min-height: 40px;
    max-height: 700px;
    padding-right: 10px;
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

const Dialog: FC<IDialog> = props => {
    const ref = useRef(null)
    useOnClickOutside(ref, props.onClickClose)

    return (
        <Modal>
            <Container>
                <MyWrap ref={ref} {...props.options!}>
                    <MyHeader baseline={props.baseline}>
                        <MyTitle>{props.title}</MyTitle>
                        <FontWrap onClick={() => props.onClickClose()}>
                            <FaTimes title='关闭' />
                        </FontWrap>
                    </MyHeader>
                    <MySection>
                        <ChildrenWrap>{props.children}</ChildrenWrap>
                    </MySection>
                </MyWrap>
            </Container>
        </Modal>
    )
}

export default Dialog
