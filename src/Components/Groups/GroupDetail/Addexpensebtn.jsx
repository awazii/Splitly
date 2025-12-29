import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const Button = () => {
  const navigate= useNavigate()
  return (
    <StyledWrapper>
      <button type="button" className="button" onClick={()=>{
        navigate("./AddExpense")
      }}>
        <span className="button__text">Add Expense</span>
        <span className="button__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="svg"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    position: relative;
    width: 176px;
    height: 46px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid #ff6b35;
    background-color: #ff6b35;
    border-radius: 12px;
    overflow: hidden;
  }

  .button,
  .button__icon,
  .button__text {
    transition: all 0.3s ease;
  }

  .button__text {
    flex: 1;
    text-align: center;
    color: #fff;
    font-weight: 600;
    z-index: 1;
  }

  .button__icon {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 35px;
    background-color: #ff7c4e;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
  }

  .svg {
    width: 20px;
    stroke: #fff;
  }

  .button:hover {
    background: #ff7c4e;
  }

  .button:hover .button__text {
    color: transparent;
  }

  .button:hover .button__icon {
    width: 100%;
    right: 0;
    border-radius: 12px;
  }

  .button:active .button__icon {
    background-color: #de5c2d;
  }

  .button:active {
    border: 1px solid #de5c2d;
  }
`;

export default Button;