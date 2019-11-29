import React, { FC, useState, useRef, KeyboardEvent, MouseEvent } from 'react'
import styled from '@emotion/styled'
import { Editor, RenderBlockProps, RenderMarkProps, RenderInlineProps, OnChangeParam, EventHook } from 'slate-react'
import { Value, Editor as SlateEditor, SchemaProperties, Block } from 'slate'
import { isKeyHotkey } from 'is-hotkey'

import ToolBar from './ToolBar'
import ImageUploader from './Image/Uploader'
import Image from './Image'
import Formula from './Formula'

const DEFAULT_NODE = 'paragraph'

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    position: relative;
    line-height: 1.5;
`
const Blank = styled.div`
    height: 25px;
`
const ShowVacancyButton = styled.button`
    position: absolute;
    right: 0;
    top: -42px;
    box-sizing: border-box;
    display: block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 8px;
    font-size: 16px;
    font-family: PingFang-SC-Medium;
    font-weight: 600;
    color: #fff;
    border: 1px solid #fff;
    background-color: #3a93df;
    padding: 0px 16px;
    outline: none;
    cursor: pointer;
    &:hover {
        background-color: #418ccc;
    }
`
const Space = styled.span`
    display: inline-block;
    width: 60px;
    height: 18px;
    border-bottom: 2px solid #072979;
    margin: 0 8px;
`

const schema: SchemaProperties = {
    document: {
        last: { type: 'paragraph' },
        normalize: (editor, { code, node, child }) => {
            switch (code) {
                case 'last_child_type_invalid': {
                    const paragraph = Block.create('paragraph')
                    return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
                }
            }
        },
    },
    inlines: {
        image: {
            isVoid: true,
        },
        formula: {
            isVoid: true,
        },
        space: {
            isVoid: true,
        },
    },
}

interface IProps {
    value: Value
    onChange?: (value: Value) => void
    readonly?: boolean
    showVacancy?: boolean
}

const EditorX: FC<IProps> = props => {
    const [value, setValue] = useState(props.value)
    const [showToolBar, setShowToolBar] = useState(false)
    const hasMark = (type: string) => {
        return value.activeMarks.some(mark => mark!.type === type)
    }
    const hasBlock = (type: string) => {
        return value.blocks.some(node => node!.type === type)
    }
    const ref = useRef<Editor>(null)
    const uploaderRef = useRef(null)
    const onChange = ({ value }: OnChangeParam) => {
        // 聚焦时显示工具栏，失焦时隐藏工具栏
        setShowToolBar(value.selection.isFocused)
        setValue(value)
        props.onChange && props.onChange(value)
    }
    const onKeyDown: EventHook<KeyboardEvent<Element>> = (event, editor, next) => {
        let mark

        if (isBoldHotkey(event as any)) {
            mark = 'bold'
        } else if (isItalicHotkey(event as any)) {
            mark = 'italic'
        } else if (isUnderlinedHotkey(event as any)) {
            mark = 'underlined'
        } else if (isCodeHotkey(event as any)) {
            mark = 'code'
        } else {
            return next()
        }

        event.preventDefault()
        editor.toggleMark(mark)
    }
    const renderBlock = (props: RenderBlockProps, editor: SlateEditor, next: () => any) => {
        const { attributes, children, node } = props
        switch (node.type) {
            case 'bulleted-list':
                return (
                    <ul {...attributes} style={{ padding: '0 0 0 40px', margin: ' 16px 0' }}>
                        {children}
                    </ul>
                )
            case 'heading-one':
                return <h1 {...attributes}>{children}</h1>
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>
            case 'list-item':
                return (
                    <li {...attributes} style={{ listStyleType: 'inherit' }}>
                        {children}
                    </li>
                )
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>

            default:
                return next()
        }
    }
    const renderMark = (props: RenderMarkProps, editor: SlateEditor, next: () => any) => {
        const { children, mark, attributes } = props

        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{children}</strong>
            case 'code':
                return <code {...attributes}>{children}</code>
            case 'italic':
                return <em {...attributes}>{children}</em>
            case 'underlined':
                return <u {...attributes}>{children}</u>
            case 'strikethrough':
                return <del {...attributes}>{children}</del>
            default:
                return next()
        }
    }
    const renderInline = (inlineProps: RenderInlineProps, editor: SlateEditor, next: () => any) => {
        const { node } = inlineProps

        switch (node.type) {
            case 'image': {
                const src = node.data.get('src') as string
                const height = node.data.get('height') as number
                return (
                    <Image
                        {...inlineProps}
                        src={src}
                        height={height}
                        isReadOnly={props.readonly === undefined ? false : props.readonly}
                    />
                )
            }
            case 'formula': {
                const latex = node.data.get('latex') as string
                return (
                    <Formula
                        {...inlineProps}
                        latex={latex}
                        isReadOnly={props.readonly === undefined ? false : props.readonly}
                    />
                )
            }
            case 'space': {
                return <Space {...inlineProps} />
            }
            default:
                return next()
        }
    }

    // 点击工具栏中mark类型的按钮处理
    const onClickMark = (event: MouseEvent, type: string) => {
        event.preventDefault()
        ref.current!.toggleMark(type)
    }

    // 点击工具栏中block类型的按钮处理
    const onClickBlock = (event: MouseEvent, type: string) => {
        event.preventDefault()
        const editor = ref.current
        const { value } = editor as Editor
        const { document } = value
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = hasBlock(type)
            const isList = hasBlock('list-item')

            if (isList) {
                editor!
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else {
                editor!.setBlocks(isActive ? DEFAULT_NODE : type)
            }
        } else {
            const isList = hasBlock('list-item')
            const isType = value.blocks.some(block => {
                // @ts-ignore
                return !!document.getClosest(block!.key, parent => parent!.type === type)
            })

            if (isList && isType) {
                editor!
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else if (isList) {
                editor!.unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list').wrapBlock(type)
            } else {
                editor!.setBlocks('list-item').wrapBlock(type)
            }
        }
    }
    // 点击工具栏中inline类型的按钮处理
    const onClickInline = (event: MouseEvent, type: string) => {
        event.preventDefault()
        event.stopPropagation()
        const editor = ref.current
        if (type === 'image') {
            // @ts-ignore
            uploaderRef.current.click()
        } else if (type === 'formula') {
            editor!.insertInline({
                type: 'formula',
                data: { latex: 'f(x)' },
            })
        } else if (type === 'space') {
            editor!.insertInline({
                type: 'space',
            })
        }
    }
    return (
        <Container>
            {showToolBar ? (
                <ToolBar
                    value={value}
                    hasMark={hasMark}
                    hasBlock={hasBlock}
                    onClickMark={onClickMark}
                    onClickBlock={onClickBlock}
                    onClickInline={onClickInline}
                />
            ) : !props.readonly ? (
                <Blank />
            ) : null}
            {props.showVacancy && (
                <ShowVacancyButton onMouseDown={event => onClickInline(event, 'space')}>插入填空</ShowVacancyButton>
            )}
            {props.readonly ? (
                <Editor
                    placeholder='请在此输入正文'
                    value={props.value}
                    renderBlock={renderBlock}
                    renderMark={renderMark}
                    renderInline={renderInline}
                    schema={schema}
                    readOnly
                />
            ) : (
                <Editor
                    placeholder='请在此输入正文'
                    ref={ref}
                    value={props.value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    renderBlock={renderBlock}
                    renderMark={renderMark}
                    renderInline={renderInline}
                    schema={schema}
                />
            )}
            <ImageUploader editor={ref.current} ref={uploaderRef} />
        </Container>
    )
}

export default EditorX
