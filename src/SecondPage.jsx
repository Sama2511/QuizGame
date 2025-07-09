
export default function SecondPage(props){
    return(
        <>
            <main className="page2-container">
                <div className="quiz-container">
                    <h1>{props.question}</h1>
                    <div className="buttons-container">
                        <button>{props.answer1}</button>
                        <button>{props.answer2}</button>
                        <button>{props.answer3}</button>
                        <button>{props.answer4}</button>
                    </div>
                </div>
                <button id="check-btn">Check answers</button>
            </main>
        </>
    )
}