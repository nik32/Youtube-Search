import React, { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';

import Dummy from './containers/Dummy';
import YoutubeSearch from './containers/YoutubeSearch';
import Signin from './containers/Signin'
import Navbar from './components/Navbar';


import './App.css';


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    // NOTE - <BrowserRouter is in index.js so that we can use useLocation() in this file
    <div>
      {token ? <Navbar setToken={setToken} /> : null}
      <Switch>
        <Route exact path='/signin' render={() => <Signin setToken={setToken} />} />
        <Route exact path='/' render={() => token ? <YoutubeSearch /> : <Redirect to="/signin" />} />
        <Route exact path='/dummy' render={() => token ? <Dummy /> : <Redirect to="/signin" />} />
        <Route path='/' render={() => <Redirect to='/' />} />   {/*Can be redirected to 404 page */}
      </Switch>
    </div>
  );
}

export default App;
