// quizComponent.js
const QuizComponent = () => {
    const [currentQuestion, setCurrentQuestion] = React.useState(1);
    const [selectedAnswer, setSelectedAnswer] = React.useState(null);
    const [correctAnswers, setCorrectAnswers] = React.useState(0);
  
    const correctOptions = ['A', 'B', 'C']; // Example correct answers for each question
  
    const handleAnswerClick = (answer, index) => {
      setSelectedAnswer(answer);
      if (answer === correctOptions[index]) {
        setCorrectAnswers(correctAnswers + 1);
      }
      // Automatically go to the next question after selecting an answer
      handleNextQuestion();
    };
  
    const handleNextQuestion = () => {
      if (currentQuestion < 3) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        showResults();
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
  
    const showResults = () => {
      const scorePercentage = (correctAnswers / 3) * 100;
      let resultImage, resultText;
      if (scorePercentage === 100) {
        resultImage = 'https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/66368828881b32d5e5d364d0_softserve.webp';
        resultText = "You scored 100%! We’re on the same page. Time to Book An appointment. Great design Isn’t Free Though. I charge $200 for the Initial Consultation.";
      } else if (scorePercentage >= 66) {
        resultImage = 'https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/66368828881b32d5e5d364d0_softserve.webp';
        resultText = "You scored 66%. Not bad, but let's try to improve!";
      } else {
        resultImage = 'https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/66368828881b32d5e5d364d0_softserve.webp';
        resultText = "You scored 33% or less. We might need to revisit some basics.";
      }
  
      return (
        <div style={{ background: `url(${resultImage})`, color: 'white', textAlign: 'center', padding: '20px' }}>
          <h2>{resultText}</h2>
          <button onClick={() => setCurrentQuestion(1)}>Restart Quiz</button>
        </div>
      );
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

    const renderQuestion = () => {
        if (currentQuestion <= 3) {
          const { question, images } = questionData[currentQuestion - 1];
          return (
            <>
              <h2 className="quiz-heading">{`Q${currentQuestion}/3 ${question}`}</h2>
              <div className="quiz-options">
                {['A', 'B', 'C'].map((option, index) => renderOption(option, images[index], currentQuestion - 1))}
              </div>
              {currentQuestion > 1 && (
                <button className="back-button" onClick={handlePreviousQuestion}>
                  Back
                </button>
              )}
            </>
          );
        } else {
          return showResults();
        }
      };
    
      return (
        <div className="quiz-component">
          {renderQuestion()}
        </div>
      );
};
    
ReactDOM.render(React.createElement(QuizComponent), document.getElementById('root'));
