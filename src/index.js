import React from "react"
import {Provider} from "react-redux"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import store from "./store"
import {ApiServiceProvider} from "./contexts"
import {Storage, ErrorBoundary} from "./hoc"
import {ApiService} from "./services"
import {App} from "./components"
import "bootstrap/dist/css/bootstrap.css"
import "notie/dist/notie.css"
import "./index.css"


const api = new ApiService()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Storage>
        <ErrorBoundary>
          <ApiServiceProvider value={api}>
            <App/>
          </ApiServiceProvider>
        </ErrorBoundary>
      </Storage>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
