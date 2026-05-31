import React, { useState, useRef } from 'react'
import { updateFriend, selectFriendById } from '../../../store/FriendsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { useWatch } from 'react-hook-form';
import Loader from '../../Common/loader';
import { HiCheck } from "react-icons/hi2";
import { TbIdBadge, TbFeather, TbEdit } from "react-icons/tb";
import { uploadToCloudinary } from '../../../utils/Uploadimg';
import { current } from '@reduxjs/toolkit';
export const Updatef = ({ friendId, Closemodel }) => {
    const Currentfriend = useSelector((state) => selectFriendById(state, friendId));
    const [showSuccess, setshowSuccess] = useState(false);
    const dispatch = useDispatch();
      const [hasInteracted, setHasInteracted] = useState(false); 
    const [CurrentImage, setCurrentImage] = useState(
        {
            Image: Currentfriend.Image || null,
            file: null
        }
    );
        
    const fileInputRef = useRef(null);
    const usernamePattern = /^[A-Za-z][0-9A-Za-z_\s]*$/;
    const bioPattern = /^[A-Za-z][A-Za-z\s.,'-]*$/;
    const {
        register,
        handleSubmit,
        reset,
        trigger,
        getValues,
        control,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
        defaultValues: {
            Name: Currentfriend.Name || "",
            Bio: Currentfriend.Bio || "",
        }
    });
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentImage({
                Image: URL.createObjectURL(file),
                file
            });
        }
        if (!hasInteracted) setHasInteracted(true);
    };
    const onSubmit = async (data) => {
        try {
            const imageUrl = await uploadToCloudinary(CurrentImage.file);
            await new Promise((resolve) => setTimeout(resolve, 1000));         
            await dispatch(updateFriend({
                id: friendId, changes: {
                    Name: data.Name,
                    Bio: data.Bio,
                    Image: imageUrl ? imageUrl : Currentfriend.Image,
                }
            }));
            setshowSuccess(true);
            setTimeout(() => {
                setshowSuccess(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to update friend:", error);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-90 h-fit bg-white rounded-xl shadow p-5 center-flex flex-col '>
            <div onClick={() => fileInputRef.current.click()}
                className="relative group cursor-pointer mb-4">
                <div className="size-32 rounded-full bg-neutral-50 border-2 border-dashed border-neutral-300 group flex items-center justify-center overflow-hidden transition-all group-hover:border-primary">
                    <img src={CurrentImage.Image} className="w-full h-full object-cover" alt="Preview" />
                </div>
                <div className="absolute bottom-1 right-1 p-2 bg-primary rounded-full text-white shadow-lg">
                    <HiCheck className="size-4" />
                </div>
                <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={(file) => {
                        handleImageChange(file)
                        trigger("Image");
                    }}
                />
            </div>
            <div className="w-full space-y-4">
                <Controller
                    name="Name"
                    control={control}
                    rules={{
                        required: "Name is required",
                        maxLength: { value: 15, message: "Max 15 characters allowed" },
                        minLength: { value: 3, message: "At least 3 characters" },
                        pattern: {
                            value: usernamePattern,
                            message: "Must start with a letter, followed by letters, numbers, or underscores"
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <>
                            <div className="flex items-center gap-3 w-full p-4 border-l rounded-2xl focus-within:ring-2 focus-within:ring-primary transition-all bg-transparent">
                                <TbIdBadge className="size-6 text-gray-400 shrink-0" />
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="Display Name"
                                    className="w-full outline-none bg-transparent font-medium"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        trigger("Name");
                                        if (!hasInteracted) setHasInteracted(true);
                                    }}
                                />
                            </div>
                            {fieldState.error && (
                                <p className="text-red-600 text-sm">{fieldState.error.message}</p>
                            )}
                        </>
                    )}
                />
                <Controller
                    name="Bio"
                    control={control}
                    rules={{
                        required: "Bio is required",
                        maxLength: { value: 25, message: "Max 25 characters allowed" },
                        minLength: { value: 5, message: "At least 5 characters" },
                        pattern: {
                            value: bioPattern,
                            message: "Invalid characters"
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <>
                            <div className="flex items-center gap-3 w-full p-4 border-l rounded-2xl focus-within:ring-2 focus-within:ring-primary transition-all bg-transparent">
                                <TbFeather className="size-6 text-gray-400 shrink-0" />
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="Bio (What's your vibe?)"
                                    className="w-full outline-none bg-transparent font-medium"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        trigger("Bio");
                                        if (!hasInteracted) setHasInteracted(true);
                                    }}
                                />
                            </div>
                            {fieldState.error && (
                                <p className="text-red-600 text-sm">{fieldState.error.message}</p>
                            )}
                        </>
                    )}
                />
            </div>
            <button
            disabled={!hasInteracted}
                type='submit'
                className={`w-30 mt-4 px-4 py-3 bg-primary hover:bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-2 disabled:opacity-50 ${(isSubmitting || !hasInteracted)  ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
                {isSubmitting && <Loader />}
                {!isSubmitting && <>Update <TbEdit className='size-5' /></>}
            </button>
            {isSubmitting && <p className="text-sm text-gray-500 mt-2">Updating...</p>}
            {showSuccess && <p className="text-sm text-green-600 mt-2">Updated successfully!</p>}
        </form>
    )
}
