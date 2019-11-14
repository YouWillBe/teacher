export const getPoints = (r: number, x: number, y: number) => {
    let dx = x - r
    let dy = y - r
    const a = {
        x: r + dx,
        y: dy,
    }
    const b = {
        x: dx + (1 + Math.sin((2 / 7) * Math.PI)) * r,
        y: dy + (1 - Math.cos((2 / 7) * Math.PI)) * r,
    }
    const c = {
        x: dx + (1 + Math.sin((3 / 7) * Math.PI)) * r,
        y: dy + (1 + Math.cos((3 / 7) * Math.PI)) * r,
    }
    const d = {
        x: dx + (1 + Math.cos((5 / 14) * Math.PI)) * r,
        y: dy + (1 + Math.sin((5 / 14) * Math.PI)) * r,
    }
    const e = {
        x: dx + (1 - Math.cos((5 / 14) * Math.PI)) * r,
        y: dy + (1 + Math.sin((5 / 14) * Math.PI)) * r,
    }
    const f = {
        x: dx + (1 - Math.sin((3 / 7) * Math.PI)) * r,
        y: dy + (1 + Math.cos((3 / 7) * Math.PI)) * r,
    }
    const g = {
        x: dx + (1 - Math.sin((2 / 7) * Math.PI)) * r,
        y: dy + (1 - Math.cos((2 / 7) * Math.PI)) * r,
    }
    return [a, b, c, d, e, f, g]
}
