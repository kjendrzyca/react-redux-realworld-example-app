import { requests } from '../api';

export const createArticle = (article) => requests.post('/articles', { article });
