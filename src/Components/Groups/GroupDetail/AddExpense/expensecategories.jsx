import React from 'react';
import styled from 'styled-components';
import { categories } from '../../../Expenses/Expenses';
const Radio = ({ start , end , value, onChange }) => {
  return (
    <StyledWrapper>
      <div className="radio-inputs">
        {Object.values(categories).slice(start,end).map((category, i) => (
          <label key={i} className="radio">
              <input type="radio" name="radio" value={category.name} checked={value === category.name} onChange={onChange} />
              <span className="name">{category.name}</span>
            </label>
        ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .radio-inputs {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap:15px;
    border-radius: 0.5rem;
    background-color: #eee;
    box-sizing: border-box;
    box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
    padding: 0.25rem;
    width: fit;
    font-size: 14px;
  }

  .radio-inputs .radio {
    flex: 1 1 auto;
    text-align: center;
  }

  .radio-inputs .radio input {
    display: none;
  }

  .radio-inputs .radio .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: 0.5rem 0;
    color: rgba(51, 65, 85, 1);
    transition: all 0.15s ease-in-out;
  }

  .radio-inputs .radio input:checked + .name {
    background-color: #fff;
    font-weight: 600;
  }

  /* Hover effect */
  .radio-inputs .radio:hover .name {
    background-color: rgba(255, 255, 255, 0.5);
  }

  /* Animation */
  .radio-inputs .radio input:checked + .name {
    position: relative;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    animation: select 0.3s ease;
  }

  @keyframes select {
    0% {
      transform: scale(0.95);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  .radio-inputs .radio input:checked + .name::before,
  .radio-inputs .radio input:checked + .name::after {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #ff6b35;
    opacity: 0;
    animation: particles 0.5s ease forwards;
  }

  .radio-inputs .radio input:checked + .name::before {
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
  }

  .radio-inputs .radio input:checked + .name::after {
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
  }

  @keyframes particles {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(0);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(-50%) translateY(var(--direction));
    }
  }

  .radio-inputs .radio input:checked + .name::before {
    --direction: -10px;
  }

  .radio-inputs .radio input:checked + .name::after {
    --direction: 10px;
  }`;

export default Radio;
