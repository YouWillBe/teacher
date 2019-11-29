import React, { useState, FC } from 'react'
import styled from '@emotion/styled'
import ReactSlider from 'react-slider'
import { FaVolumeUp, FaVolumeDown, FaVolumeMute } from 'react-icons/fa'

const Wrap = styled.div`
    position: relative;
    color: #99a2aa;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    &:hover {
        background-color: rgba(204, 204, 204, 0.1);
        box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    }
`
const Panel = styled.div<{ show: boolean }>`
    display: ${props => (props.show ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    width: 30px;
    height: 100px;
    background-color: #fff;
    border-radius: 4px;
    top: -100px;
    border: 1px solid #e2e2e2;
    box-sizing: border-box;
    padding-top: 2px;
    padding-bottom: 5px;
`
const Slider = styled(ReactSlider)`
    width: 28px;
    height: 100%;
    cursor: pointer;
    & .handle {
        left: 50%;
        margin-left: -7px;
        background-color: #fff;
    }
    & .bar-0 {
        width: 6px;
        background-color: #00a1d6;
        left: 50%;
        margin-left: -3px;
        border-radius: 4px;
    }
    & .bar-1 {
        background-color: #e5e9ef;
        width: 6px;
        left: 50%;
        margin-left: -3px;
        border-radius: 4px;
    }
`
const Handler = styled.div`
    height: 14px;
    width: 14px;
    border-radius: 50%;
    box-shadow: 0 0 3px #017cc3;
    cursor: pointer;
    z-index: 11;
    &:hover {
        box-shadow: 0 0 5px #017cc3;
    }
`
const Number = styled.div`
    font-size: 12px;
    text-align: center;
    margin-bottom: 3px;
`
const TagWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

interface IProps {
    value: number
    onChange(value: number | number[] | null | undefined): void
    onBeforeChange?(): void
    onAfterChange?(): void
}

const FullScreenVolume: FC<IProps> = props => {
    const [showPanel, setShowPanel] = useState(false)
    const [prev, setPrev] = useState(0)
    const handleClick = () => {
        if (props.value === 0) {
            props.onChange(prev)
        } else {
            setPrev(props.value)
            props.onChange(0)
        }
    }
    const handleMouseEnter = () => {
        setShowPanel(true)
    }
    const handleMouseLeave = () => {
        setShowPanel(false)
    }
    return (
        <Wrap onMouseDown={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Panel show={showPanel}>
                <Number>{props.value}</Number>
                <Slider
                    invert
                    orientation='vertical'
                    value={props.value}
                    defaultValue={100}
                    withBars
                    onBeforeChange={props.onBeforeChange}
                    onChange={props.onChange}
                    onAfterChange={props.onAfterChange}
                >
                    <Handler />
                </Slider>
            </Panel>
            {props.value > 50 ? (
                <TagWrap>
                    <FaVolumeUp />
                </TagWrap>
            ) : props.value > 0 ? (
                <TagWrap>
                    <FaVolumeDown />
                </TagWrap>
            ) : (
                <TagWrap>
                    <FaVolumeMute />
                </TagWrap>
            )}
        </Wrap>
    )
}

export default FullScreenVolume
