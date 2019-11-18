import React, { FC, useState } from 'react'
import { Shape, Circle, Text } from 'react-konva'

import { getPoints } from '../../../utils/getPonits'
import { rotateTransform } from '../../../utils/rotateTransform'

import Point from './Point'
import Connector from './Connector'
import Highlight from './Highlight'
import HighlightPoint from './HighlightPoint'

interface IProps {
    text: string
    data: Node[]
}

interface Point {
    x: number
    y: number
}

interface Node {
    id: number
    index: number
    name: string
    path: string
    rotate: number
    absoluteCorner: Point
    absoluteDelta: Point
    parentAbsoluteDelta: Point
    parentId: number
    avgAccuracy: number
}

const CenterPointer: FC<IProps> = ({ text, data }) => {
    const [showBacktrace, setShowBacktrace] = useState(false)
    const [backtracePointList, setBacktracePointList] = useState<Node[]>([])
    const center = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    }
    const x = window.innerWidth / 2,
        y = window.innerHeight / 2,
        r = 200
    const [points] = useState(getPoints(r, x, y))
    const findAllPoints = (node: Node): Node[] => {
        if (node.parentId === 0) {
            return [node]
        } else {
            const parentNode = data.filter(v => v.id === node.parentId)[0]
            return [node, ...findAllPoints(parentNode)]
        }
    }
    const handleClickNode = (id: Number) => {
        const node = data.filter(v => v.id === id)[0]
        if (!showBacktrace) {
            const nodes = findAllPoints(node)
            setBacktracePointList(nodes)
            setShowBacktrace(true)
        } else if (id === backtracePointList[0].id) {
            setShowBacktrace(false)
            setBacktracePointList([])
        } else {
            const nodes = findAllPoints(node)
            setBacktracePointList(nodes)
        }
    }
    return (
        <>
            <Shape
                sceneFunc={(context, shape) => {
                    context.beginPath()
                    context.moveTo(points[0].x, points[0].y)
                    context.lineTo(points[2].x, points[2].y)
                    context.lineTo(points[4].x, points[4].y)
                    context.lineTo(points[6].x, points[6].y)
                    context.lineTo(points[1].x, points[1].y)
                    context.lineTo(points[3].x, points[3].y)
                    context.lineTo(points[5].x, points[5].y)
                    context.lineTo(points[0].x, points[0].y)
                    context.closePath()
                    context.fillStrokeShape(shape)
                }}
                stroke='#3A4760'
                strokeWidth={4}
            />
            <Circle x={x} y={y} radius={100} fill='#0DC2A5'></Circle>
            <Text text={text} x={x} y={y} fill='#fff' offsetX={60} offsetY={14} fontSize={32}></Text>
            {data
                .filter(x => x.path.length > 1)
                .map(v => (
                    <Connector
                        key={v.path}
                        point={rotateTransform(center, v.absoluteDelta, v.rotate)}
                        parent={rotateTransform(center, v.parentAbsoluteDelta, v.rotate)}
                        corner={rotateTransform(center, v.absoluteCorner, v.rotate)}
                    ></Connector>
                ))}
            {data.map(v => (
                <Point
                    key={v.path}
                    point={rotateTransform(center, v.absoluteDelta, v.rotate)}
                    title={v.name}
                    id={v.id}
                    onClick={handleClickNode}
                    path={v.path}
                    avgAccuracy={v.avgAccuracy}
                ></Point>
            ))}
            {showBacktrace
                ? backtracePointList
                      .filter(x => x.path.length > 1)
                      .map(v => (
                          <Highlight
                              key={v.path}
                              point={rotateTransform(center, v.absoluteDelta, v.rotate)}
                              parent={rotateTransform(center, v.parentAbsoluteDelta, v.rotate)}
                              corner={rotateTransform(center, v.absoluteCorner, v.rotate)}
                          ></Highlight>
                      ))
                : null}
            {showBacktrace
                ? backtracePointList.map(v => (
                      <HighlightPoint
                          key={v.path}
                          point={rotateTransform(center, v.absoluteDelta, v.rotate)}
                          title={v.name}
                          id={v.id}
                          onClick={handleClickNode}
                          path={v.path}
                          avgAccuracy={v.avgAccuracy}
                      ></HighlightPoint>
                  ))
                : null}
        </>
    )
}

export default CenterPointer
