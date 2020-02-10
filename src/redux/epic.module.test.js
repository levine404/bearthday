import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import epicReducer, {
  fetchBirthdayImagePending,
  fetchBirthdayImageSuccess,
  fetchBirthdayImageError,
  FETCH_BIRTHDAY_IMAGE_PENDING,
  FETCH_BIRTHDAY_IMAGE_SUCCESS,
  FETCH_BIRTHDAY_IMAGE_ERROR,
  fetchBirthdayImage
} from './epic.module';
import store from './index';

const mockStore = configureMockStore([thunk]);

describe('app.module', () => {
  describe('action creators', () => {
    it('should create a fetch birthday image pending action', () => {
      const result = fetchBirthdayImagePending();
      expect(result.type).toBe(FETCH_BIRTHDAY_IMAGE_PENDING);
    });
    it('should create a fetch birthday image success action', () => {
      const result = fetchBirthdayImageSuccess();
      expect(result.type).toBe(FETCH_BIRTHDAY_IMAGE_SUCCESS);
    });
    it('should create a fetch birthday image success error', () => {
      const result = fetchBirthdayImageError();
      expect(result.type).toBe(FETCH_BIRTHDAY_IMAGE_ERROR);
    });
  });
  beforeEach(() => {
    moxios.install();
  });
  describe('epic reducer', () => {
    it ('should create an object with initial state at first', () => {
      const result = epicReducer(undefined, {});
      expect(result).toEqual({
        pending: false,
        birthdayImage: null,
        error: null,
        imagesLoading: false
      });
    });
    it('should get birthday images with data', async done => {
      const st = mockStore(store);
      const aug3 = new Date('2017-08-03');
      moxios.stubRequest(/.*/, {
        status: 200,
        responseText: [{ image: 'someimage' }]
      });
      await st.dispatch(fetchBirthdayImage(aug3));
      const firstAction = st.getActions()[0];
      const secondAction = st.getActions()[1];
      expect(firstAction.type).toBe(FETCH_BIRTHDAY_IMAGE_PENDING);
      expect(secondAction.type).toBe(FETCH_BIRTHDAY_IMAGE_SUCCESS);
      expect(secondAction.imageData.images.length).toBe(1);
      done();
    });
  });
});
