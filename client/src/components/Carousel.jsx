import React, { useState, useEffect } from 'react';

const Carousel = ({slides, autoSlide = true, autoSlideInterval = 4000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [currentIndex, autoSlide, autoSlideInterval]);
  return (
    <div className="max-w-[1400px] h-[480px] w-full m-auto py-4 px-4 relative group">
      {/* Slide Wrapper Container */}
      <div className="w-full h-full rounded-2xl overflow-hidden relative">
        {/* Sliding Track */}
        <div 
          className="flex h-full transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div 
              key={slideIndex} 
              className="w-full h-full flex-shrink-0 relative"
            >
              <img 
                src={slide.url} 
                alt={slide.title || 'Banner Slide'} 
                className="w-full h-full object-cover"
              />
             
            </div>
          ))}
        </div>
      </div>

      {/* Left Navigation Arrow */}
      <button 
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 left-8 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Right Navigation Arrow */}
      <button 
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-[50%] -translate-y-1/2 right-8 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/50 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Indicator Dots */}
      <div className="flex justify-center py-3 space-x-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === slideIndex ? 'bg-gray-800 w-6' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel