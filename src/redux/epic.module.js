import axios from 'axios';
import appConfig from '../app.config';
import dateString from '../common/dateString';

export const FETCH_BIRTHDAY_IMAGE_PENDING = 'FETCH_BIRTHDAY_IMAGE_PENDING';
export const FETCH_BIRTHDAY_IMAGE_SUCCESS = 'FETCH_BIRTHDAY_IMAGE_SUCCESS';
export const FETCH_BIRTHDAY_IMAGE_ERROR = 'FETCH_BIRTHDAY_IMAGE_FAILURE';

export function fetchBirthdayImagePending () {
  return {
    type: FETCH_BIRTHDAY_IMAGE_PENDING
  };
}

export function fetchBirthdayImageSuccess (imageData, imagesLoading = false) {
  return {
    type: FETCH_BIRTHDAY_IMAGE_SUCCESS,
    imageData,
    imagesLoading
  };
}

export function fetchBirthdayImageError (err) {
  return {
    type: FETCH_BIRTHDAY_IMAGE_ERROR,
    error: err
  };
}

const initialState = {
  pending: false,
  imagesLoading: false,
  birthdayImage: null,
  error: null
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_BIRTHDAY_IMAGE_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_BIRTHDAY_IMAGE_SUCCESS:
      return {
        ...state,
        pending: false,
        imagesLoading: action.imagesLoading || false,
        birthdayImage: action.imageData
      };
    case FETCH_BIRTHDAY_IMAGE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const fetchBirthdayImage = (date, attempt = 0) => {
  return async dispatch => {
    if (attempt < appConfig.MAX_ATTEMPTS) {
      dispatch(fetchBirthdayImagePending());
      try {
        const config = {
          widthCredentials: true,
          crossdomain: true
        };
        const year = date.getFullYear();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const url = `${appConfig.apis.EPIC}/enhanced/date/${year}-${dateString(month)}-${dateString(day)}?api_key=${appConfig.apis.EPIC_API_KEY}`
        const response = await axios.get(url, config);
        if (!response) {
          return dispatch(fetchBirthdayImageError(new Error('No response!')));
        }
        const imgArr = response.data;
        if (!imgArr.length) {
          const nextDay = new Date(date);
          nextDay.setDate(nextDay.getDate() + 1);
          return fetchBirthdayImage(nextDay, attempt + 1)(dispatch);
        }
        const imgLoadingPromises = [];
        const imageData = {
          images: response.data.map(item => {
            const img = new Image();
            img.src = `${appConfig.resources.EPIC}/${year}/${dateString(month)}/${dateString(day)}/png/${item.image}.png`;
            const promise = new Promise(resolve => {
              img.addEventListener('load', () => {
                resolve();
              });
            });
            imgLoadingPromises.push(promise);
            return img;
          }),
          day,
          month,
          year
        };
        // Only load the first image until all are complete
        if (imageData.images.every(img => img.complete)) {
          dispatch(fetchBirthdayImageSuccess(imageData));
        } else {
          dispatch(fetchBirthdayImageSuccess({ ...imageData, images: [imageData.images[0]] }, true));
          Promise.all(imgLoadingPromises).then(() => {
            dispatch(fetchBirthdayImageSuccess(imageData));
          });
        }
      } catch (err) {
        dispatch(fetchBirthdayImageError(err));
      }
    } else {
      dispatch(fetchBirthdayImageError(new Error('Too many unsuccessful attempts!')));
    }
  };
};

export const getPending = state => state.epic.pending;
export const getBirthdayImage = state => state.epic.birthdayImage;
export const getError = state => state.epic.error;
export const getImagesLoading = state => state.epic.imagesLoading;
