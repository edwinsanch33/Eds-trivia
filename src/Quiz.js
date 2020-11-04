import React from 'react';
import { useHistory } from 'react-router-dom';


const Quiz = (props) => {
  const history = useHistory();
  const {questionInfo, id} = props
  const {question, incorrect_answers, correct_answer, category} = questionInfo
  const answers = [...incorrect_answers, correct_answer]
  console.log(answers)

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  const next = (index) => {
    if(index < 10){
      history.push(`./#${index+1}`)
      const id = window.location.hash.replace('#/#', '');
      const element = document.getElementById(id);
      element.scrollIntoView({behavior: "smooth", block: "center"});
    }
  }
  
  return (
    <>
      <h2 className="card-header">
        {decodeURIComponent(category)}
      </h2>
      <div className="card-body">
        <h3 className="card-title">{decodeURIComponent(question)}</h3>
        {shuffle(answers).map((choice,index) => {
          return (
            <div key={index}>
              <input onClick={() => next(id)} type="radio" name={id} value={decodeURIComponent(choice)}/>
              <label>{decodeURIComponent(choice)}</label>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default Quiz;
