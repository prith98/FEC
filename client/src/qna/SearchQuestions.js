import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../contexts/contexts.js'
import Axios from 'axios';

function SearchQuestions (props) {

  const {products, setProducts, currentProductId, setCurrentProductId, cqCopy, setCQCopy,
     currentQuestion, setCurrentQuestion, query, setQuery, filteredQuestions, setFilteredQuestions} = useContext(MainContext);

  const onFormChange = function(e) {
    setQuery(e.target.value);
  }

  const onQueryChange = function () {
    let testArr = filteredQuestion()
    console.log(testArr);
  }

  const usePrevious = function (value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const filteredQuestion = function() {

    const result = currentQuestion.filter(oneQuestion =>
      oneQuestion.question_body.toLowerCase().includes(query.toLowerCase())
    );

    return result;

    // setTimeout(() => {
    //   console.log(result);
    //   setCurrentQuestion(result);
    // }, 1000)

  }

  useEffect(() => {

    cqCopy && cqCopy.length && onQueryChange()

  })

  return (
    <form id="formQASearch">
      <label>
        <input
          name="search"
          id="QASearch"
          type="text"
          value={query}
          placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
          onChange={onFormChange}
          />
      </label>
    </form>
  )

}

export default SearchQuestions;