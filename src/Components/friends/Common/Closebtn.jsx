import React from 'react';
import styled from 'styled-components';

const Button = ({setispaymentsuccessful}) => {
  return (
    <StyledWrapper>
      <button  className='font-poppins' onClick={()=>setispaymentsuccessful(false)}>
        Close
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    font-size: 18px;
    color: #1e2939;
    font-weight: 800;
    cursor: pointer;
    position: relative;
    border: none;
    background: none;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 400ms;
    transition-property: color;
  }

  button:focus,
  button:hover {
    color: #1e2939;
  }

  button:focus:after,
  button:hover:after {
    width: 100%;
    left: 0%;
  }

  button:after {
    content: "";
    pointer-events: none;
    bottom: -2px;
    left: 50%;
    position: absolute;
    width: 0%;
    height: 2px;
    background-color: #1e2939;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 400ms;
    transition-property: width, left;
  }`;

export default Button;
