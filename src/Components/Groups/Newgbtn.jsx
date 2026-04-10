import React from 'react';
import styled from 'styled-components';
import Loader from '../loader';
const Button = ({ isSubmitting }) => {
  return (
    <StyledWrapper>
      <button type="submit" className='shadow-lg relative'>
        <div className={`loadercontainer absolute inset-0 flex items-center justify-center ${isSubmitting ? 'cursor-not-allowed bg-[#cc552a] rounded-[.9rem] ' : 'cursor-pointer'}`}>
          {isSubmitting && <Loader />}
        </div>
        {!isSubmitting && <>    <span className="span-mother">
          <span>C</span>
          <span>r</span>
          <span>e</span>
          <span>a</span>
          <span>t</span>
          <span>e</span>
        </span>
          <span className="span-mother2">
            <span>M</span>
            <span>e</span>
            <span>m</span>
            <span>o</span>
            <span>r</span>
            <span>i</span>
            <span>e</span>
            <span>s</span>
          </span>
        </>}
      </button>
    </StyledWrapper>

  );
}

const StyledWrapper = styled.div`
  button {
    font-weight: bold;
    color: white;
    border-radius: .9rem;
    cursor: pointer;
    width: 120.02px;
    height: 45.66px;
    border: none;
    background-color: #ff6b35;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button .span-mother {
    display: flex;
    overflow: hidden;
     gap:1px;
  }

  button:hover .span-mother {
    position: absolute;
  }

  button:hover .span-mother span {
    transform: translateY(1.3em);
  }

  button .span-mother span:nth-child(1) {
    transition: 0.2s;
  }

  button .span-mother span:nth-child(2) {
    transition: 0.3s;
  }

  button .span-mother span:nth-child(3) {
    transition: 0.4s;
  }
  button .span-mother span:nth-child(4) {
    transition: 0.5s;
  }

  button .span-mother span:nth-child(5) {
    transition: 0.6s;
  }
  button .span-mother span:nth-child(6) {
    transition: 0.7s;
  }
  button .span-mother2 {
    display: flex;
    position: absolute;
    overflow: hidden;
     gap:1px;
  }

  button .span-mother2 span {
    transform: translateY(-1.3em);
  }

  button:hover .span-mother2 span {
    transform: translateY(0);
  }

  button .span-mother2 span {
    transition: 0.2s;
  }

  button .span-mother2 span:nth-child(2) {
    transition: 0.25s;
  }

  button .span-mother2 span:nth-child(3) {
    transition: 0.3s;
  }

  button .span-mother2 span:nth-child(4) {
    transition: 0.3.5s;
  }

  button .span-mother2 span:nth-child(5) {
    transition: 0.4s;
  }

  button .span-mother2 span:nth-child(6) {
      transition: 0.45s;
    }
    button .span-mother2 span:nth-child(7) {
      transition: 0.5s;
    }
     button .span-mother2 span:nth-child(8) {
      transition: 0.55s;
    }
   `;

export default Button;

