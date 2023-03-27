import {
  // 💡 hint: unfortunately we need to use common actions here
  // this is bad, but fixing real-world is not an easy task
  ARTICLE_SUBMITTED,
  ASYNC_START,

  // 💡 hint: those can be safely moved to the local `actionTypes`
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  ADD_TAG,
  REMOVE_TAG,
  UPDATE_FIELD_EDITOR,
} from '../constants/actionTypes';

// eslint-disable-next-line default-param-last
export default (state = {}, action) => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        articleSlug: action.payload ? action.payload.article.slug : '',
        title: action.payload ? action.payload.article.title : '',
        description: action.payload ? action.payload.article.description : '',
        body: action.payload ? action.payload.article.body : '',
        tagInput: '',
        tagList: action.payload ? action.payload.article.tagList : [],
      };
    case EDITOR_PAGE_UNLOADED:
      return {};
    case ARTICLE_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null,
      };
    case ASYNC_START:
      if (action.subtype === ARTICLE_SUBMITTED) {
        return { ...state, inProgress: true };
      }
      break;
    case ADD_TAG:
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: '',
      };
    case REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter((tag) => tag !== action.tag),
      };
    case UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }

  return state;
};
