import React, { useState, useEffect, use } from 'react'
import Gcheckbox from "./gcheck"
import Selectall from "./Selectall"
import Checkbox from "../Check"
import Input from "./addginput"
import Newbtn from "./Newgbtn"
import Categories from "./categories"
import Choosef from "../choosef"
import { HiMiniUserGroup } from "react-icons/hi2";
import { useSelector } from 'react-redux'
import { selectAllFriends, selectPinnedFriends } from '../../store/FriendsSlice'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch  } from 'react-redux'
import { addGroup ,selectAllGroups ,deleteGroup } from '../../store/GroupSlice'
const RenderSelectfriends = React.memo(({ Friends, setSelectedfriends, Selectedfriends }) => {
  return (<div className="friend-lists w-165 h-60 overflow-auto  grid grid-cols-5  gap-3  border-b-light px-2 border p-2 rounded-lg">
    {Friends.map((friend, index) => {
      return (
        <label key={index} className='select-friend rounded-lg shadow-md h-30 bg-highlight flex flex-col items-center justify-center gap-1 pt-1 relative cursor-pointer trans'>
          <div className="friend-img-container size-16">
            <img src={friend.Image} className='Img-c' alt="friend-img" />
          </div>
          <div className="friend-info center-flex flex-col">
            <h2 className='text-sm'>{friend.Name}</h2>
            <p className='text-[12px] text-text-secondary'>{friend.Bio}</p>
          </div>
          <div className='absolute top-2 right-1'>
            <Gcheckbox setSelected={setSelectedfriends} Selected={Selectedfriends} id={friend.id} />
          </div>
        </label>
      )
    })}
  </div>)
})
export const Newg = React.memo(() => {
  const AllFriends = useSelector(selectAllFriends);
  const PinnedFriends = useSelector(selectPinnedFriends);
  const AllGroups = useSelector(selectAllGroups);
  const [Friends, setFriends] = useState(AllFriends)
  const [isPinselected, setisPinselected] = useState(false)
  const [Selectedfriends, setSelectedfriends] = useState([])
  const [issubmitted, setissubmitted] = useState(false);
  const dispatch = useDispatch();
  const { control, register, setValue, handleSubmit, reset, trigger, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      Name: "",
      Members: [],
      Category: "",
      isPinned: false
    },
  })
  const GroupnamePattern = /^[A-Za-z][A-Za-z0-9\s,._-]*$/;
  useEffect(() => {
    isPinselected ? setFriends(PinnedFriends) : setFriends(AllFriends)
  }, [isPinselected])
  const onsubmit = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    dispatch(addGroup(
      data.Name,
      data.Category,
      data.Members,
      data.isPinned
    ));
    setissubmitted(true);
    setSelectedfriends([]);
    reset();
    await new Promise(resolve => setTimeout(resolve, 2000));
    setissubmitted(false);
  }
  useEffect(() => {
    register("Members", { validate: (valueArray) => valueArray.length >= 2 || "Please select at least 2 friends!" });
  }, [register])
  useEffect(() => {
    setValue("Members", Selectedfriends, { shouldValidate: true });
  }, [Selectedfriends, setValue])
  useEffect(() => {
   console.log("Current groups in store:", AllGroups);
  }, [AllGroups])
  
  return (
    <div className='container card-b rounded-2xl mx-auto h-fit w-180  my-6 p-3 relative l center-flex flex-col gap-0  '>
      <div className="title center-flex flex-col gap-0">
        <h2 className='text-2xl font-semibold flex items-center gap-2 text-center p-2 pb-0'>Add New Group<span><HiMiniUserGroup /></span></h2>
        <h4 className='text-text-secondary mr-2'>Start with intention. End with legacy.</h4>
      </div>
      <form onSubmit={handleSubmit(onsubmit)} className='Friend-form  m-3 space-y-3 flex flex-col '>
        <Controller
          name="Name"
          control={control}
          rules={{
            required: "Group's name is required",
            maxLength: { value: 25, message: "Max 25 characters allowed" },
            minLength: { value: 5, message: "At least 5 characters" },
            pattern: {
              value: GroupnamePattern,
              message: "Must start with a letter, followed by letters, numbers, spaces, _, ., or ,"
            },
          }}
          render={({ field, fieldState }) => (
            <>
              <Input
                variant="Group's Name"
                value={field.value}
                onChange={(e) => {
                  if (e.target.value.length <= 26) {
                    field.onChange(e);
                    trigger("Name");
                  }
                }}
              />
              {fieldState.error && <p className='text-red-600 text-sm'>{fieldState.error.message}</p>}
            </>
          )}
        />
        <div className='categories'>
          <h4 className='text-md font-semibold my-3'>Where are you headed?</h4>
          <Controller
            name="Category"
            control={control}
            rules={{ required: "Please select a category" }}
            render={({ field, fieldState }) => (
              <>
                <Categories
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
                {fieldState.error && <p className='text-red-600 text-sm mt-1'>{fieldState.error.message}</p>}
              </>
            )} />
        </div>
        <div className='select-friends-container w-full '>
          <div className='select-friend-option flex items-center justify-between'>
            <h4 className='text-md font-semibold my-2 '>Who's coming with you?
            </h4>
            <div className='center-flex gap-2'>
              <div className=' w-25 py-2 px-3 bg-highlight  rounded-lg  '>
                <Selectall setSelected={setSelectedfriends} members={Friends} Selected={Selectedfriends}>
                  <h5 className='text-[13px] text-text-secondary'>Select all</h5>
                </Selectall>
              </div>
              <Choosef setisPinselected={setisPinselected} />
            </div>
          </div>
          <div className='select-friends   mx-auto mt-3  '>
            <RenderSelectfriends Friends={Friends} setSelectedfriends={setSelectedfriends} Selectedfriends={Selectedfriends} />
          </div>
          {errors.Members && <p className='text-red-500 text-sm text-center mt-2'>{errors.Members.message}</p>}
        </div>
        <div className='pin-check flex gap-2 mt-2'>
          <Controller
            name="isPinned"
            control={control}
            render={({ field }) => (
              <Checkbox
                value={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              >
                <h3 className='text-sm'>Do you want to pin this person?</h3>
              </Checkbox>
            )}
          />
        </div>
        <div className='center-flex'>

          <Newbtn isSubmitting={isSubmitting} />
        </div>
        {issubmitted && <p className='text-green-500 text-sm mt-1 text-center '>Group added successfully!</p>}
      </form>
    </div>
  )
})
