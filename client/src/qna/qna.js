import React, { useState, useContext, useEffect, useRef } from 'react';
import {MainContext} from '../contexts/contexts.js'
import axios from 'axios';
import IndividualQandA from '/client/src/qna/IndividualQandA.js';
import SearchQuestions from '/client/src/qna/SearchQuestions.js';
import AddQuestion from '/client/src/qna/AddQuestion.js';

function Qna () {

  const {products, setProducts, currentProductId, setCurrentProductId} = useContext(MainContext);

  // Creating new state for allQuestions and currentQuestion,
  // which will be an array  of all questions and
  // an array of questions for the currentProductId
  const [allQuestions, setAllQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [cqCopy, setCQCopy] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState(null);
  const [questionIDs, setQuestionIDs] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [numCurrentQuestions, setNumCurrentQuestions] = useState(null);
  const [currentCount, setCurrentCount] = useState(2);
  const [limitQuestions, setLimitQuestions] = useState(null);



  let allQuestionsData = [];
  let currentQuestionData = [];
  let questionIDsObj = {};
  let limitQuestionsData = [];

  const increaseCount = function () {
    console.log(numCurrentQuestions)
    if (numCurrentQuestions > currentCount + 2) {
      setCurrentCount(currentCount + 2);
      console.log(currentCount)
    }
  }

  const openModal = function () {
    setShowModal(true);
  }

  useEffect(() => {

    // Getting all of the data from the questions API and storing it in allQuestionsData Array as a promisified object
    products.forEach((product) => {
      allQuestionsData.push(axios.get('/qa/questions?product_id=' + product.id).then((result) => { return result.data; }));
    });

    // Getting all the questions for the specified currentProductId and storing it in currentQuestionData as a promisified object
    currentQuestionData.push(axios.get('/qa/questions?product_id=' + currentProductId + '&page=1&count=100').then((result) => { return result.data; }));
    limitQuestionsData.push(axios.get('/qa/questions?product_id=' + currentProductId + '&page=1&count=' + currentCount).then((result) => { return result.data; }));



    // Iterate over Promisified array to see if each promise resolves, if they do, then the output will be the specific data
    // use the relevant setter to set state
    Promise.all(allQuestionsData).then((values) => {
      setAllQuestions(values);
    });
    Promise.all(currentQuestionData).then((values) => {
      setCurrentQuestion(values[0].results);
      setCQCopy(values[0].results);
      for (let i = 0; i < values[0].results.length; i++) {
        questionIDsObj[values[0].results[i]["question_id"]] = true;
      }
      setQuestionIDs(questionIDsObj);
      setNumCurrentQuestions(values[0].results.length);
    });
    Promise.all(limitQuestionsData).then((values) => {
      setLimitQuestions(values[0].results)
    });
  }, [currentCount]);



  return (
    <div>
      <h1 id="QAHeader">Question & Answers</h1>
      {/* Passing down all the state values to SearchQuestions and IndividualQandA */}
      <MainContext.Provider value={{products, setProducts, currentProductId, setCurrentProductId, numCurrentQuestions, setNumCurrentQuestions, allQuestions, setAllQuestions, questionIDs, setQuestionIDs, currentQuestion, setCurrentQuestion, cqCopy, setCQCopy, query, setQuery, filteredQuestions, setFilteredQuestions, showModal, setShowModal, limitQuestions, setLimitQuestions}}>
          <SearchQuestions />
          <IndividualQandA />
          <button id="qnaButton" onClick={increaseCount}>More Answered Questions</button>
          <button id="qnaButton" onClick={openModal}>Add A Question +</button>
          {showModal ? <AddQuestion setShowModal={setShowModal} /> : null}
      </MainContext.Provider>
    </div>
  );

}

export default Qna;