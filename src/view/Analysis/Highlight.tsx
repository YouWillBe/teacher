import React, { FC } from 'react'
import { Line } from 'react-konva'

interface Point {
    x: number
    y: number
}

interface IProps {
    point: Point
    parent: Point
    corner: Point
}

const Hightlight: FC<IProps> = ({ point, parent, corner }) => {
    return (
        <Line points={[point.x, point.y, corner.x, corner.y, parent.x, parent.y]} strokeWidth={5} stroke='#fff'></Line>
    )
}

export default Hightlight
