/* eslint-disable no-use-before-define */
const chalk = require("chalk");
const cloneDeep = require("lodash/cloneDeep");
const readline = require("readline");

let rl;

module.exports = (questions = {}) => {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    ask(cloneDeep(questions), answers => {
      rl.close();

      resolve(answers);
    });
  });
};

const ask = (questions, callback) => {
  // Find an unanswered question
  const [questionKey, question] =
    Object.entries(questions).find(
      ([_, question]) => typeof question.value === "undefined"
    ) || [];

  if (question) {
    // Ask it
    rl.question(formatQuestion(question), answer => {
      const questionsWithAnswer = Object.assign({}, questions, {
        [questionKey]: Object.assign({}, question, {
          value: parseAnswer(answer, question)
        })
      });
      ask(questionsWithAnswer, callback);
    });
  } else {
    // Exit if there are no more unanswered questions
    callback(
      Object.entries(questions).reduce(
        (accum, [key, question]) =>
          Object.assign({}, accum, { [key]: question.value }),
        {}
      )
    );
  }
};

const parseAnswer = (answer, { type, optional }) => {
  switch (type) {
    case Boolean:
      return answer.toLowerCase() === "y";
    default:
      return answer || (optional ? "" : undefined);
  }
};

const formatQuestion = ({ type, text }) => {
  switch (type) {
    case Boolean:
      return `${text} ${chalk.dim("(Y/N)")}: `;
    default:
      return `${text}: `;
  }
};
