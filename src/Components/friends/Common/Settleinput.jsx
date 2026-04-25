import React from 'react';
import styled from 'styled-components';

const Input = ({onChange, value , onKeyDown}) => {
  return (
    <StyledWrapper>
      <div  className="formField">
        <input value={value} onChange={onChange} onKeyDown={onKeyDown} required type="number" className='w-35 '/>
        <span>Enter Amount</span>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .formField {
    margin: 10px;
    position: relative;
  }

  .formField input {
    padding: 20px 15px 3px 10px;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: white;
    color: #333;
    font-size: 16px;
    font-weight: 550;
    transition: 0.3s ease-in-out;
    box-shadow: 0 0 0 5px transparent;
  }
  .formField span {
    position: absolute;
    left: 0;
    top: 0;
    padding: 13px 15px;
    color: #333;
    font-size: 16px;
    font-weight: 600;
    text-shadow: -1px -1px 0 #f1f1f1, 1px -1px 0 #f1f1f1, -1px 1px 0 #f1f1f1,
      1px 1px 0 #f1f1f1;
    transition: 0.3s ease-in-out;
    pointer-events: none;
  }

  .formField input:focus + span,
  .formField input:valid + span {
    transform: translateY(-12px) translateX(-5px) scale(0.95);
    transition: 0.3s ease-in-out;
  }`;

export default Input;
