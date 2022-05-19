import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import logo from "../../images/need2pee.svg"
import { FooterContainer, FooterWrap, FooterLinksContainer, FooterLinksWrapper, FooterLinkItems, FootLinkTitle, FooterLink,
SocialMedia, SocialMediaWrap, SocialLogo, WebsiteRights, SocialIcons, SocialIconLinks, ImgWrap, Img } from "./FooterElements";

const Footer = () => {

  const toggleHome = () => {
    scroll.scrollToTop();
  }
  
  return (
    <>
      <FooterContainer>
        <FooterWrap>
          {/* <FooterLinksContainer>
            <FooterLinksWrapper>
              <FooterLinkItems>
                <FootLinkTitle>About Us</FootLinkTitle>
                  <FooterLink to="/signin">How It Works</FooterLink>
                  <FooterLink to="/signin">Testimonials</FooterLink>
                  <FooterLink to="/signin">Careers</FooterLink>
                  <FooterLink to="/signin">Investors</FooterLink>
                  <FooterLink to="/signin">Terms of Service</FooterLink>
              </FooterLinkItems>
              <FooterLinkItems>
                <FootLinkTitle>Contact Us</FootLinkTitle>
                  <FooterLink to="/signin">Contact</FooterLink>
                  <FooterLink to="/signin">Support</FooterLink>
                  <FooterLink to="/signin">Destionations</FooterLink>
                  <FooterLink to="/signin">Sponsorships</FooterLink>
              </FooterLinkItems>
            </FooterLinksWrapper>
            <FooterLinksWrapper>
              <FooterLinkItems>
                <FootLinkTitle>Videos</FootLinkTitle>
                  <FooterLink to="/signin">Submit Video</FooterLink>
                  <FooterLink to="/signin">Ambassadors</FooterLink>
                  <FooterLink to="/signin">Agency</FooterLink>
                  <FooterLink to="/signin">Influencer</FooterLink>
              </FooterLinkItems>
              <FooterLinkItems>
                <FootLinkTitle>Other</FootLinkTitle>
                  <FooterLink to="/signin">Instagram</FooterLink>
                  <FooterLink to="/signin">Facebook</FooterLink>
                  <FooterLink to="/signin">Youtube</FooterLink>
                  <FooterLink to="/signin">Twitter</FooterLink>
                  <FooterLink to="/signin">TikTok</FooterLink>
              </FooterLinkItems>
            </FooterLinksWrapper>
          </FooterLinksContainer> */}
          <SocialMedia>
            <SocialMediaWrap>
              <SocialLogo to="/" onClick={toggleHome}>
                <ImgWrap>
                  <Img src={logo} alt="Need to Pee NYC"/>
                </ImgWrap>
              </SocialLogo>
              <WebsiteRights>Need to Pee NYC © {new Date().getFullYear()} All rights reserved.</WebsiteRights>
              {/* <SocialIcons>
                <SocialIconLinks href="//www.facebook.com" target="_blank" aria-label="Facebook">
                  <FaFacebook />
                </SocialIconLinks>
                <SocialIconLinks href="/" target="_blank" aria-label="Instagram">
                  <FaInstagram />
                </SocialIconLinks>
                <SocialIconLinks href="/" target="_blank" aria-label="Youtube">
                  <FaYoutube />
                </SocialIconLinks>
                <SocialIconLinks href="/" target="_blank" aria-label="Twitter">
                  <FaTwitter />
                </SocialIconLinks>
                <SocialIconLinks href="/" target="_blank" aria-label="Linkedin">
                  <FaLinkedin />
                </SocialIconLinks>
              </SocialIcons> */}
            </SocialMediaWrap>
          </SocialMedia>
        </FooterWrap>
      </FooterContainer>
    </>
  )

}

export default Footer;

