// quizComponent.js
const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = React.useState(1);
  const [selectedAnswer, setSelectedAnswer] = React.useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setSelectedAnswer(null);
  };

  const renderQuestion1 = () => {
    return (
      <>
        <h2>Q1/3 Which website is custom crafted?</h2>
        <div className="quiz-options">
          <div
            className={`quiz-option ${selectedAnswer === 'A' ? 'selected' : ''}`}
            onClick={() => handleAnswerClick('A')}
          >
            <img src="option-a.jpg" alt="Option A" />
            <span>A</span>
          </div>
          <div
            className={`quiz-option ${selectedAnswer === 'B' ? 'selected' : ''}`}
            onClick={() => handleAnswerClick('B')}
          >
            <img src="option-b.jpg" alt="Option B" />
            <span>B</span>
          </div>
          <div
            className={`quiz-option ${selectedAnswer === 'C' ? 'selected' : ''}`}
            onClick={() => handleAnswerClick('C')}
          >
            <img src="option-c.jpg" alt="Option C" />
            <span>C</span>
          </div>
        </div>
        {selectedAnswer && (
          <button className="next-button" onClick={handleNextQuestion}>
            Next
          </button>
        )}
      </>
    );
  };

  const renderQuestion2 = () => {
    return (
      <>
        <h2>Q2/3 Which email is custom crafted?</h2>
        <div className="quiz-options">
          <div
            className={`quiz-option ${selectedAnswer === 'A' ? 'selected' : ''}`}
            onClick={() => handleAnswerClick('A')}
          >
            <img src="email-a.jpg" alt="Option A" />
            <span>A</span>
          </div>
          <div
            className={`quiz-option ${selectedAnswer === 'B' ? 'selected' : ''}`}
            onClick={() => handleAnswerClick('B')}
          >
            <img src="email-b.jpg" alt="Option B" />
            <span>B</span>
          </div>
          <div
            className={`quiz-option ${selectedAnswer === 'C' ? 'selected' : ''}`}
            onClick={() => handleAnswerClick('C')}
          >
            <img src="email-c.jpg" alt="Option C" />
            <span>C</span>
          </div>
        </div>
        {selectedAnswer && (
          <button className="next-button" onClick={handleNextQuestion}>
            Next
          </button>
        )}
      </>
    );
  };

  const renderQuestion3 = () => {
    return (
      <>
        <h2>Q3/3 Which wedding website logo is unique?</h2>
        <div className="quiz-options">
          <div
            className={`quiz-option ${selectedAnswer === 'A' ? 'selected' : ''}`}
            onClick={() => handleAnswerClick('A')}
          >
            <img src="logo-a.jpg" alt="Option A" />
            <span>A</span>
          </div>
          <div
            className={`quiz-option ${selectedAnswer === 'B' ? 'selected' : ''}`}
            onClick={() => handleAnswerClick('B')}
          >
            <img src="logo-b.jpg" alt="Option B" />
            <span>B</span>
          </div>
          <div
            className={`quiz-option ${selectedAnswer === 'C' ? 'selected' : ''}`}
            onClick={() => handleAnswerClick('C')}
          >
            <img src="logo-c.jpg" alt="Option C" />
            <span>C</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="quiz-component">
      {currentQuestion === 1 && renderQuestion1()}
      {currentQuestion === 2 && renderQuestion2()}
      {currentQuestion === 3 && renderQuestion3()}
    </div>
  );
};

ReactDOM.render(React.createElement(QuizComponent), document.getElementById('root'));