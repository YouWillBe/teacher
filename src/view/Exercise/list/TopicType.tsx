import React, { FC } from 'react'
import styled from '@emotion/styled'

const Li = styled.li`
    width: 80px;
    height: 100%;
    margin-right: 20px;
`
const Span = styled.span<{ isColor: boolean }>`
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 40px;
    text-align: center;
    background-color: ${props => (props.isColor ? 'rgba(50, 158, 245, 1)' : '')};
    color: ${props => (props.isColor ? '#fff' : '')};
    box-shadow: 0px 1px 4px 0px rgba(78, 117, 200, 0.15);
    border-radius: 3px;
    cursor: pointer;
    :hover {
        background-color: rgba(50, 158, 245, 1);
        color: #fff;
    }
`
interface ITopicTypeArr {
    id: string
    name: string
}
interface Iprops {
    data: {
        typeArr: ITopicTypeArr[]
        currentType: string
    }
    onClickType(data: ITopicTypeArr): void
}
const TopicType: FC<Iprops> = props => {
    const handleClickType = (data: ITopicTypeArr) => {
        props.onClickType(data)
    }
    return (
        <>
            {props.data.typeArr.map((item, index) => (
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
