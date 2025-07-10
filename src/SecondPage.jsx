import { useEffect, useState } from "react"
import {decode} from 'html-entities';

export default function SecondPage(){

    const [dataFectched, setData] = useState([])
    const [choosenAnswers, setChoosenAnswers] = useState({})


    useEffect(() => {
    async function fetchQuestions() {
        try {
        const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        const data = await res.json()
        const shuffledAnswers = data.results.map((answer)=>{
            const allAnswers = [answer.correct_answer, ...answer.incorrect_answers ]
            shuffleArray(allAnswers)
            return {
                'question': answer.question,
                'correctAnswers': answer.correct_answer,
                'incorrectAnswers' : answer.incorrect_answers,
                'allAnswers' : allAnswers
            }
        })
        setData(shuffledAnswers)
        console.log('data fetched')
        } catch (err) {
        console.error("Fetch error:", err)
        }
    }
    fetchQuestions()
    }, [])

    function handleAnswerClick(index,answer){
        setChoosenAnswers(prev => ({
            ...prev , [index] : answer 
        })
        )
    }
    console.log(choosenAnswers)


    function shuffleArray(array){
    let currentIndex = array.length

    while(currentIndex != 0){
        let randomIndex = Math.floor(Math.random()*currentIndex)
        currentIndex --
    
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    }


    
    let renderQuestions = []
    if(dataFectched.length ===0){
    console.log('0')
    }else{
    renderQuestions = dataFectched.map((result,index)=>{
        result.question = decode(result.question) 
        result.allAnswers = result.allAnswers.map(answer=> decode(answer))
        const availableAnswers = result.allAnswers

        const buttonRender = availableAnswers.map((answer)=>{
            return(
                    <button
                        className={choosenAnswers[index] === answer? 'choosen': null}
                        onClick={()=>handleAnswerClick(index,answer)}>
                        {answer}
                    </button>          
            )
        })
        return(
            <div className="quiz-container" >
                <h1>{result.question}</h1>
                <div className="buttons-container">

                   {buttonRender}

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