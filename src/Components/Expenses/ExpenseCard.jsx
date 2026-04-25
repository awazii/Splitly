import React from 'react'
import Expensedetailbtn from '../Common/Details';
import { CategoryExtrator } from '../../utils/CategoryExtractor';
import { categories } from '../../pages/Expenses/Expenses';
import { useSelector } from 'react-redux';
import { selectGroupById } from '../../store/GroupSlice';
import { selectFriendById } from '../../store/FriendsSlice';
 const MemberAvatars = ({ id }) => {
    const friend = useSelector(state => selectFriendById(state, id));
    return (
        <div className="member size-7  rounded-lg shadow-md">
            <img src={friend?.Image || ""} alt="" className='Img-c rounded-lg' />
        </div>
    )
}
export const ExpenseCard = ({ expense, Openmodel, ForGroup }) => {
    const group = useSelector(state => selectGroupById(state, expense.Groupid));
    return (
        <div className='expense relative card-b h-40 rounded-lg'>
            <div className='expense-detail-btn absolute bottom-4 right-5'>
                <Expensedetailbtn Openmodel={Openmodel} />
            </div>
            <div className="expense-info  w-[92%] h-20 mx-auto mt-1  rounded-lg center-flex gap-3">
                <div className="expense-logo  size-15 rounded-lg  center-flex shadow-md" style={{ background: categories[expense.Category].gradient }}>
                    {categories[expense.Category].icon}
                </div>
                <div className='expense-details flex-1  h-15 flex justify-between gap-1 items-center'>
                    <div className='expense-left'>
                        <h2 className='text-lg font-semibold line-clamp-1 '>{expense.Name}</h2>
                        <div className="category-date flex items-center gap-1">
                            <span className='text-sm text-text-secondary'>{categories[expense.Category].name}</span>
                            <span className='text-sm text-text-secondary'>•</span>
                            <span className='text-sm text-text-secondary'>{expense.createdDate}</span>
                        </div>
                    </div>
                    <div className='expense-right text-right'>
                        <h2 className='text-xl text-primary font-semibold '>Rs.{Number(expense.totalAmount).toLocaleString()}</h2>
                        <span className='text-[12px] text-text-secondary'>Total Amount</span>
                    </div>
                </div>
            </div>
            <div className='expense-members w-70 mx-auto h-15 flex items-center  gap-2'>
                {!ForGroup && <div className="group-avatar size-13 rounded-lg ">
                    <img src={CategoryExtrator(group)?.Img || ""} alt="" className='Img-c rounded-lg' />
                </div>}
                <div className="about ml-2">
                    { <h4 className='text-md font-semibold line-clamp-1'>{ForGroup?"Participants":group?.Name || ""} </h4> }
                    <div className="members flex gap-1 mt-1">
                        {
                            expense.Members.slice(0, 3).map((members, index) => {
                                return <MemberAvatars key={index} id={members.id} />;
                            })
                        }
                        {
                            expense.Members.length > 3 && <div className="rest size-7 bg-highlight border-l shadow-md rounded-lg  center-flex">
                                <span className='text-[12px] '>+{expense.Members.length - 3}</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>)
}
