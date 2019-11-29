import React, { FC, MouseEvent } from 'react'
import styled from '@emotion/styled'
import Icon from '../../Icon'

const Container = styled.div`
    height: 40%;
`
const Letter = styled.div`
    height: 120px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
`
const Label = styled.div`
    font-size: 12px;
    width: 120px;
    line-height: 120px;
    text-align: center;
    border-right: 1px solid #ccc;
    background-color: #ddd;
`
const LetterContent = styled.div`
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(17, 1fr);
    grid-template-rows: 1fr 1fr;
    place-items: center center;
`
const Button = styled.div`
    height: 40px;
    width: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    border-radius: 4px;
    color: #333;
    transition: all 0.5s linear;
    font-size: 26px;
    &:hover {
        color: #00a6f3;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
`
const Form = styled.div`
    height: 60px;
    border: 1px solid #ccc;
    border-radius: 4px;
    display: flex;
    margin-top: 8px;
`
const FormLable = styled.div`
    font-size: 12px;
    width: 120px;
    line-height: 60px;
    text-align: center;
    border-right: 1px solid #ccc;
    background-color: #ddd;
`
const FormContent = styled.div`
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(17, 1fr);
    grid-template-rows: 1fr;
    place-items: center center;
`

const arr1 = [
    { name: 'Gamma', cmd: '\\Gamma', type: 'write', title: 'Gamma' },
    { name: 'Delta', cmd: '\\Delta', type: 'write', title: 'Delta' },
    { name: 'Theta', cmd: '\\Theta', type: 'write', title: 'Theta' },
    { name: 'Lambda', cmd: '\\Lambda', type: 'write', title: 'Lambda' },
    { name: 'Xi', cmd: '\\Xi', type: 'write', title: 'Xi' },
    { name: 'Pi', cmd: '\\Pi', type: 'write', title: 'Pi' },
    { name: 'Sigma', cmd: '\\Sigma', type: 'write', title: 'Sigma' },
    { name: 'Upsilon', cmd: '\\Upsilon', type: 'write', title: 'Upsilon' },
    { name: 'Phi', cmd: '\\Phi', type: 'write', title: 'Phi' },
    { name: 'Psi', cmd: '\\Psi', type: 'write', title: 'Psi' },
    { name: 'Omega', cmd: '\\Omega', type: 'write', title: 'Omega' },
    { name: 'alpha-l', cmd: '\\alpha', type: 'write', title: 'alpha' },
    { name: 'beta-l', cmd: '\\beta', type: 'write', title: 'beta' },
    { name: 'gamma-l', cmd: '\\gamma', type: 'write', title: 'gamma' },
    { name: 'delta-l', cmd: '\\delta', type: 'write', title: 'delta' },
    { name: 'epsilon-l', cmd: '\\epsilon', type: 'write', title: 'epsilon' },
    { name: 'zeta-l', cmd: '\\zeta', type: 'write', title: 'zeta' },
    { name: 'eta-l', cmd: '\\eta', type: 'write', title: 'eta' },
    { name: 'theta-l', cmd: '\\theta', type: 'write', title: 'theta' },
    { name: 'iota-l', cmd: '\\iota', type: 'write', title: 'iota' },
    { name: 'kappa-l', cmd: '\\kappa', type: 'write', title: 'kappa' },
    { name: 'lambda-l', cmd: '\\lambda', type: 'write', title: 'lambda' },
    { name: 'mu-l', cmd: '\\mu', type: 'write', title: 'mu' },
    { name: 'nu-l', cmd: '\\nu', type: 'write', title: 'nu' },
    { name: 'xi-l', cmd: '\\xi', type: 'write', title: 'xi' },
    { name: 'pi-l', cmd: '\\pi', type: 'write', title: 'pi' },
    { name: 'rho-l', cmd: '\\rho', type: 'write', title: 'rho' },
    { name: 'sigma-l', cmd: '\\sigma', type: 'write', title: 'sigma' },
    { name: 'tau-l', cmd: '\\tau', type: 'write', title: 'tau' },
    { name: 'upsilon-l', cmd: '\\upsilon', type: 'write', title: 'upsilon' },
    { name: 'phi-l', cmd: '\\phi', type: 'write', title: 'phi' },
    { name: 'chi-l', cmd: '\\chi', type: 'write', title: 'chi' },
    { name: 'psi-l', cmd: '\\psi', type: 'write', title: 'psi' },
    { name: 'omega-l', cmd: '\\omega', type: 'write', title: 'omega' },
]
const arr2 = [
    { name: 'times', cmd: '\\times', type: 'write', title: '乘' },
    { name: 'div', cmd: '\\div', type: 'write', title: '除' },
    { name: 'pm', cmd: '\\pm', type: 'write', title: '加减' },
    { name: 'ne', cmd: '\\ne', type: 'write', title: '不等于' },
    { name: 'approx', cmd: '\\approx', type: 'write', title: '约等于' },
    { name: 'forall', cmd: '\\forall', type: 'write', title: '全称量词' },
    { name: 'exists', cmd: '\\exists', type: 'write', title: '存在量词' },
    { name: 'in', cmd: '\\in', type: 'write', title: '属于' },
    { name: 'notin', cmd: '\\notin', type: 'write', title: '不属于' },
    { name: 'because', cmd: '\\because', type: 'write', title: '因为' },
    { name: 'therefore', cmd: '\\therefore', type: 'write', title: '所以' },
    { name: 'supseteq', cmd: '\\supseteq', type: 'write', title: '包含' },
    { name: 'supset', cmd: '\\supset', type: 'write', title: '真包含' },
    { name: 'varnothing', cmd: '\\varnothing', type: 'write', title: '空集' },
    { name: 'cap', cmd: '\\cap', type: 'write', title: '交集' },
    { name: 'cup', cmd: '\\cup', type: 'write', title: '并集' },
]
const arr3 = [
    { name: 'frac', cmd: '\\frac', type: 'write', title: '分式' },
    { name: 'sprt', cmd: '\\sqrt', type: 'write', title: '平方根' },
    { name: 'sprt-n', cmd: '\\nthroot[n]x', type: 'write', title: '开方' },
    { name: 'underline', cmd: '_', type: 'write', title: '下标' },
    { name: 'vec', cmd: '\\vec', type: 'write', title: '向量' },
    { name: 'bar', cmd: '\\bar', type: 'write', title: '平均数' },
    { name: 'sum', cmd: '\\sum', type: 'write', title: '求和' },
    { name: 'prod', cmd: '\\prod', type: 'write', title: '求积' },
    { name: 'int', cmd: '\\int', type: 'write', title: '积分' },
]

interface IProps {
    click(cmd: string): void
}

const App: FC<IProps> = props => {
    const handleClick = (event: MouseEvent, cmd: string) => {
        event.preventDefault()
        props.click(cmd)
    }
    return (
        <Container>
            <Letter>
                <Label>希腊字母</Label>
                <LetterContent>
                    {arr1.map(x => (
                        <Button onMouseDown={event => handleClick(event, x.cmd)} key={x.name} title={x.title}>
                            <Icon name={`#icon-${x.name}`} />
                        </Button>
                    ))}
                </LetterContent>
            </Letter>
            <Form>
                <FormLable>常用符号</FormLable>
                <FormContent>
                    {arr2.map(x => (
                        <Button key={x.name} onMouseDown={event => handleClick(event, x.cmd)} title={x.title}>
                            <Icon name={`#icon-${x.name}`} />
                        </Button>
                    ))}
                </FormContent>
            </Form>
            <Form>
                <FormLable>常用形式</FormLable>
                <FormContent>
                    {arr3.map(x => (
                        <Button key={x.name} onMouseDown={event => handleClick(event, x.cmd)} title={x.title}>
                            <Icon name={`#icon-${x.name}`} />
                        </Button>
                    ))}
                </FormContent>
            </Form>
        </Container>
    )
}

export default App
