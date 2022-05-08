import styled from 'styled-components';

const Home = () => { 
  return (
    <HomeContainer>
      <Header>NEED TO PEE NYC</Header>
    </HomeContainer>)
}

export default Home;

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F2F1EA;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
`;

const Header = styled.header`
  font-family: 'Montserrat', sans-serif; 
  padding-bottom: 1rem;
  margin-top: -4rem;
  font-size: 6.6rem;
  font-weight: 600;
  text-align: center;
  transition: 0.4s;
  @media (max-width: 1200px) {
    font-size: 5.5rem;
  }
  @media (max-width: 1000px) {
    font-size: 4.8rem;
    margin-top: -5rem;
  }
  @media (max-width: 500px) {
    font-size: 4rem;
    margin-top: -5rem;
  }
`;