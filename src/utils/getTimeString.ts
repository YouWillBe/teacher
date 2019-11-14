function getTimeString(time: number): string {
    let hours = Math.floor(time / 3600)
    let minutes = Math.floor((time % 3600) / 60)
    let seconds = Math.round((time % 3600) % 60)
    let timeStr = ''
    if (time < 3600) {
        timeStr = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    } else {
        timeStr = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }
    return timeStr
}

export default getTimeString
