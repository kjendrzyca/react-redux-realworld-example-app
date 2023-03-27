import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from '../constants/actionTypes';

// eslint-disable-next-line default-param-last
export default (state = {}, action) => {
  switch (action.type) {
    case PROFILE_PAGE_LOADED:
      return {
        ...action.payload[0].profile,
      };
    case PROFILE_PAGE_UNLOADED:
      return {};
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return {
        ...action.payload.profile,
      };
    default:
      return state;
  }
};
