import styled from "styled-components";

export const SignInContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F2F1EA;
  width: 100vw;
  height: 100vh;
  padding-top: 40px;
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
  font-size: 5rem;
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-bottom: 8rem;
`;

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
    padding: 1rem;
  }

  @media (max-width: 1400px) {
    padding: 1rem;
  }

  @media (max-width: 980px) {
    display: none;
  }
`

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
`