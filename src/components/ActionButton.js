import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBirthdayImage, getPending, getImagesLoading } from '../redux/epic.module';
import { getBirthDay, getBirthMonth } from '../redux/app.module';
import getLastBirthDay from '../logic/getLastBirthDay';
import appConfig from '../app.config';

const ActionButton = () => {
  const dispatch = useDispatch();
  const now = new Date(Date.now());
  const birthDay = useSelector(getBirthDay);
  const isPending = useSelector(getPending);
  const isLoadingImages = useSelector(getImagesLoading);
  const birthMonth = useSelector(getBirthMonth);
  const latestDate = appConfig.apis.EPIC_LAST_RECORDED_IMAGE < now
    ? appConfig.apis.EPIC_LAST_RECORDED_IMAGE
    : now;
  const lastBirthDay = getLastBirthDay(birthDay, birthMonth, latestDate);
  const clickHandler = () => {
    if (!isPending && !isLoadingImages) {
      fetchBirthdayImage(lastBirthDay)(dispatch);
    }
  };
  const message = isLoadingImages || isPending
    ? '...'
    : 'GO';
  return (
    <button onClick={clickHandler}>{message}</button>
  );
};

export default ActionButton;
