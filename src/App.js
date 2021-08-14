import Sidebar from './Sidebar';
import Chat from './Chat'
import Login from './Login'
import './App.css';
import {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import { useStateValue } from './StateProvider';


function App() {
  const [{user},dispatch]=useStateValue()
  return (
    <div className="chat">
      {!user?(
        <Login/>):(
      <div className="chatwindow">
        <Router>
          <Sidebar/>
          <Switch>
            <Route path="/rooms/:roomId">
            <Chat/>
            </Route>
            <Route path="/"></Route>
          </Switch>
         
        </Router>
        
      </div>)}

    </div>
  );
}

export default App;
