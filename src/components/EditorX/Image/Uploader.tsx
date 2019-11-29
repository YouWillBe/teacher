import React, { MouseEvent, ChangeEvent, forwardRef, Ref } from 'react'
import styled from '@emotion/styled'
import Cookies from 'js-cookie'
import { Editor } from 'slate-react'

const Container = styled.input`
    display: none;
`

function insertImage(editor: any, src: any, target: any) {
    if (target) {
        editor.select(target)
    }

    editor.insertInline({
        type: 'image',
        data: { src },
    })
}

interface IProps {
    editor: Editor | null
}

const Uploader = forwardRef((props: IProps, ref: Ref<HTMLInputElement>) => {
    const handleClick = (event: MouseEvent) => {
        // @ts-ignore
        event.target.value = null
    }
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target
        const file = files![0]
        console.log(file)
        const url = 'https://upload-z2.qiniup.com'
        let body = new FormData()
        body.append('file', file)
        body.append('token', Cookies.get('uploadToken') + '')
        body.append('key', new Date().getTime() + '.' + file.name.split('.').pop())
        fetch(url, {
            method: 'POST',
            body: body,
        })
            .then(res => res.json())
            .then(data => {
                props.editor!.command(insertImage, `https://img2.heartdynamic.cn/${data.key}`)
                console.log(data)
            })
    }
    return <Container onClick={handleClick} type='file' accept='image/*' onChange={handleFileUpload} ref={ref} />
})

export default Uploader
