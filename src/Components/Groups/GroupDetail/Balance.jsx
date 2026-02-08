import React ,{useState} from 'react'
import { IoIosWallet } from "react-icons/io";
import Addbtn from "./Addfbtn"
import { Friends } from '../../friends/Friendslist';
import { TbListDetails } from "react-icons/tb";
import { Basemodel } from '../../basemodel';
import { Friendgdetails } from './fgroupdetails/Friendgdetails';
import { FaCoins } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
const actionbtns = [{ svg: TbListDetails, bg: "bg-primary", label: "Details" }]
const overview = [
            {
                label: "Paid",
               gradient: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFA726 100%)",
                svg: <FaCoins className='size-4 text-white' />
            },
            {
                label: "Share",
               gradient: "linear-gradient(135deg, #C471F5 0%, #FA71CD 100%)",
                svg: <IoTicket className='size-5 text-white' />
            }]
export const Balance = () => {
    const [popup, setpopup] = useState(false)
    const [Currentfriend, setCurrentfriend] = useState(null)
      const Openmodel=()=>{
        setpopup(true)
    }
    const Closemodel=()=>[
        setpopup(false)
    ]
    return (
        <div className='p-5 flex flex-col h-full'>
            <div className="header flex items-center justify-between h-fit">
                <div className="info">
                    <div className="title center-flex w-fit gap-1">
                        <h3 className='font-semibold text-2xl'>Spendings</h3>
                        <IoIosWallet className='size-5' />
                    </div>
                    <p className='text-sm text-text-secondary'>Track individual contributions across your group</p>
                </div>
                <div className="add-friend mr-3 ">
                    <Addbtn />
                </div>
            </div>
            <div className="friend-balances flex-1 h-fit mt-3  grid grid-cols-3 gap-3 auto-rows-min">
                {Friends.map((friend, index) => (
                    <div key={index} className={`friend-balance bg-white rounded-lg shadow-md h-fit p-3`}>
                        <div className="about-f-cotainer flex items-center gap-2 ">
                            <div className="about-f w-70 center-flex gap-3">
                                <div className="logo size-18 rounded-full ">
                                    <img src={friend.profilePic} className='Img-c border-none' alt="friend-img" />
                                </div>
                                <div className="info">
                                    <h3 className='font-semibold'>{friend.name} </h3>
                                    <p className='text-sm text-text-secondary'>{friend.bio}</p>
                                </div>
                            </div>
                            <div className="extra ml-5 flex-1 h-20 center-flex">
                                <div className="actions w-20 center-flex  justify-end ">
                                    {actionbtns.map((button, index) => (
                                        <button key={index} className={`group flex items-center  h-8 min-w-8 px-1.5 rounded-lg cursor-pointer ${button.bg}`} onClick={()=>{
                                            index===0 && Openmodel()
                                            setCurrentfriend(friend)
                                        }}>
                                            <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:mr-1 trans whitespace-nowrap text-white text-sm">
                                                {button.label}
                                            </span>
                                            <button.svg className='text-white size-5' />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="spending-info mt-2 border-l h-15 center-flex pl-3 gap-2">
                           {overview.map((card,index)=>(
                                <div key={index} className={`${card.label}  border-b-light center-flex w-full last:border-l-1 gap-2  `}>
                                    {card.gradient? <div className="logo  size-10 rounded-full center-flex" style={{ background: card.gradient }}>{card.svg}</div> : <div className={`logo  size-18 rounded-full center-flex ${friend.balancebgClass}`}>{card.svg}</div> }
                                    <div className="info w-fit h-2/3 center-flex flex-col">
                                        <div className={`description font-semibold text-text-secondary`}>{`Rs. ${friend[card.label==="Paid"?"spendings":"totalShare"].toLocaleString()}`}</div>
                                        <div className="title text-[12px] font-semibold"> {card.label}</div>
                                    </div>
                                </div>
                           ))}
                        </div>
                    </div>
                ))}
            </div>
              <Basemodel  isOpen={popup}
                         Closemodel={Closemodel}
                         title={`Member Group Activity`}
                         >
                            <Friendgdetails Currentfriend={Currentfriend} />
                         </Basemodel>
        </div>
    )
}
