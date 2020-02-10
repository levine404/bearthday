import React, { useState } from 'react';

const AnimatedEarth = ({ birthdayImage }) => {
  const [imageIndex, setImageIndex] = useState(0);
  setTimeout(() => {
    if (birthdayImage && birthdayImage.images) {
      let next = imageIndex + 1;
      if (next > birthdayImage.images.length - 1) {
        next = 0;
      }
      setImageIndex(next);
    }
  }, 500);
  const imageUrl = birthdayImage && birthdayImage.images && birthdayImage.images[imageIndex]
    ? `${birthdayImage.images[imageIndex].src}`
    : '';
  const animatedEarthStyle = {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0
  };
  return (
    <div
      className="animated-earth"
      style={animatedEarthStyle}
    ></div>
  );
};

export default AnimatedEarth;
