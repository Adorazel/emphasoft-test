import React, {useRef} from "react"
import {HeaderContainer, UserContainer} from "../containers"


const UserPage = () => {
  const backBtnRef = useRef()

  return <>
    <HeaderContainer backBtnRef={backBtnRef}/>
    <UserContainer backBtnRef={backBtnRef}/>
  </>
}

export default UserPage