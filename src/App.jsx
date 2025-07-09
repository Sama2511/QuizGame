import { useEffect, useState } from 'react'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'

function App() {

// Switch Page
const [ShowPage1, setShowPage1] = useState(true)
const [ShowPage2, setShowPage2] = useState(false)
const [dataFectched, setData] = useState([])
// const [Questions , setQuestions]= useState(null)
let renderQuestions =[]

function Switch(){
  setShowPage1(false)
  setShowPage2(true)
}
////////

useEffect(() => {
  async function fetchQuestions() {
    try {
      const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
      const data = await res.json()
      setData(data)
      console.log('data fetched')
    } catch (err) {
      console.error("Fetch error:", err)
    }
  }
  fetchQuestions()
}, [])


if(dataFectched.length ===0){
  console.log('0')
}else{
        renderQuestions = dataFectched.results.map((result,index)=>{
          console.log(result)
        return(
        <SecondPage 
              question= {result.question} 
              answer1={result.correct_answer}
              answer2={result.correct_answer}
              answer3={result.correct_answer}
              answer4={result.correct_answer}
            />
        )
      })
    }

  return (
    
    <>
      {ShowPage1 && <FirstPage switch= {Switch}/>}
      {ShowPage2 && renderQuestions}
    </>
  )
}

export default App
