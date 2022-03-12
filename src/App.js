import {useState} from "react";
const image_btn = require('./images/icon-dice.svg').default
const divider = require('./images/pattern-divider-desktop.svg').default

export const App = () => {

    const [advice, updateAdvice] = useState('It is easy to sit up and take notice, What is difficult is getting up and taking action.')
    const [adviceNumber, updateAdviceNumber] = useState(117)
    const [disabled, updateDisabled] = useState(false)


    const generateAdvice = async () => {
        updateDisabled(true)
        const data = await fetch('https://api.adviceslip.com/advice')
        const json = await data.json();
        updateAdviceNumber(json['slip']['id'])
        updateAdvice(json['slip']['advice'])
        setTimeout(()=>updateDisabled(false),2000)
    }
    return <main>
        <h1>Advice #{adviceNumber}</h1>
        <q>{advice}</q>
        <img src={divider} alt="divider"/>
        <button disabled={disabled} onClick={() => generateAdvice()}>
            <img src={image_btn} alt="button"/>
        </button>
    </main>
}