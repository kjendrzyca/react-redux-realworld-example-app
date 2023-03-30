import React from 'react';
import agent from '../agent';

function Tags(props) {
  const tags = props.tags;
  if (tags) {
    return (
      <div className="tag-list">
        {
          tags.map((tag) => {
            const handleClick = (ev) => {
              ev.preventDefault();
              // eslint-disable-next-line max-len
              props.onClickTag(tag, (page) => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag));
            };

            return (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                href=""
                className="tag-default tag-pill"
                key={tag}
                onClick={handleClick}
              >
                {tag}
              </a>
            );
          })
        }
      </div>
    );
  }

  return (
    <div>Loading Tags...</div>
  );
}

export default Tags;
