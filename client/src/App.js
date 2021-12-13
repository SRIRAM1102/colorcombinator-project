import './App.css';
import {Signup} from "./Signup";
import {Login} from "./Login";
import {Component} from './component';
import {Tour} from './tour';
import {History} from"./History";
import {Route,Switch} from 'react-router-dom';
import { useState } from 'react';

function App() {
 const[closetcolor,setclosetcolor]=useState({}); 
  const[lighting,setlighting]=useState(true);
  return (
    <div classname="app">
    <Switch>
      <Route exact path="/login">
          <Login/>  
        </Route>
          <Route exact path="/signup">
          <Signup/>  
        </Route>
        <Route exact path="/tour">
          <Tour setlighting={setlighting} lighting={lighting} />  
        </Route>
        <Route exact path="/tour/history">
          <History setlighting={setlighting} lighting={lighting}/>  
        </Route>
<Route path="/*">
  <Component  setlighting={setlighting} lighting={lighting} closetcolor={closetcolor} setclosetcolor={setclosetcolor}/>
</Route>
</Switch>
  </div>
  )}
export default App;
