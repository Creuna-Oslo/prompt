/* eslint-disable no-use-before-define */
const readlineSync = require('readline-sync');

module.exports = (questions = {}) => {
  // Transform questions with string shorthand to question objects
  const parsedQuestions = Object.entries(questions).reduce(
    (accum, [key, question]) =>
      Object.assign(accum, {
        [key]: typeof question === 'string' ? { text: question } : question
      }),
    {}
  );

  return ask(parsedQuestions);
};

const ask = (questions, callback) => {
  // Find an unanswered question
  const [questionKey, question] =
    Object.entries(questions).find(
      ([_, question]) => typeof question.value === 'undefined'
    ) || [];

  if (question) {
    // Ask it
    const questionHandler =
      question.type === Boolean ? readlineSync.keyInYN : readlineSync.question;

    const answer = questionHandler(`${question.text}: `, {
      hideEchoBack: question.obfuscate
    });
    const questionsWithAnswer = Object.assign({}, questions, {
      [questionKey]: Object.assign({}, question, {
        value: parseAnswer(answer, question)
      })
    });

    return ask(questionsWithAnswer, callback);
  } else {
    // Exit if there are no more unanswered questions
    return Object.entries(questions).reduce(
      (accum, [key, question]) =>
        Object.assign({}, accum, { [key]: question.value }),
      {}
    );
  }
};

const parseAnswer = (answer, { type, optional }) => {
  switch (type) {
    case Boolean:
      // readline-sync returns empty string if a key other than 'y' or 'n' is pressed. If answer is not a boolean, keep asking.
      return typeof answer === 'boolean' ? answer : undefined;
    default:
      // If answer isn't optional, keep asking
      return answer || (optional ? '' : undefined);
  }
};
