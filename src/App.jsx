import { useState } from 'react'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'

function App() {

// Switch Page
const [ShowPage1, setShowPage1] = useState(true)
const [ShowPage2, setShowPage2] = useState(false)
function Switch(){
  setShowPage1(false)
  setShowPage2(true)
}
////////


  return (
    <>
      {ShowPage1 && <FirstPage switch= {Switch}/>}
      {ShowPage2 && <SecondPage/>}
    </>
  )
}

export default App
