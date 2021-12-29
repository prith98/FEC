import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../contexts/contexts.js'
import Axios from 'axios';

function SearchQuestions () {

  const {products, setProducts, currentProductId, setCurrentProductId, currentQuestion, setCurrentQuestion} = useContext(MainContext);


  return (
    <div>
      <div id="searchBar">Search</div>
    </div>
  )

}

export default SearchQuestions;