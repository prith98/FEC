import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../contexts/contexts.js'
import Axios from 'axios';

function SearchQuestions () {

  const {products, setProducts, currentProductId, setCurrentProductId, currentQuestion, setCurrentQuestion} = useContext(MainContext);
  const [query, setQuery] = useState("");
  const [startFiltering, setStartFilter] = useState(false);

  const onFormChange = function(e) {
    setQuery(e.target.value);
    if (query.length >= 3) {
      setStartFilter(true);
    }
  }

  useEffect(() => {

    console.log('hello')

  }, [startFiltering])

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