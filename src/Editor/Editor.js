/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListErrors from '../components/ListErrors';
import agent from '../agent';
import {
  // 💡 hint: this action needs to be here
  // also you need PAGE_UNLOADED here
  ARTICLE_SUBMITTED,

  // 💡 hint: those actions should be moved to `./store/actionTypes`
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR,
} from '../constants/actionTypes';

function Editor(props) {
  const dispatch = useDispatch();
  const editor = useSelector((state) => state.editor);

  const onUpdateField = (key, value) => dispatch({ type: UPDATE_FIELD_EDITOR, key, value });

  const updateFieldEvent = (key) => (ev) => onUpdateField(key, ev.target.value);
  const changeTitle = updateFieldEvent('title');
  const changeDescription = updateFieldEvent('description');
  const changeBody = updateFieldEvent('body');
  const changeTagInput = updateFieldEvent('tagInput');

  const watchForEnter = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      dispatch({ type: ADD_TAG });
    }
  };

  const removeTagHandler = (tag) => () => {
    dispatch({ type: REMOVE_TAG, tag });
  };

  const submitForm = (ev) => {
    ev.preventDefault();
    const article = {
      title: editor.title,
      description: editor.description,
      body: editor.body,
      tagList: editor.tagList,
    };

    const slug = { slug: editor.articleSlug };
    const promise = editor.articleSlug
      ? agent.Articles.update(Object.assign(article, slug))
      : agent.Articles.create(article);

    dispatch({ type: ARTICLE_SUBMITTED, payload: promise });
  };

  const { match: { params: { slug } } } = props;
  useEffect(() => {
    const onLoad = (payload) => dispatch({ type: EDITOR_PAGE_LOADED, payload });

    if (slug) {
      onLoad(agent.Articles.get(slug));
    } else {
      onLoad(null);
    }

    // 💡 hint: call PAGE_UNLOADED here as well
    return () => dispatch({ type: EDITOR_PAGE_UNLOADED });
  }, [dispatch, slug]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">

            <ListErrors errors={editor.errors} />

            <form>
              <fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Article Title"
                    value={editor.title}
                    onChange={changeTitle}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="What's this article about?"
                    value={editor.description}
                    onChange={changeDescription}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    value={editor.body}
                    onChange={changeBody}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter tags"
                    value={editor.tagInput}
                    onChange={changeTagInput}
                    onKeyUp={watchForEnter}
                  />

                  <div className="tag-list">
                    {
                      (editor.tagList || []).map((tag) => (
                        <span className="tag-default tag-pill" key={tag}>
                          <i
                            className="ion-close-round"
                            onClick={removeTagHandler(tag)}
                          />
                          {tag}
                        </span>
                      ))
                    }
                  </div>
                </fieldset>

                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  disabled={editor.inProgress}
                  onClick={submitForm}
                >
                  Publish Article
                </button>

              </fieldset>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
