//网络题库
import React, { FC, useEffect, useContext, useState } from 'react'
import styled from 'styled-components'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'

import { IStore } from '../../../store'
import ChoiceProblem from './ChoiceProblem'
import JudgeProblem from './JudgeProblem'
import FillingProblem from './FillingProblem'
import ShortAnswerProblem from './ShortAnswerProblem'
import Dialog from '../../../components/Dialog'
import Preview from '../../../components/QuestionType'
import Toast from '../../../components/Toast'
import Loading from '../../../components/Loading'

import TypeSelector from './TypeSelector'
import Action from './Action'
import KnowledgePoint from './KnowledgePoint'

const Container = styled.div`
    height: 100%;
    width: 100%;
`
const PreviewWrap = styled.div``

const Title = styled.div`
    color: #777;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
`

interface ITopicTypeArr {
    id: string
    name: string
}

const NetExercise: FC = props => {
    const history = useHistory()
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)
    const [typeArr] = useState([
        {
            id: '1',
            name: '单选题',
        },
        {
            id: '2',
            name: '多选题',
        },
        {
            id: '3',
            name: '判断题',
        },
        {
            id: '4',
            name: '填空题',
        },
        {
            id: '5',
            name: '简答题',
        },
    ])
    const [currentType, setCurrentType] = useState(0)
    const [isPreview, setIsPreview] = useState(false)
    const [answerOption] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])

    // useEffect(() => {
    //     if (props.id) {
    //         exerciseStore.getProblem(Number(props.id))
    //     } else {
    //         let value = sessionStorage.getItem('currentType')
    //         if (value && value !== '0') {
    //             setCurrentType(value)
    //             exerciseStore.setProblem(Number(value))
    //         } else {
    //             setCurrentType('1')
    //             exerciseStore.setProblem(1)
    //         }
    //     }
    //     // eslint-disable-next-line
    // }, [props.uri])

    //输入验证
    const checkForm = (data: any) => {
        let noData = JSON.stringify({
            object: 'value',
            document: {
                object: 'document',
                data: {},
                nodes: [
                    { object: 'block', type: 'paragraph', data: {}, nodes: [{ object: 'text', text: '', marks: [] }] },
                ],
            },
        })
        let type = [1, 2, 3]
        let type1 = [4, 5]
        let isOk = true
        if (data.topic === noData) {
            Toast.warning('题目不能为空')
            isOk = false
        } else if (data.loreIdList.length < 1) {
            Toast.warning('知识点不能为空')
            isOk = false
        } else if (type.includes(data.type) && !data.answer) {
            Toast.warning('答案不能为空')
            isOk = false
        } else if (type1.includes(data.type) && data.answer === noData) {
            Toast.warning('答案不能为空')
            isOk = false
        } else if (data.type === 5 && data.answerCount === 0) {
            Toast.warning('小题数量不能为空')
            isOk = false
        } else if (data.type === 4 && data.answerCount === 0) {
            Toast.warning('填空不能为空')
            isOk = false
        } else if (type.includes(data.type) && data.option === '[]') {
            Toast.warning('选项不能为空')
            isOk = false
        }
        return isOk
    }

    //预览、返回题目列表、保存
    const handleClickFunct = (text: string) => {
        // let option: any = []
        // if (text === '1' || text === '3') {
        //     let type = [1, 2]
        //     if (type.includes(exerciseStore.problemData.type)) {
        //         let answer = ''
        //         exerciseStore.problemData.option.map((item: any, index: number) => {
        //             if (item.statu) {
        //                 answer += answerOption[index] + ','
        //             }
        //             if (item.value.size) {
        //                 item.value = item.value.toJS()
        //             }
        //             option.push({
        //                 id: item.id,
        //                 value: item.value,
        //             })
        //             return item
        //         })
        //         exerciseStore.problemData.answer = answer.substr(0, answer.length - 1)
        //     }
        // }
        // if (text === '1') {
        //     exerciseStore.problemData.loreList = exerciseStore.selectedPoints
        //     setIsPreview(true)
        // } else if (text === '2') {
        //     navigate('/exercise')
        // } else if (text === '3') {
        //     let data = {
        //         id: exerciseStore.problemData.id,
        //         topic: JSON.stringify(exerciseStore.problemData.topic),
        //         option: '',
        //         answer: exerciseStore.problemData.answer,
        //         solution: JSON.stringify(exerciseStore.problemData.solution),
        //         loreIdList: exerciseStore.selectedPointsId,
        //         answerCount: exerciseStore.problemData.answerCount,
        //         type: exerciseStore.problemData.type,
        //     }
        //     let type1 = [4, 5]
        //     if (exerciseStore.problemData.type === 4) {
        //         data.answerCount = exerciseStore.problemData.answer.length
        //     }
        //
        //     if (type1.includes(exerciseStore.problemData.type)) {
        //         data.answer = JSON.stringify(data.answer)
        //     } else if (exerciseStore.problemData.type === 3) {
        //         data.answer = exerciseStore.problemData.answer
        //         delete data.answerCount
        //     } else {
        //         data.option = JSON.stringify(option)
        //         delete data.answerCount
        //     }
        //     if (props.id) {
        //         if (checkForm(data)) {
        //             exerciseStore.editProblem(data)
        //         }
        //     } else {
        //         if (checkForm(data)) {
        //             exerciseStore.addProblem(data)
        //         }
        //     }
        // }
    }

    //点击类型
    const handleClickTypeLink = (data: ITopicTypeArr) => {
        // exerciseStore.setProblem(Number(data.id))
        // setCurrentType(data.id)
    }

    //预览
    const handlePreview = () => {
        setIsPreview(!isPreview)
    }
    const handleCancel = () => {
        history.push('/exercise')
    }
    const handleSave = () => {}
    const handleChangeType = (index: number) => {
        setCurrentType(index)
    }
    const optionDialog = {
        width: '70%',
    }

    return useObserver(() => {
        if (exerciseStore.gettingProblem) {
            return <Loading />
        }
        return (
            <Container>
                <Title>新增题目</Title>
                <TypeSelector currentType={currentType} onChangeType={handleChangeType} />
                <KnowledgePoint />
                {currentType === 0 && <ChoiceProblem />}
                {currentType === 1 && <ChoiceProblem />}
                {currentType === 2 && <JudgeProblem />}
                {currentType === 3 && <FillingProblem />}
                {currentType === 4 && <ShortAnswerProblem />}
                {isPreview && (
                    <Dialog title='题目预览' options={optionDialog} onClickClose={handlePreview}>
                        <PreviewWrap>
                            <Preview data={exerciseStore.problemData} />
                        </PreviewWrap>
                    </Dialog>
                )}
                <Action handleCancel={handleCancel} handlePreview={handlePreview} handleSave={handleSave} />
            </Container>
        )
    })
}

export default NetExercise
