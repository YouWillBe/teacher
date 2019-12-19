import React, { FC, useContext, useEffect } from 'react'
import { MobXProviderContext } from 'mobx-react'
import styled from 'styled-components'
import { RouteComponentProps, navigate } from '@reach/router'
import { useObserver } from 'mobx-react-lite'
import { IStore } from '../../../store'

import NoPreparation from './no-preparation.png'
import Button from '../../../components/Button'
import Loading from '../../../components/Loading'
import ReadOnly from './ReadOnly'

interface IParams {
    courseId: string
    currentStatu: number
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    button {
        letter-spacing: 2px;
    }
`
const Img = styled.div`
    box-sizing: border-box;
    width: 158px;
    height: 160px;
    background-image: url(${NoPreparation});
    margin-bottom: 54px;
`

const Preparation: FC<RouteComponentProps<IParams>> = props => {
    const { coursePreparationStore } = useContext<IStore>(MobXProviderContext)

    useEffect(() => {
        if (coursePreparationStore.currentStatu) {
            props.courseId && coursePreparationStore.getPreparation(props.courseId)
        }
        // eslint-disable-next-line
    }, [])

    const handleClickLink = () => {
        navigate('preparation/new')
    }

    const optionButton = {
        height: '50px',
        bgColor: 'rgba(58,147,223,1)',
        shadow: '0px 4px 11px 0px rgba(58,147,223,0.49)',
    }
    return useObserver(() => {
        if (!coursePreparationStore.preparationReady || coursePreparationStore.gettingPreparation) {
            return <Loading />
        } else if (coursePreparationStore.preparationData.statu === 0) {
            return (
                <Container>
                    <Img />
                    <Button options={optionButton} onClick={handleClickLink}>
                        添加课前准备
                    </Button>
                </Container>
            )
        } else {
            return <ReadOnly courseId={props.courseId} />
        }
    })
}

export default Preparation
