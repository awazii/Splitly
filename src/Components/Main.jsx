import React, { useEffect } from 'react'
import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { selectIsNewUser } from "../store/UserSlice";
import { useSelector } from "react-redux";
export const Main = () => {
  const isNewUser = useSelector(selectIsNewUser);
  return (
    <div className="Main-Area h-screen w-screen flex ">
      {!isNewUser && <Navbar />}
      <div className="context flex-1 bg-background m-2  rounded-md text">
        <Outlet />
      </div>
    </div>
  )
}
