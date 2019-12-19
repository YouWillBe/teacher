import React, { FC } from 'react'
import styled from 'styled-components'

const Li = styled.li`
    margin-right: 20px;
`
const Span = styled.span<{ isColor: boolean }>`
    display: inline-block;
    text-align: center;
    background-color: ${props => (props.isColor ? 'rgba(50, 158, 245, 1)' : '')};
    color: ${props => (props.isColor ? '#fff' : '')};
    box-shadow: 0 1px 4px 0 rgba(78, 117, 200, 0.15);
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    padding: 6px 12px;
    transition: all 0.1s linear;
    :hover {
        background-color: rgba(50, 158, 245, 1);
        color: #fff;
    }
`
interface ITopicTypeArr {
    id: string
    name: string
}
interface IProps {
    data: {
        typeArr: ITopicTypeArr[]
        currentType: string
    }
    onClickType(data: ITopicTypeArr): void
}
const TopicType: FC<IProps> = props => {
    const handleClickType = (data: ITopicTypeArr) => {
        props.onClickType(data)
    }
    return (
        <>
            {props.data.typeArr.map(item => (
                <Li key={item.id}>
                    <Span onClick={() => handleClickType(item)} isColor={props.data.currentType === item.id}>
                        {item.name.slice(0, 2)}
                    </Span>
                </Li>
            ))}
        </>
    )
}

export default TopicType
