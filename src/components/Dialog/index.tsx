import React, { FC, useEffect, useState, useRef, MouseEvent } from 'react'
import styled from '@emotion/styled'
import useOnClickOutside from 'use-onclickoutside'
import { FaTimes } from 'react-icons/fa'

interface IOptions {
    width?: string
    height?: string
    margin?: string
    top?: string
    radius?: string
    borderBottom?: string
}

interface IDialog {
    title?: any
    maskClosable?: boolean
    options: IOptions
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
    position: relative;
    box-sizing: border-box;
    width: ${props => props.width || '100%'};
    margin: ${props => props.margin || '0 auto'};
    top: ${props => props.top || '100px'};
    border-radius: ${props => props.radius || '4px'};
    background-color: #fff;
`

const MyHeader = styled.header<{ borderBottom: string | undefined }>`
    box-sizing: border-box;
    width: 100%;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: ${props => props.borderBottom || ''};
    svg {
        color: #3a93df;
        font-size: 24px;
    }
`
const FontWrap = styled.div`
    cursor: pointer;
`

const MyTitle = styled.span`
    font-size: 18px;
    font-family: PingFangSC-Semibold;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
`
const MySection = styled.section<IOptions>`
    box-sizing: border-box;
    padding: 20px;
    max-height: 700px;
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
    const [isMaskClosable, setIsMaskClosable] = useState(true)

    useEffect(() => {
        if (props.maskClosable === false) {
            setIsMaskClosable(props.maskClosable)
        }
    }, [props.maskClosable])

    const ref = useRef(null)
    useOnClickOutside(ref, props.onClickClose)

    const handleClickClose = (e: MouseEvent) => {
        if (e.target !== ref.current) return
        if (isMaskClosable) {
            props.onClickClose()
        }
    }

    const handleClickClose2 = () => {
        props.onClickClose()
    }

    return (
        <Container ref={ref} onClick={handleClickClose}>
            <MyWrap {...props.options}>
                <MyHeader borderBottom={props.options.borderBottom}>
                    <MyTitle>{props.title}</MyTitle>
                    <FontWrap onClick={handleClickClose2}>
                        <FaTimes title='关闭'></FaTimes>
                    </FontWrap>
                </MyHeader>
                <MySection>{props.children}</MySection>
            </MyWrap>
        </Container>
    )
}

export default Dialog
