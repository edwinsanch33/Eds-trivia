import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import Home from './Home';

const App = () => {
  return (
    <React.Fragment>
      <HashRouter>
        <Route exact path="/">
          <Home />
        </Route>
      </HashRouter>
    </React.Fragment>
  );
}

export default App;
