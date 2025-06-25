import React from 'react';

interface IBanner {
  color: string;
  image: string;
  title: string
}

const Banner = ({ color, image, title }: IBanner) => {


  return (
    <div
      className={`relative w-full aspect-[16/9] max-h-[600px] ${color || 'bg-white'}`}
      style={{
        backgroundImage: image ? `url(${image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {image && <div className="absolute inset-0 bg-black/50 z-0" />}
      
      <div className="absolute inset-0 flex items-center justify-center z-10 px-4 text-center max-lg:mt-20">
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold font-banner-title capitalize">
          {title || 'Default Title'}
        </h1>
      </div>
    </div>
  );
};

export default Banner;
