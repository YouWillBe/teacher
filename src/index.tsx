import React from 'react'
import { render } from 'react-dom'
import { MobXProviderContext } from 'mobx-react'
import { Global, css } from '@emotion/core'
import { BrowserRouter } from 'react-router-dom'

import App from './view/App'

import * as serviceWorker from './serviceWorker'

import { store } from './store'

// 添加公式相关的样式
import './katex.css'
import { addStyles as addMathQuillStyles } from 'react-mathquill'
addMathQuillStyles()

const GlobalStyle = css`
    html,
    body,
    #root {
        height: 100%;
    }
    body {
        margin: 0;
    }
    ul {
        padding: 0;
        margin: 0;
    }
    a {
        text-decoration: none;
    }
    li {
        list-style-type: none;
    }
`

render(
    <>
        <MobXProviderContext.Provider value={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MobXProviderContext.Provider>
        <Global styles={GlobalStyle} />
    </>,
    document.getElementById('root')
)
serviceWorker.unregister()
