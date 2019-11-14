import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import Notice from './notice'

const TransitionGroupWrap = styled.div`
    position: fixed;
    top: 20px;
    left: 50%;
    z-index: 1600;
    transform: translateX(-50px);
`

class Notification extends Component {
    constructor() {
        super()
        this.transitionTime = 300
        this.state = { notices: [] }
        this.removeNotice = this.removeNotice.bind(this)
    }

    getNoticeKey() {
        const { notices } = this.state
        return `notice-${new Date().getTime()}-${notices.length}`
    }

    addNotice(notice) {
        const { notices } = this.state
        notice.key = this.getNoticeKey()
        if (notices.every(item => item.key !== notice.key)) {
            if (notice.length > 0 && notices[notice.length - 1].type === 'loading') {
                notices.push(notice)
                setTimeout(() => {
                    this.setState({ notices })
                }, this.transitionTime)
            } else {
                notices.push(notice)
                this.setState({ notices })
            }
            if (notice.duration > 0) {
                setTimeout(() => {
                    this.removeNotice(notice.key)
                }, notice.duration)
            }
        }
        return () => {
            this.removeNotice(notice.key)
        }
    }

    removeNotice(key) {
        const { notices } = this.state
        this.setState({
            notices: notices.filter(notice => {
                if (notice.key === key) {
                    if (notice.onClose) setTimeout(notice.onClose, this.transitionTime)
                    return false
                }
                return true
            }),
        })
    }

    render() {
        const { notices } = this.state
        return (
            <TransitionGroupWrap>
                {notices.map(notice => (
                    <Notice key={notice.key} {...notice} />
                ))}
            </TransitionGroupWrap>
        )
    }
}

function createNotification() {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const ref = React.createRef()
    ReactDOM.render(<Notification ref={ref} />, div)
    return {
        addNotice(notice) {
            return ref.current.addNotice(notice)
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        },
    }
}

export default createNotification()
