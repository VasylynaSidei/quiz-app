import "./GeneralQuestion.css";
import { useParams } from "react-router-dom";
import { ResultPage } from "../Result/ResultPage";
import { useState, useEffect } from "react";
import "./GeneralQuestion.css";

function GeneralQuestion() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  let { category } = useParams();
  const fetchingData = async () => {
    let url;
    try {
      switch (category) {
        case "general-knowledge":
          url =
            "https://the-trivia-api.com/v2/questions?limit=10&categories=general_knowledge&type=text_choice";
          break;
        case "science-computers":
          url =
            "https://the-trivia-api.com/v2/questions?limit=10&categories=science&type=text_choice&difficulty=easy";
          break;
        case "entertainment":
          url =
            "https://the-trivia-api.com/v2/questions?limit=10&categories=film_and_tv&type=text_choice";
          break;
        default:
          break;
      }

      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      setQuestions(
        result.map((item) => {
          return {
            incorrect_answers: item.incorrectAnswers,
            correct_answer: item.correctAnswer,
            question: item.question.text,
          };
        })
      );
    } catch (error) {
      console.error(error.message);
    }
  };
  const decodeHtmlEntities = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  const shuffleAnswers = (question) => {
    const shuffledAnswers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];
    return shuffledAnswers.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    fetchingData();
  }, []);
  if (questions.length === 0) {
    return <div>Loading...</div>;
  }
  const isQuizComplete = currentQuestionIndex === questions.length - 1;
  const currentQuestion = questions[currentQuestionIndex];
  const shuffledAnswers = shuffleAnswers(currentQuestion);

  const handleAnswerClick = (answer) => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setCorrectAnswers((prevCount) => prevCount + 1);
    }
  };

  return (
    <>
      {isQuizComplete ? (
        <>
          <ResultPage correctAnswers={correctAnswers} totalQuestion="10" />
        </>
      ) : (
        <div className="questionanswer">
          <h3 style={{ fontSize: "45px", margin: "10px" }}>
            {currentQuestionIndex + 1}/10
          </h3>
          <div className="question">
            {decodeHtmlEntities(currentQuestion.question)}
          </div>
          <ul>
            {shuffledAnswers.map((answer, index) => (
              <li
                className="options"
                key={index}
                onClick={() => handleAnswerClick(answer)}
              >
                {decodeHtmlEntities(answer)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
export default GeneralQuestion;
