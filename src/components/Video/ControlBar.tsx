import React, { FC, MouseEventHandler } from 'react'
import styled from '@emotion/styled'
import ReactSlider from 'react-slider'
import { FaPlay, FaPause, FaExpand, FaMinus } from 'react-icons/fa'

import getTimeString from '../../utils/getTimeString'

import Volume from './Volume'

const Wrap = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #e5e9ef;
    box-sizing: border-box;
`
const Button = styled.div`
    color: #99a2aa;
    height: 30px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-bottom-left-radius: 2px;
    &:hover {
        background-color: #f4f5f7;
        color: #6d757a;
    }
`
const ProgressBar = styled.div`
    flex-grow: 1;
    box-sizing: border-box;
    padding-left: 8px;
    padding-right: 8px;
`
const Slider = styled(ReactSlider)`
    height: 28px;
    width: 100%;
    cursor: pointer;
    & .handle {
        top: 50%;
        margin-top: -7px;
        background-color: #fff;
        border-radius: 50%;
    }
    & .bar-0 {
        height: 6px;
        background-color: #00a1d6;
        top: 50%;
        margin-top: -3px;
        border-radius: 4px;
    }
    & .bar-1 {
        background-color: #e5e9ef;
        height: 6px;
        top: 50%;
        margin-top: -3px;
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
const Time = styled.div`
    color: #99a2aa;
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
`
const Slash = styled.div`
    color: #99a2aa;
    font-size: 12px;
    transform: rotate(-65deg);
`

interface IProps {
    playing: boolean
    played: number
    duration: number
    volume: number
    onBeforeChange(): void
    onChange(value: number | number[] | null | undefined): void
    onAfterChange(value: number | number[] | null | undefined): void
    onChangeVolume(value: number): void
    handlePlay: MouseEventHandler
    onClickFullscreen: MouseEventHandler
}

const ControlBar: FC<IProps> = props => {
    return (
        <Wrap>
            {props.playing ? (
                <Button onClick={props.handlePlay}>
                    <FaPause />
                </Button>
            ) : (
                <Button onClick={props.handlePlay}>
                    <FaPlay />
                </Button>
            )}
            <ProgressBar onContextMenu={e => e.preventDefault()}>
                <Slider
                    value={props.played}
                    defaultValue={0}
                    withBars
                    min={0}
                    max={1}
                    step={0.001}
                    onBeforeChange={props.onBeforeChange}
                    onChange={props.onChange}
                    onAfterChange={props.onAfterChange}
                >
                    <Handler />
                </Slider>
            </ProgressBar>
            <Time>{getTimeString(props.duration * props.played)}</Time>
            <Slash>
                <FaMinus />
            </Slash>
            <Time>{getTimeString(props.duration)}</Time>
            <Volume value={props.volume} onChange={props.onChangeVolume} />
            <Button onClick={props.onClickFullscreen}>
                <FaExpand />
            </Button>
        </Wrap>
    )
}

export default ControlBar
