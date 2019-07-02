import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import User from './User';
import Leaves from './Leaves';

import * as serviceWorker from './serviceWorker';

require('dotenv').config()

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/user" component={User} />
      <Route path="/leaves" component={Leaves} />

      
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
