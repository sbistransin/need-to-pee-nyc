import styled from "styled-components";
import { Link } from "react-router-dom";

export const SignInContainer = styled.div`
  min-height: 692px;
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  z-index: 0;
  overflow: hidden;
  background: #F2F1EA;
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
  @media (max-width: 980px) {
    width: 0%;
  }
`;

// export const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
//   padding-bottom: 8rem;
// `;

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5rem;
  letter-spacing: 0.3px;
  border: none;
  border-radius: 4px;
  width: 14rem;
  height: 1.5em;
  font-size: 1rem;
`;

export const LoginBtn = styled.button`
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
  border-radius: 4px;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const Title = styled.div`
  height: calc(100% - 100px);
  box-sizing: border-box;
  justify-self: flex-start;
  padding-right: 5rem;
  margin-top: -150px;
  max-width: 90%;
  transition: 0.4s;

  @media (max-width: 1400px) {
    padding: 2rem;
  }

  @media (max-width: 1400px) {
    padding: 2rem;
  }

  @media (max-width: 980px) {
    display: none;
  }
`;

export const RightMobileTitle = styled.div`
  transition: 0.4s;
  width: 50%;
  display: flex;
  flex-direciton: column;
  align-items: flex-start;
  box-sizing: border-box;
  margin-bottom: 3rem;
  

  @media (max-width: 1600px) {
    display: none;
  }

  @media (max-width: 1200px) {
    display: none;
  }

  @media (max-width: 980px) {
    display: flex;
    font-weight: 600;
    font-size: 4rem;
    width: 70%;
  }

  @media (max-width: 750px) {
    display: flex;
    font-weight: 600;
    font-size: 3rem;
    width: 60%;
  }

  @media (max-width: 600px) {
    display: flex;
    font-weight: 600;
    font-size: 3rem;
    width: 50%
  }
`;


export const FormWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 400px) {
    height: 80%;
  }
`;

export const Icon = styled(Link)`
  margin-left: 32px;
  margin-top: 32px;
  text-decoration: none;
  color: black;
  font-weight: 700;
  font-size: 32px;

  @media (max-width: 400px) {
    margin-left: 16px;
    margin-right: 8px;
  }
`;

export const FormContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 480px) {
    padding: 10px;
  }

`;

export const Form = styled.form`
  background: #F2F1EA;
  max-width: 400px;
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  padding: 80px 32px;
  border-radius: 4px;

  @media (max-width: 400px) {
    padding: 32px 32px;
  }
`;

export const FormH1 = styled.h1`
  margin-bottom:
`;