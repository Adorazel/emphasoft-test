import React from "react"
import {Alert} from "./"

const Auth = props => {

  const {username, usernameRef, password, isLoading, error, changeHandler, doLogin} = props

  return <div className="min-vh-100 vw-100 d-flex justify-content-center align-items-center flex-column bg-secondary p-4">
    <div className="login-form w-100 p-4 bg-white rounded">
      <h1 className="mb-3">Login</h1>
      {error && <Alert error={error}/>}
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input ref={usernameRef} type="text" className={`form-control${username.isValid ? "" : " is-invalid"}`}
               id="username" name="username"
               value={username.value} onChange={changeHandler} disabled={isLoading}/>
        <div className="invalid-feedback"> Please provide a valid Username.</div>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className={`form-control${password.isValid ? "" : " is-invalid"}`} id="password"
               name="password"
               value={password.value} onChange={changeHandler} disabled={isLoading}/>
        <div className="invalid-feedback"> Please provide a valid Password.</div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={doLogin} disabled={isLoading}>Login</button>
    </div>
  </div>
}

export default Auth