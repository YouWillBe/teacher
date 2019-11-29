import React, { useRef, useEffect, useState, FC, MouseEventHandler } from 'react'
import styled from '@emotion/styled'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import { FaPlayCircle } from 'react-icons/fa'

import FullScreenControlBar from './FullScreenControlBar'
import ControlBar from './ControlBar'

const Container = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    border-bottom-left-radius: 2px;
    user-select: none;
`
const ContentWrap = styled.div`
    flex-grow: 0;
    width: 100%;
    height: calc(100% - 30px);
    background-color: #000;
    cursor: pointer;
    position: relative;
`
const PlayTag = styled.div`
    top: 50%;
    left: 50%;
    margin-top: -31px;
    margin-left: -31px;
    width: 62px;
    height: 62px;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    opacity: 0.5;
    z-index: 10;
`

function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef<() => void>()
    useEffect(() => {
        savedCallback.current = callback
    })
    useEffect(() => {
        function tick() {
            savedCallback.current && savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}

interface IProps {
    url: string
    onClick(): void
}
const Video: FC<IProps> = props => {
    const [playing, setPlaying] = useState(false)
    const [played, setPlayed] = useState(0)
    const [duration, setDuration] = useState(0)
    const [seeking, setSeeking] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [volume, setVolume] = useState(100)
    const [count, setCount] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [showControl, setShowControl] = useState(true)
    useInterval(
        () => {
            setCount(count + 1)
        },
        isRunning ? 1000 : null
    )
    const playerRef = useRef<ReactPlayer>(null)
    const wrapRef = useRef<HTMLDivElement>(null)
    const handleClick = () => {
        setPlaying(!playing)
        props.onClick()
    }
    const handleRightClick: MouseEventHandler = e => {
        e.preventDefault()
    }
    const handleEnded = () => {
        setPlaying(false)
    }
    const handleClickFullscreen = () => {
        if (wrapRef.current) {
            if (screenfull.isEnabled) {
                screenfull.toggle(wrapRef.current)
            }
        }
        if (screenfull.isEnabled) {
            screenfull.on('change', handleChangeFullScreen)
        }
        setIsFullScreen(true)
        setCount(0)
        setIsRunning(true)
    }
    const handleChangeFullScreen = () => {
        if (screenfull.isEnabled && !screenfull.isFullscreen) {
            screenfull.off('change', handleChangeFullScreen)
            setIsFullScreen(false)
            setIsRunning(false)
        }
    }
    const handleProgress = ({ played }: { played: number }) => {
        if (seeking) return
        setPlayed(played)
    }
    const handleDuration = (duration: number) => {
        setDuration(duration)
    }
    const handleBeforeChange = () => {
        setSeeking(true)
    }
    const handleAfterChange = (value: number) => {
        playerRef.current && playerRef.current.seekTo(value)
    }
    const handleChange = (value: number) => {
        setPlayed(value)
    }
    const handleSeek = () => {
        setSeeking(false)
    }
    const handleChangeVolume = (value: number) => {
        setVolume(value)
    }
    const handleMouseMove = () => {
        if (isFullScreen) {
            setCount(0)
            setIsRunning(true)
        } else {
            setIsRunning(false)
        }
    }
    useEffect(() => {
        if (count >= 5) {
            setIsRunning(false)
            setShowControl(false)
        } else {
            setShowControl(true)
        }
    }, [count])
    return (
        <Container>
            <ContentWrap ref={wrapRef} onMouseMove={handleMouseMove}>
                {!playing && (
                    <PlayTag onClick={handleClick}>
                        <FaPlayCircle />
                    </PlayTag>
                )}
                <ReactPlayer
                    onClick={handleClick}
                    url={props.url}
                    playing={playing}
                    width='100%'
                    height='100%'
                    ref={playerRef}
                    onContextMenu={handleRightClick}
                    onEnded={handleEnded}
                    onProgress={handleProgress}
                    onDuration={handleDuration}
                    controls={false}
                    onSeek={handleSeek}
                    volume={volume / 100}
                />
                {isFullScreen && showControl && (
                    <FullScreenControlBar
                        playing={playing}
                        handlePlay={handleClick}
                        played={played}
                        onBeforeChange={handleBeforeChange}
                        onChange={handleChange}
                        onAfterChange={handleAfterChange}
                        duration={duration}
                        volume={volume}
                        onChangeVolume={handleChangeVolume}
                        onClickFullscreen={handleClickFullscreen}
                    />
                )}
            </ContentWrap>
            <ControlBar
                playing={playing}
                handlePlay={handleClick}
                played={played}
                onBeforeChange={handleBeforeChange}
                onChange={handleChange}
                onAfterChange={handleAfterChange}
                duration={duration}
                volume={volume}
                onChangeVolume={handleChangeVolume}
                onClickFullscreen={handleClickFullscreen}
            />
        </Container>
    )
}

export default Video
