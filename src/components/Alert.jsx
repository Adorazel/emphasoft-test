import React from "react"

const Alert = ({error = {}}) => <div className="alert alert-danger">
  <h4 className="alert-heading">{error.message || "Что-то пошло не так..."}</h4>
  <div>
    <small>
      {
        typeof error.description === "string"
          ? error.description
          : JSON.stringify(error.description, null, 2)
      }
    </small>
  </div>
</div>

export default Alert