import React, { Component } from 'react'
import styled from '@emotion/styled'
import Notice from './Notice'

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
        return (
            <TransitionGroupWrap>
                {this.state.notices.map(notice => (
                    <Notice key={notice.key} {...notice} />
                ))}
            </TransitionGroupWrap>
        )
    }
}

export default Notification
