import React from "react"
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import {LoginPage, MainPage, UserPage} from "../pages"


const App = ({isAuth}) => {
  return <Router>
    <Switch>
      <Route path="/users/create">{isAuth ? <UserPage/> : <Redirect to="/"/>}</Route>
      <Route path="/users/edit/:id">{isAuth ? <UserPage/> : <Redirect to="/"/>}</Route>
      <Route path="/users">{isAuth ? <MainPage/> : <Redirect to="/"/>}</Route>
      <Route exact path="/">{!isAuth ? <LoginPage/> : <Redirect to="/users"/>}</Route>
      <Route><Redirect to="/"/></Route>
    </Switch>
  </Router>
}

export default App
