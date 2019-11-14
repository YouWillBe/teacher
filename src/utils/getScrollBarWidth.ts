export default function getScrollBarWidth(): number {
    const inner = document.createElement('div')
    inner.style.width = '100%'
    inner.style.height = '200px'

    const outer = document.createElement('div')
    outer.style.position = 'absolute'
    outer.style.top = '0'
    outer.style.left = '0'
    outer.style.pointerEvents = 'none'
    outer.style.visibility = 'hidden'
    outer.style.width = '200px'
    outer.style.height = '150px'
    outer.style.overflow = 'hidden'

    outer.appendChild(inner)
    document.body.appendChild(outer)

    const widthContained = inner.offsetWidth
    outer.style.overflow = 'scroll'
    let widthScroll = inner.offsetWidth

    if (widthContained === widthScroll) {
        widthScroll = outer.clientWidth
    }

    document.body.removeChild(outer)
    return widthContained - widthScroll
}
