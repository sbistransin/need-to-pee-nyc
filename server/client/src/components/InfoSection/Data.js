import city from '../../images/city.svg';
import texting from '../../images/texting.svg';
import wash from '../../images/wash_hands.svg';
import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';

export const homeObjOne = {
  id: 'about',
  lightBg: true,
  lightText: false,
  lightTextDesc: true,
  topLine: 'About Us',
  headline: 'What is Need to Pee?',
  description: 'Need to Pee NYC started from the need of trying to find a restroom in New York City that is not in your apartment building. No longer do you have to remember where all of the best spots near you are.',
  buttonLabel: 'How It Works',
  imgStart: false,
  img: city,
  alt: 'City',
  dark: true,
  primary: true,
  darkText: false,
  buttonDestination: "discover",
};

export const homeObjTwo = {
  id: 'discover',
  lightBg: false,
  lightText: true,
  lightTextDesc: false,
  topLine: 'Restroom Recommendations',
  headline: 'Find the closest restrooms near you',
  description: 'Once you sign up, you will receive a text from our number. From there, text your current address to our number and we will send you some recommendations nearby.',
  buttonLabel: 'Get Started',
  imgStart: true,
  img: texting,
  alt: 'Texting',
  dark: false,
  primary: false,
  darkText: true,
  buttonDestination: "signup",
};

export const homeObjThree = {
  id: 'signup',
  lightBg: true,
  lightText: false,
  lightTextDesc: true,
  topLine: 'Join Us',
  headline: 'Sign up Today',
  description: 'Join us in helping New Yorks find the best restrooms. What are you waiting for?',
  buttonLabel: 'Sign Up',
  imgStart: false,
  img: wash,
  alt: 'washing',
  dark: true,
  primary: false,
  darkText: false,
  buttonDestination: "",
};

