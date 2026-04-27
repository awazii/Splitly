import React, { useMemo, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectAllFriends } from '../../../store/FriendsSlice';
import { useWatch } from 'react-hook-form';
import { Stepthreehelper } from '../../Stepthreehelper';

export const Stepthree = () => {
  const { getValues, control, setError, clearErrors } = useFormContext();

  const ExpenseMembers = getValues("MasterMembers");
  const TotalAmount = Number(getValues("totalAmount"));

  const AllFriends = useSelector(selectAllFriends).filter(friend =>
    ExpenseMembers.some(member => member.id === friend.id)
  );

  const temporary = useWatch({ name: "temporary", control });
  const Share = useWatch({ name: "Share", control });
  const Splitopt = useWatch({ name: "splitMethod", control });

  const Friends = useMemo(() => [...temporary, ...AllFriends], [temporary, AllFriends]);

  useEffect(() => {
    if (!Share || !Splitopt) return;

    let groupError = null;

    if (Splitopt === "By Percentage") {
      const totalPercent = Object.values(Share["By Percentage"] || {})
        .reduce((sum, val) => sum + Number(val || 0), 0);
      if (totalPercent > 100) groupError = "Total % cannot exceed 100%";
    }

    if (Splitopt === "Unequally") {
      const totalAmount = Object.values(Share["Unequally"] || {})
        .reduce((sum, val) => sum + Number(val || 0), 0);
      if (totalAmount > TotalAmount) groupError = "Cannot exceed total expense";
    }

    if (groupError) {
      setError("Sharecollected", { message: groupError });
    } else {
      clearErrors("Sharecollected");
    }
  }, [Share, Splitopt, TotalAmount, setError, clearErrors]);

  const Splits = [
    {
      label: "Equally",
      description: "Everyone contributes the same share.",
      example: `Total Rs.${TotalAmount.toLocaleString()} ÷ ${ExpenseMembers.length} people = Rs.${Math.floor(TotalAmount / ExpenseMembers.length).toLocaleString()} each`,
      prompt: "Do you want to split this bill equally among all members?"
    },
    {
      label: "Unequally",
      description: "Assign specific amounts to each person.",
      example: "Person A pays Rs.5000, Person B pays Rs.2000...",
      prompt: "Choose who pays how much — perfect for custom splits."
    },
    {
      label: "By Percentage",
      description: "Divide the total by assigning percentages.",
      example: "Person A pays 50%, Person B pays 25%...",
      prompt: "Set percentages for each member to split fairly."
    }
  ];

  return <Stepthreehelper Friends={Friends} Splits={Splits} />;
};
