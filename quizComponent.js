// quizComponent.js
const QuizComponent = ({ onQuizComplete }) => {
    const [currentQuestion, setCurrentQuestion] = React.useState(1);
    const [selectedAnswer, setSelectedAnswer] = React.useState(null);
    const [correctAnswers, setCorrectAnswers] = React.useState(0);
  
    const correctOptions = ['A', 'B', 'C']; // Example correct answers for each question
  
    const handleAnswerClick = (answer, index) => {
      setSelectedAnswer(answer);
      if (answer === correctOptions[index]) {
        setCorrectAnswers(correctAnswers + 1);
        console.log(`Correct answer! Current score: ${correctAnswers + 1}`);
      } else {
        console.log(`Incorrect answer. Current score: ${correctAnswers}`);
      }
      // If it's the last question, notify the parent component. Otherwise, go to the next question.
      if (currentQuestion === 3) {
        console.log("Reached the last question, notifying parent component");
        onQuizComplete(correctAnswers);
      } else {
        console.log("Moving to the next question");
        handleNextQuestion();
      }
    };
  
    const handleNextQuestion = () => {
      if (currentQuestion < 3) {
        setCurrentQuestion(currentQuestion + 1);
      }
      setSelectedAnswer(null);
    };
  
    const handlePreviousQuestion = () => {
      if (currentQuestion > 1) {
        setCurrentQuestion(currentQuestion - 1);
        // Optionally adjust score if going back to change answers
      }
      setSelectedAnswer(null);
    };
  
    const renderOption = (option, imageUrl, index) => {
      return (
        <div
          className={`quiz-option ${selectedAnswer === option ? 'selected' : ''}`}
          onClick={() => handleAnswerClick(option, index)}
        >
          <img src={imageUrl} alt={`Option ${option}`} />
          <div className="quiz-text-div">
            <span className="quiz-text">{option}</span>
          </div>
        </div>
      );
    };
  
    const questionData = [
      {
        question: "Which website is custom crafted?",
        images: [
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663679822490f284347b2515_quiz-website%402x.webp", // Placeholder URL for Option A
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663679822490f284347b2515_quiz-website%402x.webp", // Placeholder URL for Option B
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663679822490f284347b2515_quiz-website%402x.webp"  // Placeholder URL for Option C
        ]
      },
      {
        question: "Which email is custom crafted?",
        images: [
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663679822490f284347b2515_quiz-website%402x.webp", // Placeholder URL for Option A
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663679822490f284347b2515_quiz-website%402x.webp", // Placeholder URL for Option B
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663679822490f284347b2515_quiz-website%402x.webp"  // Placeholder URL for Option C
        ]
      },
      {
        question: "Which wedding website logo is unique?",
        images: [
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663679822490f284347b2515_quiz-website%402x.webp", // Placeholder URL for Option A
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663679822490f284347b2515_quiz-website%402x.webp", // Placeholder URL for Option B
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663679822490f284347b2515_quiz-website%402x.webp"  // Placeholder URL for Option C
        ]
      }
    ];
  
    console.log(`Rendering question ${currentQuestion}`);
    const { question, images } = questionData[currentQuestion - 1];
    return (
      <div className="quiz-component">
        <h2 className="quiz-heading">{`Q${currentQuestion}/3 ${question}`}</h2>
        <div className="quiz-options">
          {['A', 'B', 'C'].map((option, index) => renderOption(option, images[index], currentQuestion - 1))}
        </div>
        {currentQuestion > 1 && (
          <button className="back-button" onClick={handlePreviousQuestion}>
            Back
          </button>
        )}
      </div>
    );
  };
  
  const ResultsComponent = ({ correctAnswers, onRestart }) => {
    console.log("Rendering the results component");
    const scorePercentage = (correctAnswers / 3) * 100;
    let resultText;
    if (scorePercentage === 100) {
      resultText = "Looks like we're on the same page. Book an Appointment!";
    } else if (scorePercentage >= 66) {
      resultText = "You scored 66%. Forward this to your significant other to see if they have better luck.";
    } else {
      resultText = "You scored 33% or less. We might need to revisit some basics.";
    }
  
    return (
      <div className="results-component">
        <img className="softserve-image" src='https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/66368828881b32d5e5d364d0_softserve.webp'></img>
        <div className="quiz-results-modal">
            <div className="quiz-modal-header-wrapper">
                <h2 className="quiz-modal-text-h2">"Your Score"</h2>
                <h2 className="quiz-modal-score-h2">{scorePercentage}</h2>
            </div>
            <div className="quiz-modal-body">
                <p className="quiz-modal-text">{resultText}</p>
            </div>
            <button className="quiz-modal-button" onClick={onRestart}>Restart Quiz</button>
        </div>
      </div>
    );
  };
  
  const App = () => {
    const [quizCompleted, setQuizCompleted] = React.useState(false);
    const [correctAnswers, setCorrectAnswers] = React.useState(0);
  
    const handleQuizComplete = (score) => {
      setCorrectAnswers(score);
      setQuizCompleted(true);
    };
  
    const handleRestart = () => {
      setQuizCompleted(false);
      setCorrectAnswers(0);
    };
  
    return (
      <div className='quiz-modal-wrapper'>
        {quizCompleted ? (
          <ResultsComponent correctAnswers={correctAnswers} onRestart={handleRestart} />
        ) : (
          <QuizComponent onQuizComplete={handleQuizComplete} />
        )}
      </div>
    );
  };
  
  ReactDOM.render(React.createElement(App), document.getElementById('root'));