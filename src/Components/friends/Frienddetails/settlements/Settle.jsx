import React from 'react'
import { TbCreditCardPay } from "react-icons/tb";
import Settleinput from '../../Common/Settleinput';
import Paybtn from "../../Common/Paybtn"
import { Memberdetails } from '../../../../utils/Memberdetails';
import { useForm, Controller, Watch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../../../store/ExpenseSlice';
import { updateFriend } from '../../../../store/FriendsSlice';
export const Settle = ({ CurrentFriend, Currentbalancewith, setissettlementopen, setispaymentsuccessful }) => {
  const CurrentDebt = Math.abs(CurrentFriend.Relationship.find(r => r.id === Currentbalancewith).netBalance)
  const dispatch = useDispatch()
  const balancewith = Memberdetails(Currentbalancewith)
  const { control, handleSubmit, reset, trigger, getValues, watch, formState: { errors, isSubmitting, } } = useForm({
    defaultValues: {
      amount: ""
    }
  })
  let currentAmount = watch("amount")
  let remaining = CurrentDebt - currentAmount
  let percentage = Math.round(remaining / CurrentDebt * 100)
  const Onsubmit = async (data) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const expenseName = `Payment to ${balancewith.Name}`;
  const amount = Number(data.amount);
  dispatch(addExpense(
    "",
    expenseName,
    amount,
    "",
    [
      { id: CurrentFriend.id, spent: '', share: '' },
      { id: Currentbalancewith, spent: '', share: '' }
    ],
    "Settlement",
    [{ from: CurrentFriend.id, to: Currentbalancewith, amount: amount }]
  ));
  const debtorBalance = CurrentFriend.netBalance.total + amount;
  dispatch(updateFriend({
    id: CurrentFriend.id,
    changes: {
      netBalance: {
        total: debtorBalance,
        indicatorid: debtorBalance < 0 ? "debtor" : debtorBalance > 0 ? "creditor" : "settled"
      },
    }
  }));
  const creditorBalance = balancewith.netBalance.total - amount;
  dispatch(updateFriend({
    id: Currentbalancewith,
    changes: {
      netBalance: {
        total: creditorBalance,
        indicatorid: creditorBalance > 0 ? "creditor" : debtorBalance < 0 ? "debtor" : "settled"
      },
    }
  }));
  setispaymentsuccessful({ is: true, amount: amount });
  setissettlementopen(false);
  reset();
};
  return (
    <form onSubmit={handleSubmit(Onsubmit)}>
      <div className="h-76 p-2 space-y-2">
        <div className='flex justify-between'>
          <h3 className='font-semibold text-gray-800 center-flex gap-2 w-fit'> <TbCreditCardPay className='size-6' />Direct Payment</h3>
          {errors.amount && (
            <p className="text-red-600 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>
        <div className="progress h-25 rounded-lg shadow-md  p-4 bg-white ">
          <div className="amounts flex justify-between mt-2">
            <div className="remaining font-bold ">Rs.{(remaining || 0)}</div>
            <div className="paid font-bold ">{`Rs.${Math.abs(CurrentDebt).toLocaleString()}`}</div>
          </div>
          <div className="progress-bar-container relative">
            <div className="progress-bar w-full h-3 bg-gray-200 rounded-full mt-1 overflow-hidden">
              <div className={`progress bg-red-600 h-3 rounded-full`} style={{
                width: `${percentage}%`
              }}></div>
            </div>
            <div className="total absolute  right-0  mt-1 text-sm">Total Debt</div>
            <div className="remaining absolute  left-0 mt-1 text-sm">Remaining</div>
          </div>

        </div>
        <div className="settle-input-container center-flex shadow-md w-full border-l">
          <Controller
            name='amount'
            control={control}
            rules={{
              required: "Debt amount is required",
              min: { value: 1, message: "Minimum Amount required is Rs. 1" },
              max: { value: CurrentDebt, message: `Amount Cannot exeed ${CurrentDebt}` }
            }}
            render={({ field, fieldState }) => (
              <Settleinput
                value={field.value}
                onChange={
                  (e) => {
                    field.onChange(e)
                    trigger("amount")
                  }
                }
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-", "."].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            )
            }
          />
          <div className="note">
            <p className='text-sm text-text-secondary'>
              <span className='font-semibold'> Note:</span>This will log a direct payment between you and {Memberdetails(Currentbalancewith)?.Name}, and adjust the net balances accordingly.
            </p>
          </div>
        </div>
        <div className="actions mt-4 center-flex flex-col gap-2">
          <Paybtn isSubmitting={isSubmitting} />
          <button type='button' className="underline text-gray-800 font-semibold cursor-pointer" onClick={() => setissettlementopen(false)}>Cancel</button>
        </div>
      </div>
    </form>
  )
}
