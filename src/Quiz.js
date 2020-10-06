import React from 'react';


const Quiz = (props) => {
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
  return (
    <div id={id}>
      <h1>
        {decodeURIComponent(category)}
      </h1>
      <h3>{decodeURIComponent(question)}</h3>
      {shuffle(answers).map((choice,index) => {
        return <li value={decodeURIComponent(choice)} key={index}>{decodeURIComponent(choice)}</li>
      })}
      
    </div>
  );
}

export default Quiz;
