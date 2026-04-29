import React ,{useState ,useEffect} from 'react';
import { FaUserPlus } from "react-icons/fa";
import Newbtn from "../Common/Newfbtn";
import Checkbox from "../../Common/Check";
import Input from "../Common/addfinput";
import ImageBox from "../Common/Imagebox";
import { useForm, Controller } from 'react-hook-form';
import { uploadToCloudinary } from '../../../utils/Uploadimg';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend, selectAllFriends } from '../../../store/FriendsSlice';
export const Newfriend = () => {
  const friends = useSelector(selectAllFriends);
  const dispatch = useDispatch();
  const [issubmitted, setissubmitted] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isSubmitting,},
  } = useForm({
    defaultValues: {
      Name: "",
      Bio: "",
      Image: null,
      isPinned: false 
    }
  });
  const usernamePattern = /^[A-Za-z][0-9A-Za-z_\s]*$/;
  const bioPattern = /^[A-Za-z][A-Za-z\s.,'-]*$/;
  const Onsubmit = async (data) => {
    try {
      const imageUrl = await uploadToCloudinary(data.Image);
      if (imageUrl) {
        dispatch(addFriend(
          data.Name,
          data.Bio,
          imageUrl,
          data.isPinned
        ));
        setissubmitted(true);
        reset();
        await new Promise(resolve => setTimeout(resolve, 2000));
        setissubmitted(false);
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  return (
    <div className='container bg-white  shadow-lg rounded-2xl mx-auto h-fit w-100 my-20 p-3'>
      <div className="title center-flex flex-col gap-0">
        <h2 className='text-2xl font-semibold flex items-center gap-2 text-center p-2 pb-0'>
          Add New Friend <span><FaUserPlus /></span>
        </h2>
        <h4 className='text-text-secondary mr-2'>Share costs. Stay synced.</h4>
      </div>

      <form onSubmit={handleSubmit(Onsubmit)} className='Friend-form m-6 space-y-3 flex flex-col items-center '>
        <Controller
          name="Name"
          control={control}
          defaultValue=""
          rules={{
            required: "Friend's name is required",
            maxLength: { value: 15, message: "Max 15 characters allowed" },
            minLength: { value: 3, message: "At least 3 characters" },
            pattern: {
              value: usernamePattern,
              message: "Must start with a letter, followed by letters, numbers, or underscores"
            },
            validate: (value) => {
              const existingNames = friends.map(f => f.name || f.Name);
              return existingNames.includes(value)
                ? "This name already exists"
                : true;
            }
          }}
          render={({ field, fieldState }) => (
            <>
              <Input
                variant="Friends Name"
                value={field.value}
                onChange={(e) => {
                  if (e.target.value.length <= 16) {
                    field.onChange(e);
                    trigger("Name");
                  }
                }}
              />
              {fieldState.error && <p className='text-red-600 text-sm'>{fieldState.error.message}</p>}
            </>
          )}
        />
        <Controller
          name="Bio"
          control={control}
          rules={{
            required: "Bio is required",
            minLength: { value: 5, message: "Character can't be less than 5" },
            maxLength: { value: 20, message: "Character can't be more than 20" },
            pattern: { value: bioPattern, message: "Invalid characters" }
          }}
          render={({ field, fieldState }) => (
            <>
              <Input
                variant="Friend's Bio"
                value={field.value}
                onChange={(e) => {
                  if (e.target.value.length <= 21) {
                    field.onChange(e);
                    trigger("Bio");
                  }
                }}
              />
              {fieldState.error && <p className='text-red-600 text-sm'>{fieldState.error.message}</p>}
            </>
          )}
        />
        <Controller
          name="Image"
          control={control}
          rules={{ required: "Image is required" }}
          render={({ field, fieldState }) => (
            <>
              <ImageBox
                onChange={(file) => field.onChange(file)}
                value={field.value}
              />
              {fieldState.error && <p className='text-red-600 text-sm'>{fieldState.error.message}</p>}
            </>
          )}
        />
        <div className='flex gap-2 mt-3'>
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
        <Newbtn isSubmitting={isSubmitting} />
        {issubmitted && <p className='text-green-500 text-sm mt-1'>Friend added successfully!</p>}
      </form>
    </div>
  );
};