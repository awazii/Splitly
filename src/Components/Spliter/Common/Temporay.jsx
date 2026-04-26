import React from 'react';
import styled from 'styled-components';

const Input = () => {
  return (
    <StyledWrapper>
      <label className="label">
        <span className="icon">
          <svg className="w-6 h-6  text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="1.25" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </span>
        <input type="text" className="input" placeholder="Add temporary friend" autoComplete="off" />
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .label {
    position: relative;
    display: block;
    width: 300px;
    display: flex;
    border-radius: 12px;
    border: 1px solid #c4cad1;
    padding: 10px;
    text-align: left;

    .icon {
      position: absolute;
      top: 53%;
      right: 0;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease;
      color: #c5c5c5;
    }

    .input {
      background-color: transparent;
      outline: none;
      border: none;
      color: black;
      font-size: 15px;
    }
  }`;

export default Input;
