import questions from "./questions.js";
import Quiz from "./quiz.js";

const quiz = new Quiz(questions);

quiz.start();
quiz.events();
