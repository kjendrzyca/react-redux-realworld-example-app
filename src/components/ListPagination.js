/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch } from 'react-redux';
import agent from '../agent';
import { SET_PAGE } from '../constants/actionTypes';

function ListPagination(props) {
  const dispatch = useDispatch();
  const onSetPage = (page, payload) => dispatch({ type: SET_PAGE, page, payload });

  if (props.articlesCount <= 10) {
    return null;
  }

  const range = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
    range.push(i);
  }

  const setPage = (page) => {
    if (props.pager) {
      onSetPage(page, props.pager(page));
    } else {
      onSetPage(page, agent.Articles.all(page));
    }
  };

  return (
    <nav>
      <ul className="pagination">

        {
          range.map((v) => {
            const isCurrent = v === props.currentPage;
            const onClick = (ev) => {
              ev.preventDefault();
              setPage(v);
            };
            return (
              <li
                className={isCurrent ? 'page-item active' : 'page-item'}
                onClick={onClick}
                key={v.toString()}
              >
                <a className="page-link" href="">{v + 1}</a>
              </li>
            );
          })
        }

      </ul>
    </nav>
  );
}

export default ListPagination;
