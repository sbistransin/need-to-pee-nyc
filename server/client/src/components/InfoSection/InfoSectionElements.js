import styled from "styled-components";
import { Link as LinkS } from 'react-scroll';
import { Link as LinkR } from "react-router-dom";

export const InfoContainer = styled.div`
  color: black;
  background: ${({lightBg}) => (lightBg ? 'white' : '#F2F1EA')};

  @media sreen and (max-width: 700px) {
    padding: 100px 0;
  }
`;

export const InfoWrapper = styled.div`
  display: grid;
  z-index: 1;
  height: 860px;
  width: 100%;
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 24px;
  justify-content: center;
`;

export const InfoRow = styled.div`
  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  align-items: center;
  grid-template-areas: ${({imgStart}) => (imgStart ? `'col2 col1'` : `'col1 col2'` )};
  
  @media screen and (max-width: 700px) {
    grid-template-areas: ${({imgStart}) => (imgStart ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`)};
  }
`;

export const Column1 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col1;
`;

export const Column2 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col2;
`;

export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;
`;

export const TopLine = styled.p`
  color: black;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

export const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({lightText}) => (lightText ? 'white' : 'black')};

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: black;
  
  @media screen and (max-width: 700px) {
    max-width: 330px;
  }
`;

export const BtnWrap = styled.p`
  display: flex;
  justify-content: flex-start;
`;

export const ImgWrap = styled.div`
  max-width: 555px;
  height: 100%;

`;

export const Img = styled.img`
  width: 100%;
  max-height: 300px;
  margin: 0 0 10px 0;
  padding-right: 0;

  @media screen and (max-width: 700px) {
    max-height: 200x;
  }
`;


export const Button = styled(LinkS)`
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
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const ButtonLink = styled(LinkR)`
  background-color: white;
  text-decoration: none;
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
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: black;
    color: white;
  }
`;