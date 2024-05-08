// quizComponent.js
const QuizComponent = ({ onQuizComplete }) => {
    const [currentQuestion, setCurrentQuestion] = React.useState(1);
    const [selectedAnswers, setSelectedAnswers] = React.useState([null, null, null]);
    const [correctAnswers, setCorrectAnswers] = React.useState(0);
    const [transitionClass, setTransitionClass] = React.useState('fade-in');
    const [showOverlay, setShowOverlay] = React.useState(false);

    const correctOptions = ['C', 'B', 'C']; 

    const handleAnswerClick = (answer, index) => {
      const updatedAnswers = [...selectedAnswers];
      updatedAnswers[index] = answer;
      setSelectedAnswers(updatedAnswers);

      if (answer === correctOptions[index]) {
        setCorrectAnswers(correctAnswers + 1);
        console.log(`Correct answer! Current score: ${correctAnswers + 1}`);
      } else {
        setCorrectAnswers(correctAnswers);
        console.log(`Incorrect answer. Current score: ${correctAnswers}`);
      }

      setShowOverlay(true);
      setTimeout(() => {
        setShowOverlay(false);
        setTransitionClass('');
        setTimeout(() => {
          setTransitionClass('fade-out');
          setTimeout(() => {
            setTransitionClass('fade-in');
            if (currentQuestion === 3) {
              onQuizComplete(updatedAnswers.filter((answer, i) => answer === correctOptions[i]).length);
            } else {
              handleNextQuestion();
            }
          }, 500);
        }, 0);
      }, 1000);
    };

    const handleNextQuestion = () => {
      if (currentQuestion < 3) {
        setCurrentQuestion(currentQuestion + 1);
      }
    };

    const handlePreviousQuestion = () => {
      if (currentQuestion > 1) {
        setCurrentQuestion(currentQuestion - 1);
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[currentQuestion - 1] = null;
        setSelectedAnswers(updatedAnswers);
        setCorrectAnswers(updatedAnswers.filter((answer, i) => answer === correctOptions[i]).length);
      }
    };
  
    const renderOption = (option, imageUrl, index) => {
      const selectedAnswer = selectedAnswers[index];
      const isCorrect = selectedAnswer === option && option === correctOptions[index];
      return (
        <div
          className={`quiz-option ${selectedAnswer === option ? 'selected' : ''}`}
          onClick={() => handleAnswerClick(option, index)}
        >
          <img src={imageUrl} alt={`Option ${option}`} />
          <div className="quiz-text-div">
            <span className="quiz-text">{option}</span>
          </div>
          {showOverlay && selectedAnswer === option && (
            <div className={`quiz-option-overlay ${isCorrect ? 'correct' : 'incorrect'}`}>
              <span>{isCorrect ? 'Correct' : 'Incorrect'}</span>
            </div>
          )}
        </div>
      );
    };
  
    const questionData = [
      {
        question: "Which website is custom crafted?",
        images: [
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/66380ae705dd6f705165b588_template-website-2%402x.jpg", // Placeholder URL for Option A
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/66380ae7346c5153165a39d5_template-website-1%402x.jpg", // Placeholder URL for Option B
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663679822490f284347b2515_quiz-website%402x.webp"  // Placeholder URL for Option C
        ]
      },
      {
        question: "Which email is custom crafted?",
        images: [
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663820874a22983c6cad3aae_email-template-1%402x.webp", // Placeholder URL for Option A
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/6638205c37373f35e02d9f93_email-template-2%402x.webp", // Placeholder URL for Option B
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663bf8964daffe8f58503261_email-template-3%402x.webp"  // Placeholder URL for Option C
        ]
      },
      {
        question: "Which wedding website logo is unique?",
        images: [
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663814ed0ef3b41c61da9914_with-joy-logo%402x.webp", // Placeholder URL for Option A
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663814ed562959792a8df56c_the-knot-logo%402x.webp", // Placeholder URL for Option B
          "https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663814ed25f89d97f206612e_the-edwards%402x.webp"  // Placeholder URL for Option C
        ]
      }
    ];
  
    console.log(`Rendering question ${currentQuestion}`);
    const { question, images } = questionData[currentQuestion - 1];
    return (
      <div className={`quiz-component ${transitionClass}`}>
          <h2 className="quiz-heading">
          <span className="quiz-question-number">{`Q${currentQuestion}/3`}</span> 
          {question}
          </h2>
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
  const [transitionClass, setTransitionClass] = React.useState('');

  React.useEffect(() => {
    setTransitionClass('slide-in');
  }, []);

  console.log("Rendering the results component");
  const scorePercentage = Math.round((correctAnswers / 3) * 100);
  const scorePercentageRounded = Math.round(scorePercentage);
  let resultText;
  let softserveImage;
  let buttonText;
  let buttonClass;
  let buttonLink;

  if (scorePercentage === 100) {
    resultText = "Looks like we're on the same page. Book an Appointment!";
    softserveImage = 'https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/6638fa3ca47b2a9d5e9eaad0_softserve-wide-desktop.webp';
    buttonText = "Book Appointment";
    buttonClass = "button-primary";
    buttonLink = "/checkout";
  } else {
    if (scorePercentage >= 66) {
      resultText = "You scored 66%. Forward this to your significant other to see if they have better luck.";
    } else {
      resultText = "You scored 33% or less. We might need to revisit some basics.";
    }
    softserveImage = 'https://uploads-ssl.webflow.com/662ac33e8d40424730b1f55d/663ba2ec5743e5a00224c326_softserve-melting.png';
    buttonText = "Restart Quiz";
    buttonClass = "button-secondary";
    buttonLink = null;
  }

  const handleButtonClick = () => {
    if (buttonLink) {
      window.location.href = buttonLink;
    } else {
      onRestart();
    }
  };

  return (
    <div className={`results-component ${transitionClass}`}>
      <img className="softserve-image" src={softserveImage} alt="Softserve" />
      <div className="quiz-results-modal">
        <div className="quiz-modal-header-wrapper">
          <h2 className="quiz-modal-text-h2">Your Score</h2>
          <h2 className="quiz-modal-score-h2">{scorePercentageRounded}%</h2>
        </div>
        <div className="quiz-modal-body">
          <p className="quiz-modal-text">{resultText}</p>
        </div>
        <button className={buttonClass} onClick={handleButtonClick}>
          {buttonText}
        </button>
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