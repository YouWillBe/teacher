import React, { forwardRef, Ref, useState, useRef } from 'react'
import styled from '@emotion/styled'
import { RenderInlineProps } from 'slate-react'
import { Resizable, ResizeCallback } from 're-resizable'
import useOnClickOutside from 'use-onclickoutside'

const MyResizable = styled(Resizable)<{ showBorder: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    overflow: hidden;
    padding: 2px;
    border: 1px solid ${props => (props.showBorder ? '#ddd' : 'transparent')};
`
const Container = styled.span`
    margin-left: 5px;
    margin-right: 5px;
`

interface IProps {
    src: string
    height: number
    isReadOnly: boolean | undefined
}
const Image = forwardRef((props: IProps & RenderInlineProps, ref: Ref<HTMLSpanElement>) => {
    const wrapRef = useRef(null)
    const [showBorder, setShowBorder] = useState(false)
    const handleClick = () => {
        if (props.isReadOnly) {
            setShowBorder(false)
        } else {
            setShowBorder(true)
        }
    }
    const handleResize: ResizeCallback = (event, direction, refToElement, delta) => {
        props.editor.setNodeByKey(props.node.key, {
            type: 'image',
            data: {
                ...props.node.toJSON().data,
                height: delta.height + props.height,
            },
        })
    }
    useOnClickOutside(wrapRef, () => {
        setShowBorder(false)
    })
    return (
        <Container {...props.attributes} ref={ref}>
            <MyResizable
                lockAspectRatio
                maxWidth='100%'
                minHeight={50}
                showBorder={showBorder}
                onResizeStop={handleResize}
                defaultSize={{
                    width: 'auto',
                    height: props.height + 200,
                }}
                enable={
                    props.isReadOnly
                        ? {
                              top: false,
                              right: false,
                              bottom: false,
                              left: false,
                              topRight: false,
                              bottomRight: false,
                              bottomLeft: false,
                              topLeft: false,
                          }
                        : {
                              top: true,
                              right: true,
                              bottom: true,
                              left: true,
                              topRight: true,
                              bottomRight: true,
                              bottomLeft: true,
                              topLeft: true,
                          }
                }
            >
                <img src={props.src} alt='' style={{ height: '100%' }} onClick={handleClick} ref={wrapRef} />
            </MyResizable>
        </Container>
    )
})

export default Image
