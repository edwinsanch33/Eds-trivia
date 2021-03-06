import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Quiz from './Quiz';



const Home = () => {
  const history = useHistory();
  const [startInfo, setStartInfo] = useState(
    {
      category: 'any',
      diffculty: 'any',
      token: '',
      questions: [],
      start: false
    }
  );
  let [totalQs,setTotalQs] = useState(10)
  const [userAnswers] = useState([]);
  const [correctAnswers] = useState([]);
  const [userScore,setUserScore] = useState([]);

  // token used to mix up questions per session expires after 6 hours
  // useEffect(() => {
  //   if(startInfo.token.length < 1){
  //     fetch('https://opentdb.com/api_token.php?command=request')
  //     .then(r => r.json())
  //     .then(d =>  startInfo.token = d.token)
  //   }
  // })

  const changeValue = (e) => {
    userAnswers[e.target.name-1] = e.target.value
    checkAnswers(e.target.name-1)
  }

  const handleChange = (e) => {
    const values = {...startInfo}
    if (e.target.name === "category"){
      values.category = e.target.value
    } else if (e.target.name === "level"){
      values.diffculty = e.target.value
    }
    setStartInfo(values)
  }

  const checkAnswers = (qnumber) => {
      if(decodeURIComponent(correctAnswers[qnumber]) === userAnswers[qnumber]){
        userScore[qnumber] = 1
      } else userScore[qnumber] = 0
      if(userAnswers.length === 10) {
        userScore.reduce((a, b) => a + b, 0)
      }
  }

  const submit = (e) => {
    e.preventDefault()
    let query = `https://opentdb.com/api.php?amount=${totalQs}&type=multiple&encode=url3986&`
    const getQuery = () =>{
      if(typeof(startInfo.category) === "number" && typeof(startInfo.diffculty) === "number") {
        return query = `https://opentdb.com/api.php?amount=${totalQs}&category=${startInfo.category}&difficulty=${startInfo.diffculty}&type=multiple&encode=url3986&`
      } else if ( typeof(startInfo.category) === "number") {
        return query = `https://opentdb.com/api.php?amount=${totalQs}&category=${startInfo.category}&type=multiple&encode=url3986&`
      } else if (typeof(startInfo.diffculty) === "number") {
        return query = `https://opentdb.com/api.php?amount=${totalQs}&difficulty=${startInfo.diffculty}&type=multiple&encode=url3986&`
      } 
    }
    const getInfo = () => {
      fetch(`${query}`)
      .then(response => response.json())
      .then(data => {
        if(data.response_code === 0){
          setTotalQs(totalQs)
          setStartInfo({...startInfo, questions: data.results, start: true})
          for(let i= 0; i < totalQs; i++){
            correctAnswers[i] = data.results[i].correct_answer
          }
          const element = document.getElementById(1);
          element.scrollIntoView({behavior: "smooth", block: "center"});
        } else if (data.response_code === 1) {
          setTotalQs(totalQs--)
          getInfo()
        } else if (data.response_code === 4){
          fetch(`https://opentdb.com/api_token.php?command=reset&token=${startInfo.token}`)
            .then(r => r.json())
            .then(d =>  startInfo.token = d.token)
          setStartInfo(startInfo)
          getInfo()
        }
      })
    }
    getQuery()
    getInfo()
  }
  // navigation for button below questions 
  const prev = (index) => {
    if(index > 1){
      history.push(`./#${index-1}`)
      const id = window.location.hash.replace('#/#', '');
      const element = document.getElementById(id);
      element.scrollIntoView({behavior: "smooth", block: "center"});
    }
  }
  const next = (index) => {
    if(index < totalQs){
      history.push(`./#${index+1}`)
      const id = window.location.hash.replace('#/#', '');
      const element = document.getElementById(id);
      element.scrollIntoView({behavior: "smooth", block: "center"});
    } else if (index === totalQs){
      setUserScore(userScore.reduce((a, b) => a + b, 0))
      const element = document.getElementById("score");
      element.scrollIntoView({behavior: "smooth", block: "center"});
    }
  }
  return (
    <div>
      <h1>Ed's Test Your Knowledge</h1>
      <div className="form-group">
        <form>
          <select name="category" className="form-control mt-5 mb-4 mx-auto" style={{width: "200px"}} onChange={handleChange}>
            <option value="any">Ed's Choice</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals & Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19"> Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime & Manga</option>
            <option value="32">Entertainment: Cartoons & Animations</option>
          </select>
          <select name="level" className="form-control mb-5 mx-auto" style={{width: "200px"}} onChange={handleChange}>
            <option value="any">Random</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button  className="btn btn-lg btn-outline-success" onClick={submit}>Start</button>
        </form>
      </div>
      { startInfo.start ? startInfo.questions.map( (question,index) => (
        <div onChange={changeValue} key={index} id={index+1} className="card bg-light" style={{width: 'auto', alignContent: 'center', height: '100vh', margin: '20px'}}>
          <Quiz id={index+1} questionInfo={question} totalQs={totalQs}/> 
          <button onClick={() => prev(index+1)}>Prev</button>
          <button onClick={() => next(index+1)}>Next</button> 
        </div>)) 
        : null 
      }
      { startInfo.start ? 
        <div id="score" style={{width: 'auto', alignContent: 'center', height: '100vh', margin: '20px'}}>
          <h1>Awesome! You Scored</h1>
          <h2> {userScore} / {totalQs} </h2>
        </div>
      : null }
    </div>
  )
}

export default Home
