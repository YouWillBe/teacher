import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Link } from '@reach/router'

const Text = styled.div`
    a {
        color: #666;
        :hover {
            color: #00a6f3;
        }
    }
`

const NotVolumeData: FC = props => {
    return (
        <Text>
            <Link to='/volume' title='点击跳转试卷'>
                暂无试卷，请先去添加
            </Link>
        </Text>
    )
}

export default NotVolumeData
