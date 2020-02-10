import React from 'react';
import { useSelector } from 'react-redux';
import { getBirthMonth, getBirthDay } from '../redux/app.module';
import { getBirthdayImage } from '../redux/epic.module';
import BirthDay from '../containers/BirthDay';
import BirthMonth from '../containers/BirthMonth';
import ActionButton from './ActionButton';
import BirthImage from '../containers/BirthImage';

const Layout = () => {
  const birthMonth = useSelector(getBirthMonth);
  const birthDay = useSelector(getBirthDay);
  const birthImage = useSelector(getBirthdayImage)
  const layoutSyle = {
    position: 'relative',
    width: '100%',
    height: '100%'
  };
  const subStyle = {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  };
  const titleStyle = {
    fontSize: '3em',
    flex: '1 1 auto',
    margin: '24px',
    color: 'rgb(50, 90, 250)',
    textAlign: 'center'
  };
  const messageStyle = { 
    fontSize: '0.3em',
    opacity: '0.9'
  };
  const actionsStyle = {
    margin: '24px'
  };
  let message = 'Enter Your Birthday Below';
  if (birthImage) {
    if (birthImage.day === birthDay && birthImage.month === birthMonth) {
      message = 'This is the earth on your birthday!'
    } else {
      message = `The closest date to your birthday with satelite images is ${birthImage.month}/${birthImage.day}`
    }
  }
  return (
    <div className="layout" style={layoutSyle}>
      <div style={subStyle}>
        <div className="title" style={titleStyle}>
          BEARTHDAY
          <div style={messageStyle}>{message}</div>
        </div>
        <div style={actionsStyle}>
          <BirthMonth />
          <BirthDay />
          <ActionButton />
        </div>
      </div>
      <BirthImage />
    </div>
  );
};

export default Layout;
