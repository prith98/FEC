import React, { useState, useContext, useEffect, useRef } from 'react';
import {MainContext} from '../contexts/contexts.js'
import axios from 'axios';
import IndividualQandA from '/client/src/qna/IndividualQandA.js';
import SearchQuestions from '/client/src/qna/SearchQuestions.js';

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


  let allQuestionsData = [];
  let currentQuestionData = [];


  useEffect(() => {

    // Getting all of the data from the questions API and storing it in allQuestionsData Array as a promisified object
    products.forEach((product) => {
      allQuestionsData.push(axios.get('/qa/questions?product_id=' + product.id).then((result) => { return result.data; }));
    });

    // Getting all the questions for the specified currentProductId and storing it in currentQuestionData as a promisified object
    currentQuestionData.push(axios.get('/qa/questions?product_id=' + currentProductId).then((result) => { return result.data; }));


    // Iterate over Promisified array to see if each promise resolves, if they do, then the output will be the specific data
    // use the relevant setter to set state
    Promise.all(allQuestionsData).then((values) => {
      setAllQuestions(values);
    });
    Promise.all(currentQuestionData).then((values) => {
      setCurrentQuestion(values[0].results);
      setCQCopy(values[0].results);
    })
  }, []);



  return (
    <div>
      <h1 id="QAHeader">Question & Answers</h1>
      {/* Passing down all the state values to SearchQuestions and IndividualQandA */}
      <MainContext.Provider value={{products, setProducts, currentProductId, setCurrentProductId, allQuestions, setAllQuestions, currentQuestion, setCurrentQuestion, cqCopy, setCQCopy, query, setQuery, filteredQuestions, setFilteredQuestions}}>
          <SearchQuestions />
          <IndividualQandA />
      </MainContext.Provider>
    </div>
  );

}

export default Qna;