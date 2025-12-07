import React from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowRight } from "react-icons/md";
const Button = () => {
  return (
    <StyledWrapper>
      <button className="cssbuttons-io-button">
        View Debts
        <div className="icon">
            <MdKeyboardArrowRight className=' text-white text-lg' />
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cssbuttons-io-button {
    background: #ff6b35;
    color: white;
    font-family: inherit;
    padding: 0.35em;
    padding-left: .8em;
    font-size: 12px;
    font-weight: 500;
    border-radius: 0.8em;
    border: none;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em #cc5329;
    overflow: hidden;
    position: relative;
    height: 2.6em;
    padding-right: 3.3em;
    cursor: pointer;
  }

  .cssbuttons-io-button .icon {
    background: white;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.8em;
    width: 1.8em;
    border-radius: 0.4em;
    right: 0.28em;
    transition: all 0.3s;
  }

  .cssbuttons-io-button:hover .icon {
    width: calc(100% - 0.6em);
  }

  .cssbuttons-io-button .icon svg {
    width: 1.1em;
    transition: transform 0.3s;
    color: #ff6b35;
  }

  .cssbuttons-io-button:hover .icon svg {
    transform: translateX(0.1em);
  }
`;

export default Button;
