import React, { FC, MouseEvent } from 'react'
import styled from '@emotion/styled'
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaStrikethrough,
    FaListOl,
    FaListUl,
    FaRegImage,
    // FaTable,
    FaCode,
    // FaUndo,
    // FaRedo,
} from 'react-icons/fa'
import { GiOmega } from 'react-icons/gi'
import { Value } from 'slate'

import Button from '../ButtonX'
import ButtonGroup from '../ButtonX/ButtonGroup'

const Container = styled.div`
    position: sticky;
    top: 0px;
    background-color: #fff;
    z-index: 2;
`

interface IProps {
    hasMark(type: string): boolean
    onClickMark(event: MouseEvent, type: string): void
    onClickBlock(event: MouseEvent, type: string): void
    onClickInline: (event: MouseEvent, type: string) => void
    hasBlock: (type: string) => boolean
    value: Value
}

const ToolBar: FC<IProps> = ({ hasMark, onClickMark, hasBlock, value, onClickBlock, onClickInline }) => {
    const checkBlockActive = (type: string) => {
        let isActive = hasBlock(type)

        if (['numbered-list', 'bulleted-list'].includes(type)) {
            const { document, blocks } = value

            if (blocks.size > 0) {
                const parent = document.getParent(blocks.first().key)
                // @ts-ignore
                isActive = hasBlock('list-item') && parent && parent.type === type
            }
        }
        return isActive
    }
    return (
        <Container>
            <ButtonGroup>
                <Button title='粗体' active={hasMark('bold')} onClick={event => onClickMark(event, 'bold')}>
                    <FaBold />
                </Button>
                <Button title='斜体' active={hasMark('italic')} onClick={event => onClickMark(event, 'italic')}>
                    <FaItalic />
                </Button>
                <Button
                    title='下划线'
                    active={hasMark('underlined')}
                    onClick={event => onClickMark(event, 'underlined')}
                >
                    <FaUnderline />
                </Button>
                <Button
                    title='删除线'
                    active={hasMark('strikethrough')}
                    onClick={event => onClickMark(event, 'strikethrough')}
                >
                    <FaStrikethrough />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button
                    title='有序列表'
                    active={checkBlockActive('numbered-list')}
                    onClick={event => onClickBlock(event, 'numbered-list')}
                >
                    <FaListOl />
                </Button>
                <Button
                    title='无序列表'
                    active={checkBlockActive('bulleted-list')}
                    onClick={event => onClickBlock(event, 'bulleted-list')}
                >
                    <FaListUl />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button title='图片' active={hasMark('image')} onClick={event => onClickInline(event, 'image')}>
                    <FaRegImage />
                </Button>
                {/*<Button title='表格' active={hasMark('table')} onClick={event => onClickBlock(event, 'table')}>*/}
                {/*    <FaTable />*/}
                {/*</Button>*/}
                <Button title='代码' active={hasMark('code')} onClick={event => onClickMark(event, 'code')}>
                    <FaCode />
                </Button>
                <Button title='公式' active={hasMark('formula')} onClick={event => onClickInline(event, 'formula')}>
                    <GiOmega />
                </Button>
            </ButtonGroup>
            {/*<ButtonGroup>*/}
            {/*    <Button title='撤销' active={hasMark('undo')} onClick={event => onClickMark(event, 'undo')}>*/}
            {/*        <FaUndo />*/}
            {/*    </Button>*/}
            {/*    <Button title='重做' active={hasMark('redo')} onClick={event => onClickMark(event, 'redo')}>*/}
            {/*        <FaRedo />*/}
            {/*    </Button>*/}
            {/*</ButtonGroup>*/}
        </Container>
    )
}

export default ToolBar
