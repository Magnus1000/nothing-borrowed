// quizComponent.js
const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
  };

  const renderOption = (option, imageUrl) => {
    return (
      <div
        className={`quiz-option ${selectedAnswer === option ? 'selected' : ''}`}
        onClick={() => handleAnswerClick(option)}
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
    const { question, images } = questionData[currentQuestion - 1];
    return (
      <>
        <h2 className="quiz-heading">{`Q${currentQuestion}/3 ${question}`}</h2>
        <div className="quiz-options">
          {['A', 'B', 'C'].map((option, index) => renderOption(option, images[index]))}
        </div>
        {selectedAnswer && (
          <button className="next-button" onClick={handleNextQuestion}>
            Next
          </button>
        )}
      </>
    );
  };

  return (
    <div className="quiz-component">
      {currentQuestion <= 3 && renderQuestion()}
    </div>
  );
};

ReactDOM.render(<QuizComponent />, document.getElementById('root'));
