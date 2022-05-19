import styled from "styled-components";

export const SignUpContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F2F1EA;
  width: 100vw;
  height: 100vh;
`;

export const LeftSideWrapper = styled.div`
  width: 50%;
  min-width: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 1000px) {
    width: 100%;
    padding-top: 2rem;
  }

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const RightSideWrapper = styled.div`
  font-weight: 600;
  font-size: 6.6rem;
  width: 50%;
  display: flex;
  flex-direciton: column;
  align-items: flex-start;
  box-sizing: border-box;
  margin-bottom: 3rem;
  @media (max-width: 1000px) {
    width: 0%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-bottom: 8rem;
`;

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5rem;
  letterSpacing: 0.3px;
  border: none;
  borderRadius: 4px;
  width: 14rem;
  height: 1.5em;
`;

export const SignUpBtn = styled.button`
  background-color: white;
  color: black;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  letter-spacing: 0.5px;
  width: 10rem;
  padding: 0.5em;
  margin: 0.5rem;
  border: 1px solid black;
  borderRadius: 4px;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const ErrorMsg = styled.p`
  color: red;
  text-align: center;
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  padding: 0px;
  margin: 0px;
`;

