import React, {useRef} from "react"
import {NavLink} from "react-router-dom"

const Header = props => {

  const {search, doLogout, changeHandler, location, backBtnRef} = props

  const {pathname} = location

  const nav = useRef()

  const navHandler = () => {
    nav.current.classList.toggle("show")
  }

  return <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top position-fixed">
    <span className="navbar-brand">
      {pathname === "/users" ? "Users" : pathname === "/users/create" ? "Create User" : "Edit User"}
    </span>
    <button className="navbar-toggler" onClick={navHandler} >
      <span className="navbar-toggler-icon"/>
    </button>
    <div ref={nav} className="collapse navbar-collapse">
      {
        pathname === "/users"
          ? <>
            <div className="form-inline my-2 my-sm-0">
              <input className="form-control mr-sm-2" type="search" name="search" placeholder="Enter Username"
                     value={search} onChange={changeHandler}/>
            </div>
            <NavLink to={`/users/create`} className="btn btn-success">Create User</NavLink>
            <div className="form-inline ml-auto">
              <button className="btn btn-danger my-2 my-sm-0" onClick={doLogout}>Logout</button>
            </div>
          </>
          : <div className="form-inline ml-auto">
            <NavLink ref={backBtnRef} to="/users" className="btn btn-danger my-2 my-sm-0">Back</NavLink>
          </div>
      }
    </div>
  </nav>
}

export default Header