
export default function FirstPage(props){

    return(
        <section className="page1-container">
            <main className="page1-content">
                <h1>Fast Facts</h1>
                <p>Speedy Knowledge Quiz</p>
                <button 
                onClick={props.switch}
                className="start-btn">Start quiz
                </button>
            </main>
        </section>

    )
}