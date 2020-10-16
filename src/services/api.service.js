export default class ApiService {

  constructor(apiUrl = "https://emphasoft-test-assignment.herokuapp.com") {

    this.apiUrl = apiUrl
    this.apiRoot = "/api/v1"
    this.authUri = "/api-token-auth/"

  }

  auth(data) {
    let success = true
    return fetch(`${this.apiUrl}${this.authUri}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      success = response.ok
      return response.json()
    }).then(json => {
      return new Promise((resolve, reject) => {
        if (success) return resolve(json)
        else return reject({message: "Auth error", description: json})
      })
    })
  }

  getAllUsers({token}) {
    let success = true
    return fetch(`${this.apiUrl}${this.apiRoot}/users/`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`
      }
    }).then(response => {
      success = response.ok
      return response.json()
    }).then(json => {
      return new Promise((resolve, reject) => {
        if (success) return resolve(json)
        else return reject({message: "Fetch users error", description: json})
      })
    })
  }

  getUser({id, token}) {
    let success = true
    return fetch(`${this.apiUrl}${this.apiRoot}/users/${id}/`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`
      }
    }).then(response => {
      success = response.ok
      return response.json()
    }).then(json => {
      return new Promise((resolve, reject) => {
        if (success) return resolve(json)
        else return reject({message: "Fetch user error", description: json})
      })
    })
  }

  createUser({user, token}) {
    let success = true
    return fetch(`${this.apiUrl}${this.apiRoot}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify(user)
    }).then(response => {
      success = response.ok
      return response.json()
    }).then(json => {
      return new Promise((resolve, reject) => {
        if (success) return resolve(json)
        else return reject({message: "Create user error", description: json})
      })
    })
  }

  updateUser({id, user, token}) {
    let success = true
    return fetch(`${this.apiUrl}${this.apiRoot}/users/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify(user)
    }).then(response => {
      success = response.ok
      return response.json()
    }).then(json => {
      return new Promise((resolve, reject) => {
        if (success) return resolve(json)
        else return reject({message: "Update user error", description: json})
      })
    })
  }

  updateUserStatus({id, is_active, token}) {
    let success = true
    return fetch(`${this.apiUrl}${this.apiRoot}/users/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify({is_active})
    }).then(response => {
      success = response.ok
      return response.json()
    }).then(json => {
      return new Promise((resolve, reject) => {
        if (success) return resolve(json)
        else return reject({message: "Update user status error", description: json})
      })
    })
  }

  deleteUser({id, token}) {
    return fetch(`${this.apiUrl}${this.apiRoot}/users/${id}/`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${token}`
      }
    }).then(response => {
      return new Promise((resolve, reject) => {
        if (response.status === 204) return resolve({deleted: true})
        else return reject({message: "Delete user error", description: {deleted: false}})
      })
    })
  }

}