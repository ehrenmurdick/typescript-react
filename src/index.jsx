import * as React from "react"
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'

import { Voting } from './components/voting'
import { Home } from './components/home'

import { createAppStore } from './store/store'

const store = createAppStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Home} />
      <Route path="/vote" component={Voting} />
    </Router>
  </Provider>,
  document.getElementById("app")
);
