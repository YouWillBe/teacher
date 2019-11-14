interface Point {
    x: number
    y: number
}

export const rotateTransform = (center: Point, delta: Point, rotate: number): Point => {
    switch (rotate) {
        case 0:
            return {
                x: center.x - delta.x,
                y: center.y - delta.y,
            }
        case 1:
            return {
                x: center.x + (delta.y * Math.sin((2 / 7) * Math.PI) - delta.x * Math.cos((2 / 7) * Math.PI)),
                y: center.y - (delta.y * Math.cos((2 / 7) * Math.PI) + delta.x * Math.sin((2 / 7) * Math.PI)),
            }
        case -1:
            return {
                x: center.x + (delta.y * Math.sin(-(2 / 7) * Math.PI) - delta.x * Math.cos(-(2 / 7) * Math.PI)),
                y: center.y - (delta.y * Math.cos(-(2 / 7) * Math.PI) + delta.x * Math.sin(-(2 / 7) * Math.PI)),
            }
        case 2:
            return {
                x: center.x + (delta.y * Math.sin((4 / 7) * Math.PI) - delta.x * Math.cos((4 / 7) * Math.PI)),
                y: center.y - (delta.y * Math.cos((4 / 7) * Math.PI) + delta.x * Math.sin((4 / 7) * Math.PI)),
            }
        case -2:
            return {
                x: center.x + (delta.y * Math.sin(-(4 / 7) * Math.PI) - delta.x * Math.cos(-(4 / 7) * Math.PI)),
                y: center.y - (delta.y * Math.cos(-(4 / 7) * Math.PI) + delta.x * Math.sin(-(4 / 7) * Math.PI)),
            }
        case 3:
            return {
                x: center.x + (delta.y * Math.sin((6 / 7) * Math.PI) - delta.x * Math.cos((6 / 7) * Math.PI)),
                y: center.y - (delta.y * Math.cos((6 / 7) * Math.PI) + delta.x * Math.sin((6 / 7) * Math.PI)),
            }
        case -3:
            return {
                x: center.x + (delta.y * Math.sin(-(6 / 7) * Math.PI) - delta.x * Math.cos(-(6 / 7) * Math.PI)),
                y: center.y - (delta.y * Math.cos(-(6 / 7) * Math.PI) + delta.x * Math.sin(-(6 / 7) * Math.PI)),
            }
        default:
            return {
                x: center.x - delta.x,
                y: center.y - delta.y,
            }
    }
}
