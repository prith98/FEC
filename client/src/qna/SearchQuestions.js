import React, { useState, useContext, useEffect, useRef } from 'react';
import {MainContext} from '../contexts/contexts.js'
import Axios from 'axios';

function SearchQuestions (props) {

  const {products, setProducts, currentProductId, setCurrentProductId, cqCopy, setCQCopy, currentQuestion, setCurrentQuestion, query, setQuery, filteredQuestions, setFilteredQuestions} = useContext(MainContext);

  // Handles text change in query
  const onFormChange = function(e) {
    setQuery(e.target.value);
  }

  // When query length is less than 3, question list is set to original list
  // When query length is 3 or more, runs filtered question and sets question list to the filtered list
  // When it goes back to less than 3, question list is set to the original again
  const onQueryChange = function () {
    let filter = filteredQuestion();
    if (query.length >= 3) {
      setCurrentQuestion(filter);
    } else {
      setCurrentQuestion(cqCopy)
    }
  }


  // Filters current question list based on whether or not
  // the question in lower case contains lower case query string
  const filteredQuestion = function() {
    const result = cqCopy.filter(oneQuestion =>
      oneQuestion.question_body.toLowerCase().includes(query.toLowerCase())
    );
    return result;
  }

  // useEffect only runs when query value is changed to prevent infinite loops
  useEffect(() => {

    cqCopy && cqCopy.length && onQueryChange()


  }, [query])

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