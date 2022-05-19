import { useSelector } from 'react-redux';
import HeroSection from './HeroSection/indexs';
import InfoSection from './InfoSection';
import Services from './Services';
import { homeObjOne, homeObjThree, homeObjTwo } from './InfoSection/Data.js';
import Footer from './Footer';
import Header from './Headers/Header';

const Home = () => {

  const { authenticated } = useSelector(state => state.auth);

  return (
    <>
      <Header />
      <HeroSection />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      {(authenticated) ? "" : <InfoSection {...homeObjThree} /> }
      <Services></Services>
      <Footer />
    </>
  )
}

export default Home;