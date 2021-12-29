import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../contexts/contexts.js'
import Axios from 'axios';

function SearchQuestions (props) {

  const {products, setProducts, currentProductId, setCurrentProductId, cqCopy, setCQCopy,
     currentQuestion, setCurrentQuestion, query, setQuery, filteredQuestions, setFilteredQuestions} = useContext(MainContext);

  const onFormChange = function(e) {
    setQuery(e.target.value);
  }

  const filteredQuestion = function() {

    const result = currentQuestion.filter(oneQuestion =>
      oneQuestion.question_body.toLowerCase().includes(query.toLowerCase())
    );
    console.log(result)
    console.log(currentQuestion)
  }

  useEffect(() => {

    query.length >= 3 && filteredQuestion()

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