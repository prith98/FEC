import React, { useState, useContext, useEffect} from 'react';
import {MainContext} from '../contexts/contexts.js'
import axios from 'axios';

function IndividualQandA () {

  const {products, setProducts, currentProductId, setCurrentProductId, cqCopy, setCQCopy,
    allQuestions, setAllQuestions, currentQuestion, setCurrentQuestion, query, setQuery, filteredQuestions, setFilteredQuestions} = useContext(MainContext);
  const [currentAnswers, setCurrentAnswers] = useState(null);
  const [questionIDs, setQuestionIDs] = useState(null);

  let currentAnswersData = [];
  let questionIDsArray = [];

  // Get all answers for a specific Question based on questionID
  const getAnswers = function (id) {
    axios
      .get('/qa/questions/' + id.toString() + '/answers')
      .then((results) => {
        return results.data.results
      })
  }

  // Updates the currentQuestion list to show that the YES count has increased
  const updateCPID = function() {
    axios
      .get('/qa/questions?product_id=' + currentProductId)
      .then((result) => {
        setCurrentQuestion(result.data.results);
      })
  }

  // Send a PUT Request for a specific Answer ID to mark it as helpful and increase helpful count on server
  const updateAHelpful = function(e) {
    let aID = e.currentTarget.dataset.id;
    axios
      .put('/qa/answers/' + aID.toString() + '/helpful')
      .then((results) => {
        console.log('Successfully marked answer ' + aID.toString() + ' as helpful');
      })
      .then(() => {updateCPID()})
  }


  // Send a PUT Request for a specific Question ID if it was helpful to increase the helpful count on server
  const updateQHelpful = function(e) {
    let qID = e.currentTarget.dataset.id;
    axios
      .put('/qa/questions/' + qID.toString() + '/helpful')
      .then((results) => {
        console.log('Successfully marked question ' + qID + ' as helpful');
      })
      .then(() => {updateCPID()})
  }

  useEffect(() => {

    currentQuestion && currentQuestion.length && currentQuestion.forEach((question) => {
      let qID = question.question_id;
      let newObj = {[question.question_id]: true};
      questionIDsArray.push(newObj);
      currentAnswersData.push(axios.get('/qa/questions/' + question.question_id + '/answers').then((result) => { return result.data; }));
    });
    Promise.all(currentAnswersData).then((values) => {
      setCurrentAnswers(values);
    });
    Promise.all(questionIDsArray).then((values) => {
      setQuestionIDs(values);
    });

  }, [currentQuestion]);



  // Will show "LOADING..." until
  // currentQuestion object has been resolved in qna.js
  // and successfully passed down to this component
  if (currentQuestion === null) {
    return (
      <div>
        LOADING...
      </div>
    )
  }

  return (
    <div>
      {/* Dynamically renders questions from currentQuestion prop in the format of Question, then Answer, then asker name, date asked, helpful, how many people found it helpful, and report*/}
      {currentQuestion.map(oneQuestion => {
        let answerArray = Object.values(oneQuestion.answers);
        let finalAnswers = answerArray.map(oneAnswer => {
          return (
            <div key={oneAnswer.id}>
              <div className="answerBody">A: {oneAnswer.body}</div>
              <div className="answerBottomText">by {oneAnswer.answerer_name}, {oneAnswer.date.slice(0,10)}   |   Helpful? <span data-id={oneAnswer.id} onClick={updateAHelpful}><u>Yes</u></span>({oneAnswer.helpfulness})   |   <u>Report</u></div>
            </div>
          );
        });
        return (
          <div key={oneQuestion.question_id} className="individualQA">
            <div>
              Q: {oneQuestion.question_body}
              <span> by {oneQuestion.asker_name}, Date Asked: {oneQuestion.question_date.slice(0, 10)}   |   Helpful? <span data-id={oneQuestion.question_id} onClick={updateQHelpful}><u>Yes</u></span> ({oneQuestion.question_helpfulness})   |   <u> Add Answer </u> </span>
            </div>
            <div id="answers">{finalAnswers}</div>
          </div>
        )
      })}
    </div>
  )

}

export default IndividualQandA;