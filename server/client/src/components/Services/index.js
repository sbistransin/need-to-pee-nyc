import React from "react";
import Icon1 from "../../images/city.svg";
import Icon2 from "../../images/texting.svg";
import Icon3 from "../../images/wash_hands.svg";


import { ServicesContainer, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH1, ServicesH2, ServicesP } from "./ServicesElements";

const Services = () => {
  return (
    <>
      <ServicesContainer id="services">
        <ServicesH1>Our Services</ServicesH1>
        <ServicesWrapper>
          <ServicesCard>
            <ServicesIcon src={Icon1}/>
            <ServicesH2>Text for Restrooms</ServicesH2>
            <ServicesP>Sign up and get an exclusive phone number to text for restrooms.</ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon2}/>
            <ServicesH2>Manage Preferences</ServicesH2>
            <ServicesP>Update what kind of restrooms you would like to be recommended.</ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon3}/>
            <ServicesH2>Add Restrooms You Find</ServicesH2>
            <ServicesP>When you find a good restroom in the city - add it to our database!</ServicesP>
          </ServicesCard>
          
        </ServicesWrapper>
      </ServicesContainer>
    </>
  )

}

export default Services;

