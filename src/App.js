import React, {useState} from 'react'
import {Redirect, Route, useHistory, Switch} from 'react-router-dom';

import Dummy from './containers/Dummy';
import YoutubeSearch from './containers/YoutubeSearch';
import Signin from './containers/Signin'
import Navbar from './components/Navbar';


import './App.css';


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const history_ob = useHistory();

  return (
    // NOTE - <BrowserRouter is in index.js so that we can use useLocation() in this file
      <div>
        {/* <Navbar/> */}
        <Route exact path='/signin' render={() => <Signin setToken={setToken}/>}  />
        {token ? <Navbar/> : null }
        <Switch>
          <Route exact path='/' render = {() => token ? <YoutubeSearch /> : <Signin setToken={setToken}/>}/>
          <Route exact path='/dummy' render = {() => token ? <Dummy /> : <Signin setToken={setToken}/>}/>
          <Route exact path='/signout' render = { () => {
              setToken(null);
              localStorage.removeItem("token");
              history_ob.replace("/signin");
          }}/>
          <Route path='/' render = {() => <Redirect to='/' />} />   {/*Can be redirected to 404 page */}
        </Switch>
      </div>
  );
}

export default App;
