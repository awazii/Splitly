import { selectFriendById } from "../store/FriendsSlice";
import { useSelector } from "react-redux";
export const Memberdetails=(id)=>{
        return useSelector(state=>selectFriendById(state,id))
}