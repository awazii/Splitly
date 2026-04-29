import React, { useEffect } from 'react'
import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { selectAllFriends } from "../store/FriendsSlice";
import { useSelector } from "react-redux";
export const Main = () => {
  const Friends = useSelector(selectAllFriends)
  return (
    <div className="Main-Area h-screen w-screen flex ">
      {Friends.length > 0 && <Navbar />}
      <div className="context flex-1 bg-background m-2  rounded-md text">
        <Outlet />
      </div>
    </div>
  )
}
