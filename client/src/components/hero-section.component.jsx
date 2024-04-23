import { useEffect, useState } from "react";
import HeroImg from '../json/hero-img.json';

const HeroSection = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? HeroImg.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const goToNext = () => {
        const isLastImage = currentIndex === HeroImg.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    useEffect(() => {
      const timer = setInterval(() => {
        goToNext();
      }, 3000); 
  
      return () => clearInterval(timer);
    }, [currentIndex]);

    
    

    return (
        <>
        <div className=" mx-auto mt-4">
            <div className="relative overflow-hidden drop-shadow-2xl shadow-dark-grey rounded-lg bg-grey">
            {HeroImg.map((image, index) => (
          <img
            key={index}
            src={image.image}
            alt={`Slide ${index}`}
            className={`h-[22em] w-full object-contain transition-transform duration-100 ease-in-out py-2  ${index === currentIndex ? 'opacity-100' : 'opacity-0 absolute'} `}
          />
        ))}
         <div className="flex justify-between absolute top-1/2 w-full transform -translate-y-1/2 px-3">
        <button
          onClick={goToPrevious}
          className="bg-rgbagrey rounded-full p-2 text-black text-xl hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 hover:scale-105 duration-500"
        >
          &#8592;
        </button>
        <button
          onClick={goToNext}
          className="bg-rgbagrey rounded-full p-2 text-black text-xl hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 hover:scale-105 duration-500"
        >
          &#8594;
        </button>
        </div>
            </div>
           
        </div>
        </>
    )
}

export default HeroSection;