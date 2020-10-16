import React from "react"
import {NavLink} from "react-router-dom"
import {Alert} from "./";

const List = props => {

  const {isLoading, error, users, doDelete, changeStatus} = props

  return <section className="table-responsive" style={{paddingTop: "56px"}}>

    <table className="table table-sm table-hover">
      <thead className="thead-light">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Username</th>
        <th scope="col">First&nbsp;Name</th>
        <th scope="col">Last&nbsp;Name</th>
        <th scope="col">Active</th>
        <th scope="col">Last&nbsp;login</th>
        <th scope="col">Superuser</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      {
        !users.length && !error && <tbody>
        <tr className="table-success">
          <td colSpan={8} className="text-center">Loading...</td>
        </tr>
        </tbody>
      }
      {
        error && <tbody>
        <tr className="table-danger">
          <td colSpan={8} className="text-center"><Alert error={error}/></td>
        </tr>
        </tbody>
      }
      {
        !error && <tbody>
        {
          users.map(user => {
            return <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.username}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.is_active ? <strong className="text-success">Yes</strong> :
                <strong className="text-danger">No</strong>}</td>
              <td>{user.last_login}</td>
              <td>{user.is_superuser ? <strong className="text-success">Yes</strong> :
                <strong className="text-danger">No</strong>}</td>
              <td>
                <NavLink to={`/users/edit/${user.id}`} className="btn btn-sm btn-primary" disabled={isLoading}>Edit</NavLink>
                {!user.is_superuser && <>
                  {" "}
                  <button className="btn btn-sm btn-warning" onClick={() => changeStatus(user.id, !user.is_active)} disabled={isLoading}>
                    {user.is_active ? "Deactivate" : "Activate"}
                  </button>
                  {" "}
                  <button className="btn btn-sm btn-danger" onClick={() => doDelete(user.id)} disabled={isLoading}>Delete</button>
                </>}
              </td>
            </tr>
          })
        }
        </tbody>
      }
    </table>
  </section>
}

export default List