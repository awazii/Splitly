import React ,{useState ,useEffect} from 'react'
import { FaRupeeSign } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { GiBullseye } from "react-icons/gi";
import { IoMdFlag } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { Friends } from '../../../friends/Friendslist';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectAllFriends } from '../../../../store/FriendsSlice';
export const Steptwo = () => {
  const { setValue ,getValues } = useFormContext();
  const [amountCollected, setamountCollected] = useState(0);
  const ExpenseMembers= getValues("selectedfriends");
  const AllFriends = useSelector(selectAllFriends);
  const Friends = AllFriends.filter(friend => ExpenseMembers.includes(friend.id));
  const Total = Number(getValues("totalAmount"));
  const payementdata = [
    { label: "Amount Collected", amount: amountCollected, logo: <TiTick className='text-white size-4' /> },
    { label: "Amount Left", amount: Total - amountCollected, logo: <GiBullseye className='text-primary size-6' /> },
    { label: "Total Amount", amount: Total , logo: < IoMdFlag className='text-neutral-500 size-6' /> },
  ];
  useEffect(() => {
     console.log("Members in Step Two:", ExpenseMembers);
  }, [])
  
  return (
    <>
      <div className="payment-container h-20 p-2 grid grid-cols-3 gap-4  mt-3">
        {payementdata.map((item, index) => (
          <div key={index} className={`${item.label}  bg-white rounded-lg shadow-md h-full flex flex-col justify-center relative`}>
            <div className={`logo absolute top-0 right-0 rounded-full m-2 ${item.label === "Amount Collected" ? "bg-green-500 p-1" : ""}  center-flex`}>
              {item.logo}
            </div>
            <div className="col-header  border-b-light center-flex flex-col">
              <h4 className="text-sm font-semibold">{item.label}</h4>
              <p className="text-lg">Rs.{item.amount.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="friends-payments-container mt-3">
        <h4 className="text-md font-semibold my-2">
          How much each person paid?
        </h4>
        <div className="friends-payments grid grid-cols-2  gap-3 max-h-100 overflow-auto border-l p-2">
          {Friends.map((friend, index) => {
            return (
              <div key={index} className="friend-payment bg-highlight rounded-lg p-4 flex  gap-3 h-22 justify-between items-center shadow-md">
                <div className="friend-info center-flex  gap-2 ">
                  <div className="friend-img-container size-16">   
                      <img src={friend.Image} className='Img-c' alt="friend-img" /> 
                  </div>
                  <div className="friend-info flex justify-center flex-col">
                    <h2 className='text-sm'>{friend.Name}</h2>
                    <p className='text-[12px] text-text-secondary'>
                        {friend.Bio}</p>
                  </div>
                </div>
                <div className="payment-input flex center-flex gap-1 card-b bg-white border-none rounded-lg p-2 flex-row-reverse">
                  <FaRupeeSign className='text-green-500' />
                  <input type="number" placeholder='0' className='w-18 text-left focus:outline-none' />
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </>
  )
}
