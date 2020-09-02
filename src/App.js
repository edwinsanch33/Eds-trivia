import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './Home';
import Quiz from './Quiz';

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/quiz">
          <Quiz />
        </Route>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
