import React, { FC } from 'react'
import KaTeX, { KatexOptions } from 'katex'
import { omit } from 'ramda'

interface IProps {
    math: string
    block?: boolean
    errorColor?: string
    settings: KatexOptions
}


const TeX: FC<IProps> = props => {
    const otherProps = omit(['children', 'math', 'block', 'errorColor', 'settings'], props)
    const Component = props.block ? 'div' : 'span'
    const html = KaTeX.renderToString(
        props.math,
        Object.assign(
            {},
            {
                displayMode: !!props.block,
                errorColor: props.errorColor,
                throwOnError: false,
            },
            props.settings
        )
    )

    return <Component {...otherProps} dangerouslySetInnerHTML={{ __html: html }} />
}

export default TeX
