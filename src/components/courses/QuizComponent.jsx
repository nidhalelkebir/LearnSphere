import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const QuizComponent = ({ quiz = {}, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const questions = quiz.questions || [];

  const handleAnswer = (index) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = index;
    setSelectedAnswers(newAnswers);

    if (questions[currentQuestion]?.correctAnswer === index) {
      setScore(score + 1);
      toast.success('Correct!');
    } else {
      toast.error('Incorrect!');
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      if (onComplete) {
        onComplete({ score, total: questions.length });
      }
    }
  };

  if (questions.length === 0) {
    return <div className="text-center py-8 text-gray-600">No quiz available</div>;
  }

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Quiz Complete!</h2>
        <div className="mb-6">
          <p className="text-5xl font-bold text-indigo-600 mb-2">{percentage.toFixed(0)}%</p>
          <p className="text-gray-600 dark:text-gray-400">You scored {score} out of {questions.length}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Retake Quiz
        </button>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-8"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-semibold text-indigo-600">{score} correct</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{question?.question}</h2>

      <div className="space-y-3 mb-8">
        {question?.options?.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleAnswer(index)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              selectedAnswers[currentQuestion] === index
                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900'
                : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={selectedAnswers[currentQuestion] === undefined}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
      </button>
    </motion.div>
  );
};

export default QuizComponent;
