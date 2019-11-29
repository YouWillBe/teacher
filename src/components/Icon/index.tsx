import React, { FC } from 'react'

interface IProps {
    name: string
}

const Icon: FC<IProps> = ({ name }) => {
    return (
        <svg className='icon' aria-hidden='true'>
            <use xlinkHref={name} />
        </svg>
    )
}

export default Icon
