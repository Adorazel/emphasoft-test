import React from "react"
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import {PublicRoute, PrivateRoute} from "./"
import {LoginPage, MainPage, UserPage} from "../pages"


const App = () => <Router>
  <Switch>
    <PrivateRoute path="/users/create"><UserPage/></PrivateRoute>
    <PrivateRoute path="/users/edit/:id"><UserPage/></PrivateRoute>
    <PrivateRoute path="/users"><MainPage/></PrivateRoute>
    <PublicRoute exact restricted path="/"><LoginPage/></PublicRoute>
    <Route><Redirect to="/"/></Route>
  </Switch>
</Router>


export default App
