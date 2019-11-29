import { FC, useEffect } from 'react'
import ReactDOM from 'react-dom'

const modalRoot = document.body
const el = document.createElement('div')

const Modal: FC = props => {
    useEffect(() => {
        //添加元素
        modalRoot.appendChild(el)

        //移除元素
        return () => {
            modalRoot.removeChild(el)
        }
    }, [])
    /*
        Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。
        第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。
        第二个参数（container）是一个 DOM 元素。
    */
    return ReactDOM.createPortal(props.children, el)
}

export default Modal
