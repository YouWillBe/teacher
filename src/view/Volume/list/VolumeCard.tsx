import React, { useState, FC, MouseEvent } from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { take } from 'ramda'
import { FaMinusCircle } from 'react-icons/fa'

import Popconfirm from '../../../components/Popconfirm'

const Container = styled.div`
    height: 210px;
    width: 210px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 13px 1px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border-color 0.1s linear;
    &:hover {
        border-color: #3a93df;
        box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    }
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    user-select: none;
    position: relative;
`
const Title = styled.div`
    height: 50px;
    line-height: 50px;
    font-weight: 700;
    color: #555;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
`
const LoreTitle = styled.div`
    width: 100%;
    position: relative;
    height: 20px;
    margin-bottom: 12px;
`
const LoreTitleText = styled.div`
    width: 80px;
    position: absolute;
    z-index: 2;
    background-color: #fff;
    text-align: center;
    left: 50%;
    margin-left: -40px;
    font-size: 12px;
    color: #777;
    line-height: 20px;
`
const Line = styled.div`
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: #ccc;
    top: 11px;
    z-index: 1;
`
const LoreWrap = styled.div`
    flex-grow: 1;
    width: 100%;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`
const Lore = styled.div`
    padding: 8px 10px;
    height: 35px;
    width: 100%;
    text-align: center;
    border: 1px solid rgba(58, 147, 223, 1);
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 12px;
    background-color: rgba(221, 237, 241, 1);
    color: #3a93df;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`
const Remove = styled.div`
    position: absolute;
    height: 30px;
    width: 30px;
    right: 2px;
    top: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #777;
    &:hover {
        color: red;
    }
`
// const ConfirmWrap = styled.div`
//     width: 120px;
//     background-color: #fff;
//     position: absolute;
//     z-index: 10;
//     bottom: -44px;
//     display: flex;
//     padding: 8px 3px;
//     border-radius: 6px;
//     box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
//     cursor: initial;
// `
// const Button = styled.div`
//     padding: 6px 12px;
//     background-color: fff;
//     margin-left: 5px;
//     margin-right: 5px;
//     font-size: 12px;
//     color: #555;
//     border-radius: 4px;
//     border: 1px solid #555;
//     cursor: pointer;
//     &:hover {
//         border-color: #00a6f3;
//         color: #00a6f3;
//     }
// `
// const RedButton = styled(Button)`
//     border-color: red;
//     color: red;
//     &:hover {
//         background-color: red;
//         color: #fff;
//         border-color: red;
//     }
// `

// interface IConfirmProps {
//     close(): void
//     confirm(): void
// }

// const Confirm: FC<IConfirmProps> = props => {
//     const ref = useRef(null)
//     useOnClickOutside(ref, props.close)
//     const handleConfirm = () => {
//         props.confirm()
//     }
//     const handleClose = () => {
//         props.close()
//     }
//     return (
//         <ConfirmWrap ref={ref}>
//             <RedButton onClick={handleConfirm}>删除</RedButton>
//             <Button onClick={handleClose}>取消</Button>
//         </ConfirmWrap>
//     )
// }

interface IProps {
    data: {
        id: number
        name: string
        loreList: ILore[]
    }
    deleteVolume(id: number): void
}
interface ILore {
    id: number
    name: string
}

const VolumeCard: FC<IProps> = props => {
    const [showRemove, setShowRemove] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const handleMouseEnter = () => {
        setShowRemove(true)
    }
    const handleMouseLeave = () => {
        if (!showConfirm) {
            setShowRemove(false)
        }
    }
    const handleClickRemove = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        setShowConfirm(true)
    }
    const handleCloseConfirm = () => {
        setShowConfirm(false)
        setShowRemove(false)
    }
    const handleConfirm = () => {
        props.deleteVolume(props.data.id)
        setShowConfirm(false)
        setShowRemove(false)
    }

    const handleClickLink = () => {
        sessionStorage.removeItem('sessionCurrentType')
        navigate(`/see/volume/${props.data.id}`)
    }
    return (
        <Container onClick={handleClickLink} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {showRemove && (
                <Remove onClick={handleClickRemove}>
                    {showConfirm && <Popconfirm close={handleCloseConfirm} confirm={handleConfirm}></Popconfirm>}
                    <FaMinusCircle title='删除试卷'></FaMinusCircle>
                </Remove>
            )}
            <Title title={props.data.name}>{props.data.name}</Title>
            <LoreTitle>
                <LoreTitleText>知识点</LoreTitleText>
                <Line />
            </LoreTitle>
            <LoreWrap>
                {props.data.loreList &&
                    take(2, props.data.loreList).map((v, i) => (
                        <Lore key={i} title={v.name}>
                            {v.name}
                        </Lore>
                    ))}
            </LoreWrap>
        </Container>
    )
}

export default VolumeCard
