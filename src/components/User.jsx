import React from "react"
import {Alert} from "./index";

const User = props => {

  const {user, isLoading, error, changeHandler, isCreate, doSubmit} = props
  const {id, username, first_name, last_name, password, is_active, last_login, is_superuser} = user



  return <section style={{paddingTop: "56px"}}>
    <div className="container">
      <div className="py-3">
        {
          error && <Alert error={error}/>
        }
        {
          !isCreate && <div className="form-group">
            <label htmlFor="id">ID</label>
            <input type="text" className="form-control" id="id" name="id"
                   value={id.value} onChange={changeHandler} disabled={isLoading || id.isReadOnly}/>
          </div>
        }
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className={`form-control${username.isValid ? "" : " is-invalid"}`} id="username" name="username"
                 value={username.value} onChange={changeHandler} disabled={!isCreate || isLoading || username.isReadOnly}/>
          <div className="invalid-feedback">{username.errorMessage}</div>
        </div>
        <div className="form-group">
          <label htmlFor="first_name">First&nbsp;Name</label>
          <input type="text" className={`form-control${first_name.isValid ? "" : " is-invalid"}`} id="first_name" name="first_name"
                 value={first_name.value} onChange={changeHandler} disabled={isLoading || first_name.isReadOnly}/>
          <div className="invalid-feedback">{first_name.errorMessage}</div>
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Last&nbsp;Name</label>
          <input type="text" className={`form-control${last_name.isValid ? "" : " is-invalid"}`} id="last_name" name="last_name"
                 value={last_name.value} onChange={changeHandler} disabled={isLoading || last_name.isReadOnly}/>
          <div className="invalid-feedback">{last_name.errorMessage}</div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className={`form-control${password.isValid ? "" : " is-invalid"}`} id="password" name="password"
                 value={password.value} onChange={changeHandler} disabled={isLoading || password.isReadOnly}/>
          <div className="invalid-feedback">{password.errorMessage}</div>
        </div>
        <div className="form-group">
          <label htmlFor="is_active">Active</label>
          <select className="form-control" id="is_active" name="is_active"
                  value={!!is_active.value} onChange={changeHandler} disabled={isLoading || is_active.isReadOnly || !!is_superuser.value}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="last_login">Last&nbsp;Login</label>
          <input type="date" className="form-control" id="last_login" name="last_login"
                 value={last_login.value} onChange={()=>{}} disabled={isLoading || last_login.isReadOnly}/>
        </div>
        <div className="form-group">
          <label htmlFor="is_superuser">Superuser</label>
          <select className="form-control" id="is_superuser" name="is_superuser"
                  value={is_superuser.value} onChange={()=>{}} disabled={isLoading || is_superuser.isReadOnly}>
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>
        <div className="text-right">
          <button className="btn btn-primary my-2 my-sm-0" disabled={isLoading} onClick={doSubmit}>Submit</button>
        </div>
      </div>
    </div>

  </section>
}

export default User