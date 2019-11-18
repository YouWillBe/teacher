import React, { FC, useState, useRef } from 'react'
import { Text, Ring, Arc, Circle, Group, Label, Tag, Ellipse, RegularPolygon } from 'react-konva'

interface IProps {
    point: {
        x: number
        y: number
    }
    title: string
    id: number
    path: string
    avgAccuracy: number
    onClick(id: number): void
}

const Point: FC<IProps> = ({ point, title, id, onClick, path, avgAccuracy }) => {
    const labelRef = useRef(null)
    const [showLable, setShowLabel] = useState(false)
    const handleMouseEnter = () => {
        setShowLabel(true)
    }
    const handleMouseLeave = () => {
        setShowLabel(false)
    }
    const handleMouseDown = () => {
        onClick(id)
    }
    return (
        <>
            <Group
                title={title}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
            >
                {path.length === 1 ? (
                    <>
                        <Ellipse
                            x={point.x}
                            y={point.y}
                            radiusX={80}
                            radiusY={12}
                            stroke='#fff'
                            strokeWidth={1}
                            rotation={45}
                        ></Ellipse>
                        <Ellipse
                            x={point.x}
                            y={point.y}
                            radiusX={80}
                            radiusY={12}
                            stroke='#fff'
                            strokeWidth={1}
                            rotation={-45}
                        ></Ellipse>
                    </>
                ) : path.length === 3 ? (
                    <RegularPolygon
                        sides={3}
                        x={point.x}
                        y={point.y}
                        strokeWidth={1}
                        stroke='#fff'
                        radius={60}
                    ></RegularPolygon>
                ) : null}
                {path.length <= 5 ? (
                    <Circle
                        x={point.x}
                        y={point.y}
                        radius={path.length === 1 ? 60 : path.length === 3 ? 46 : 34}
                        fill='#000'
                        stroke='#fff'
                        strokeWidth={1}
                    ></Circle>
                ) : null}

                <Ring
                    x={point.x}
                    y={point.y}
                    innerRadius={15}
                    outerRadius={path.length === 1 ? 54 : path.length === 3 ? 42 : path.length === 5 ? 29 : 26}
                    fill='#333'
                ></Ring>
                <Arc
                    x={point.x}
                    y={point.y}
                    innerRadius={path.length === 1 ? 40 : path.length === 3 ? 30 : path.length === 5 ? 20 : 16}
                    outerRadius={path.length === 1 ? 54 : path.length === 3 ? 42 : path.length === 5 ? 29 : 26}
                    angle={(360 * avgAccuracy) / 100}
                    fill={
                        avgAccuracy < 60
                            ? '#EF6666'
                            : avgAccuracy < 80
                            ? '#E7AD07'
                            : avgAccuracy < 90
                            ? '#46B0B2'
                            : '#0A9B47'
                    }
                    rotation={90}
                ></Arc>
                <Circle
                    x={point.x}
                    y={point.y}
                    radius={path.length === 1 ? 40 : path.length === 3 ? 30 : 20}
                    fill='#000'
                ></Circle>
                <Text
                    text={`${avgAccuracy.toFixed(0)}%`}
                    x={path.length === 1 ? point.x - 29 : path.length === 3 ? point.x - 18 : point.x - 12}
                    y={path.length === 1 ? point.y - 12 : path.length === 3 ? point.y - 8 : point.y - 5}
                    fill='#fff'
                    fontSize={path.length === 1 ? 30 : path.length === 3 ? 20 : path.length === 5 ? 14 : 12}
                ></Text>
                {showLable ? (
                    <Label x={point.x + 24} y={point.y} ref={labelRef} width={100}>
                        <Tag
                            pointerDirection='left'
                            fill='#ddedf1'
                            pointerWidth={10}
                            pointerHeight={10}
                            stroke='#3A93DF'
                            strokeWidth={2}
                            cornerRadius={4}
                        ></Tag>
                        <Text
                            text={title}
                            fill='#3A93DF'
                            padding={10}
                            fontSize={path.length === 1 ? 22 : path.length === 3 ? 16 : 14}
                        ></Text>
                    </Label>
                ) : null}
            </Group>
        </>
    )
}

export default Point
