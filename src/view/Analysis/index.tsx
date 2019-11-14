import React, { FC, useState, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { Stage, Layer } from 'react-konva'
import { KonvaEventObject } from 'konva/types/Node'
import { RouteComponentProps, Link } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../store'

import CenterPoint from './CenterPoint'
import Spinner from '../../components/Spinner'

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #000;
    & > div {
        background-color: #000;
    }
`
const Button = styled(Link)`
    color: #ccc;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.1s linear;
    background-color: #000;
    z-index: 11;
    &:hover {
        color: #ccc;
        border-color: #ccc;
    }
`

const App: FC<RouteComponentProps> = () => {
    const [scale, setScale] = useState(1)
    const { analysisStore } = useContext<IStore>(MobXProviderContext)
    const handleScale = (event: KonvaEventObject<WheelEvent>) => {
        if (event.evt.deltaY < 0) {
            if (scale <= 2) {
                setScale(scale + 0.2)
            }
        } else {
            if (scale >= 0.6) {
                setScale(scale - 0.2)
            }
        }
    }
    useEffect(() => {
        analysisStore.getKnowleggePoint()
        // eslint-disable-next-line
    }, [])
    return useObserver(() => (
        <Container>
            <Button to='/'>返回首页</Button>
            {analysisStore.nodesReady ? (
                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight}
                    scale={{ x: scale, y: scale }}
                    draggable
                    onWheel={handleScale}
                >
                    <Layer>
                        <CenterPoint text='高中数学' data={analysisStore.nodes} />
                    </Layer>
                </Stage>
            ) : (
                <Spinner></Spinner>
            )}
        </Container>
    ))
}

export default App
