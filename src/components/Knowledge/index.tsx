import React, { FC } from 'react'
import styled from '@emotion/styled'
import { FaTimes } from 'react-icons/fa'

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    margin-bottom: 6px;
`
const Text = styled.span<{ closable: boolean }>`
    display: inline-block;
    box-sizing: border-box;
    max-width: 110px;
    height: 36px;
    line-height: 34px;
    text-align: center;
    background-color: rgba(221, 237, 241, 1);
    border-radius: 4px;
    border: 1px solid rgba(58, 147, 223, 1);
    font-size: 12px;
    font-family: PingFangSC, sans-serif;
    font-weight: 300;
    color: rgba(58, 147, 223, 1);
    padding: ${props => (props.closable ? '0 26px 0 10px' : '0 10px')};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const Tag = styled.span`
    position: absolute;
    top: 50%;
    right: 6px;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.1s linear;
    transform: translateY(-50%);
    svg {
        font-size: 12px;
        color: rgba(58, 147, 223, 1);
    }
    &:hover {
        background-color: #fff;
    }
`

interface IData {
    id: number
    name: string
}
interface IProps {
    data: IData
    closable?: boolean
    onClickDeleted?(data: IData): void
}

const Knowledge: FC<IProps> = props => {
    const handleClickDeleted = () => {
        if (props.closable && props.onClickDeleted) {
            props.onClickDeleted(props.data)
        }
    }
    return (
        <Container>
            <Text title={props.data.name} closable={props.closable || false}>
                {props.data.name}
            </Text>
            {props.closable && (
                <Tag onClick={handleClickDeleted}>
                    <FaTimes />
                </Tag>
            )}
        </Container>
    )
}

export default Knowledge
