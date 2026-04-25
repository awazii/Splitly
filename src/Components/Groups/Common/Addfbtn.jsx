import React from 'react';
import styled from 'styled-components';
import { IoMdPersonAdd } from "react-icons/io";
const Button = () => {
  return (
    <StyledWrapper>
      <button className="button">
        <span className="span"><IoMdPersonAdd className='size-5 text-white svg-icon' /></span>
        <span className="lable">Add</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px 12px;
    gap: 8px;
    height: 45px;
    width: 105px;
    border: none;
    background: #ff6b35;
    border-radius: 50px;
    cursor: pointer;
    position: relative;
  }

  .lable {
    line-height: 22px;
    font-size: 17px;
    color: #fff;
    margin-left: 20px;
    font-family: sans-serif;
    letter-spacing: 1px;
  }

  .button .span {
    border-radius: 50%;
    background-color: #ff7c4e;
    padding: 10px;
    position: absolute;
    left: 0;
  }

  .button:hover {
    background: #ff7c4e;
  }

  .button:hover .svg-icon {
    animation: slope 0.8s linear infinite;
  }

  @keyframes slope {
    0% {
    }

    50% {
      transform: rotate(15deg);
    }

    100% {
    }
  }`;

export default Button;
