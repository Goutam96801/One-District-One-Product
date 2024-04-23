import { useContext } from "react";
import Footer from "../components/footer.component";
import Header from "../components/header.component";
import HeroSection from "../components/hero-section.component";
import VideoComponent from "../components/video.component";
import videoUrl from '../files/video.mp4';

import { UserContext } from '../App';

const HomePage = () => {

  let { userAuth: { access_token, role  } } = useContext(UserContext)


  return (
    <>
      <Header />
      <HeroSection />
      <VideoComponent videoUrl={videoUrl}/>
      <div className="flex items-center drop-shadow-xl shadow-dark-grey bg-grey rounded-lg justify-center flex-col gap-4 px-2 py-4 my-4  mx-10">
        <p className="text-center text-2xl">One District One Product (ODOP) initiative is aimed at fostering balanced regional development across all districts of the country. The initiative aims to select, brand, and promote at least One Product from each District (One District - One Product) of the country for enabling holistic socioeconomic growth across all regions. The ODOP Initiative has identified a total of 1102 products from 761 districts across the country.</p>
        <button className="px-4 py-2 bg-red text-white rounded-lg hover:opacity-80 duration-300">Read More</button>
      </div>
      <Footer/>
    </>
  );
};

export default HomePage;
