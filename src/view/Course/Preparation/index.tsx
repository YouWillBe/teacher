import React, { FC, useContext, useEffect } from 'react'
import { MobXProviderContext } from 'mobx-react'
import styled from 'styled-components'
import { useObserver } from 'mobx-react-lite'
import { useParams, useHistory } from 'react-router-dom'

import { IStore } from '../../../store'

import NoPreparation from './no-preparation.png'
import Button from '../../../components/Button'
import Loading from '../../../components/Loading'
import ReadOnly from './ReadOnly'

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

const Preparation: FC = props => {
    const { courseId } = useParams()
    const history = useHistory()
    const { coursePreparationStore } = useContext<IStore>(MobXProviderContext)

    useEffect(() => {
        if (coursePreparationStore.currentStatu) {
            coursePreparationStore.getPreparation(courseId as string)
        }
        // eslint-disable-next-line
    }, [])

    const handleClickLink = () => {
        history.push(`/course/${courseId}/preparation/new`)
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
            return <ReadOnly courseId={courseId} />
        }
    })
}

export default Preparation
