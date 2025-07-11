import { useEffect, useState } from "react"
import { decode } from 'html-entities';
import { clsx } from "clsx";

export default function SecondPage() {

    // States
    const [dataFectched, setData] = useState([]);
    const [choosenAnswers, setChoosenAnswers] = useState({});
    const [gameOver, setGameOver] = useState(false);
    const [newGame, setNewGame] = useState(false)

    // Fetch questions from Trivia API 
    useEffect(() => {
        async function fetchQuestions() {
            try {
                const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple");
                const data = await res.json();

                // Shuffle answers for each question
                const shuffledAnswers = data.results.map((answer) => {
                    const allAnswers = [answer.correct_answer, ...answer.incorrect_answers];
                    shuffleArray(allAnswers);
                    return {
                        question: answer.question,
                        correctAnswers: answer.correct_answer,
                        incorrectAnswers: answer.incorrect_answers,
                        allAnswers: allAnswers
                    };
                });

                setData(shuffledAnswers);
                console.log('data fetched');
            } catch (err) {
                console.error("Fetch error:", err);
            }
        }

        fetchQuestions();
    }, [newGame]);

    // Handle click on an answer button
    function handleAnswerClick(index, answer) {
        setChoosenAnswers(prev => ({
            ...prev,
            [index]: answer
        }));
    }
    // Shuffle array function
    function shuffleArray(array) {
        let currentIndex = array.length;
        
        while (currentIndex !== 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }
    }
    
    // Render question and answer 
    let renderQuestions = [];
    let correctCount = 0
    if (dataFectched.length === 0) {
        return <h1>Loading Questions ... </h1> 
    } else {
        renderQuestions = dataFectched.map((result, index) => {

            // Decode question and answers
            result.question = decode(result.question);
            result.allAnswers = result.allAnswers.map(answer => decode(answer));
            const availableAnswers = result.allAnswers;

            // Render buttons for each answer
            const buttonRender = availableAnswers.map((answer) => {

                // Correct and Wrong answer's logic
                const isGuessed = Object.values(choosenAnswers).includes(answer)
                const isCorrectAnswer = isGuessed && result.correctAnswers === answer
                const isWrongAnswer = isGuessed && result.incorrectAnswers.includes(answer)
                const correctButnotGuessed = result.correctAnswers === answer
                if(isCorrectAnswer){
                    correctCount ++
                }
                const classname = clsx({ correct:isCorrectAnswer, incorrect :isWrongAnswer, correct : correctButnotGuessed  })
                return (
                    <button
                        disabled={gameOver}
                        className={gameOver? classname :choosenAnswers[index] === answer ? 'choosen' : null }
                        onClick={() => handleAnswerClick(index, answer)}
                    >
                        {answer}
                    </button>
                );
            });

            // Render question 
            return (
                <div className="quiz-container" key={index}>
                    <h1>{result.question}</h1>
                    <div className="buttons-container">
                        {buttonRender}
                    </div>
                </div>
            );
        });
    }

    // Check Answers when clicked
    function gameIsOver(){
        setGameOver(true)
    }
    const numberOfAnwers = dataFectched.map(arr=>{
        return arr.correctAnswers
    })

    // function to Restart the Game
    function restartGame(){
        setData([])
        setChoosenAnswers({})
        setGameOver(false)
        setNewGame(prev=> !prev)
        renderQuestions = [];
        correctCount = 0
    }

    // Final render
    return (
        <>
            <main className="page2-container">
                {renderQuestions}
                {
                !gameOver ? 
                    <button onClick={()=>gameIsOver()} id="check-btn">Check answers</button>
                : 
                <div className="EndGame-container">
                    <h1>You scored {correctCount}/{numberOfAnwers.length} correct answers</h1>
                    <button onClick={()=>restartGame()}>Play Again</button>
                </div>
                }
            </main>
        </>
    );
}
