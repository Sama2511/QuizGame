import { useEffect, useState } from "react"
import {decode} from 'html-entities';

export default function SecondPage(){

    const [dataFectched, setData] = useState([])




    useEffect(() => {
    async function fetchQuestions() {
        try {
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        const data = await res.json()
        setData(data)
        console.log('data fetched')
        } catch (err) {
        console.error("Fetch error:", err)
        }
    }
    fetchQuestions()
    }, [])

    let renderQuestions = []
    if(dataFectched.length ===0){
    console.log('0')
    }else{
    renderQuestions = dataFectched.results.map((result,index)=>{
        result.question = decode(result.question) 
        result.allAnswers = [result.correct_answer, ...result.incorrect_answers]
        result.allAnswers = result.allAnswers.map(answer=> decode(answer))
        return(
            <div className="quiz-container" key={index}>
                    <h1>{result.question}</h1>
                    <div className="buttons-container">
                        <button>{result.allAnswers[0]}</button>
                        <button>{result.allAnswers[1]}</button>
                        <button>{result.allAnswers[2]}</button>
                        <button>{result.allAnswers[3]}</button>
                    </div>
            </div>
            )
        })
    }

    return(
        <>
            <main className="page2-container">
                {renderQuestions}
                <button id="check-btn">Check answers</button>
            </main>
        </>
    )
}