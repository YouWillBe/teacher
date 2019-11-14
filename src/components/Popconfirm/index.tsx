import React, { useRef, FC, MouseEvent } from 'react'
import styled from '@emotion/styled'
import useOnClickOutside from 'use-onclickoutside'

const ConfirmWrap = styled.div`
    width: 120px;
    height: 30px;
    background-color: #fff;
    position: absolute;
    z-index: 10;
    bottom: -50px;
    left: -44px;
    display: flex;
    padding: 8px 3px;
    border-radius: 6px;
    box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    cursor: initial;
`
const Button = styled.span`
    height: 16px;
    line-height: 16px;
    padding: 6px 12px;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 12px;
    color: #555;
    border-radius: 4px;
    border: 1px solid #555;
    cursor: pointer;
    &:hover {
        border-color: #00a6f3;
        color: #00a6f3;
    }
`
const RedButton = styled(Button)`
    border-color: red;
    color: red;
    &:hover {
        background-color: red;
        color: #fff;
        border-color: red;
    }
`

interface IConfirmProps {
    close(): void
    confirm(): void
}

const Popconfirm: FC<IConfirmProps> = props => {
    const ref = useRef(null)
    useOnClickOutside(ref, props.close)
    const handleConfirm = () => {
        props.confirm()
    }
    const handleClose = (event: MouseEvent<HTMLDivElement>) => {
        if (event) {
            event.stopPropagation()
        }
        props.close()
    }
    return (
        <ConfirmWrap ref={ref}>
            <RedButton onClick={handleConfirm} title='删除'>
                删除
            </RedButton>
            <Button onClick={handleClose} title='取消'>
                取消
            </Button>
        </ConfirmWrap>
    )
}

export default Popconfirm
