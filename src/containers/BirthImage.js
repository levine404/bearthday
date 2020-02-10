import React from 'react';
import { useSelector } from 'react-redux';
import { getBirthdayImage } from '../redux/epic.module';
import AnimatedEarth from '../components/AnimatedEarth';

const BirthImage = () => {
  const birthdayImage = useSelector(getBirthdayImage);
  return (
    <AnimatedEarth birthdayImage={birthdayImage} />
  );
};

export default BirthImage;
