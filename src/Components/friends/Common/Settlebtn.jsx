import React from 'react';
import styled from 'styled-components';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
const Button = ({setissettlementopen}) => {
  return (
    <StyledWrapper>
      <button className="button bg-red-600  border-red-600 border-2 text-white  center-flex gap-1 active:scale-95 w-fit pr-2" onClick={()=>{
        setissettlementopen(true);
      }}>
       <MdOutlineKeyboardArrowRight className='size-7' />
        <div className="text">
            Settle Up
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    height: 2.3em;
    border-radius: 11px;
    text-align: right;
    transition: all 0.6s ease;
  }

  .button:hover {
    cursor: pointer;
  }

  .button svg {
    width: 1.6em;
    display: flex;
    transition: all 0.6s ease;
  }

  .button:hover svg {
    transform: translateX(5px);
  }
`;

export default Button;
