import { useState } from "react";
import PropTypes from "prop-types";

import { useUserContext } from "../../contexts/UserContext";
import backendApi from "../../services/backendApi";
import dateTimeFr from "../../services/dateTimeFr";
import Comments from "./Comments";

function PostCard({ post, modification, setModification }) {
  const { user } = useUserContext();

  const [commentsOpen, setCommentsOpen] = useState(false);
  const [editionMode, setEditionMode] = useState(false);
  const [commentInput, setCommentInput] = useState(false);
  const [oldFields, setOldFields] = useState({
    title: post.title,
    content: post.content,
  });
  const [fields, setFields] = useState({
    title: post.title,
    content: post.content,
  });
  const [newComment, setNewComment] = useState("");

  const handleEditionMode = () => {
    setEditionMode(!editionMode);
  };

  const handleCommentsOpen = () => {
    setCommentsOpen(!commentsOpen);
    setCommentInput(false);
  };

  const handleCommentInput = () => {
    setCommentInput(!commentInput);
  };

  const handleNewComment = (evt) => {
    setNewComment(evt.target.value);
  };

  const postNewComment = async (evt) => {
    evt.preventDefault();

    try {
      const body = {
        postId: post.id,
        userId: user.id,
        content: newComment,
      };
      const res = await backendApi.post(`/api/comments/`, body);
      if (res.status === 201) {
        setNewComment("");
        setCommentInput(!commentInput);
        setModification(!modification);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputs = (evt) => {
    setFields({ ...fields, [evt.target.id]: evt.target.value });
  };

  const handleEdit = async (evt) => {
    evt.preventDefault();
    try {
      const res = await backendApi.put(`/api/posts/${post.id}`, fields);

      if (res.status === 201) {
        // eslint-disable-next-line no-param-reassign
        post.title = fields.title;
        // eslint-disable-next-line no-param-reassign
        post.content = fields.content;
        setOldFields(fields);
        setEditionMode(!editionMode);
      } else {
        setFields(oldFields);
        // TODO modale erreur
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await backendApi.delete(`/api/posts/${post.id}`);

      if (res.status === 204) {
        setModification(!modification);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleVote = async (evt) => {
    const body = {
      userId: user.id,
      upvote: 0,
      downvote: 0,
    };

    if (evt.target.id === "upvote") {
      body.upvote = 1;
    } else {
      body.downvote = 1;
    }

    try {
      const res = await backendApi.post(`/api/vote/${post.id}`, body);
      if (res.status === 201) setModification(!modification);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="m-3 font-poppins rounded-xl shadow-lg bg-base-200">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-4 gap-2 bg-primary py-2 px-4 text-white rounded-t-xl ">
        <div className="flex items-center w-full justify-between gap-2">
          <div className="font-lobster text-xl">{post.nickname}</div>
          <p>{`Le ${dateTimeFr(post.creation).date} à ${
            dateTimeFr(post.creation).time
          }`}</p>
        </div>
        {(user.roles.includes("admin") || post.userId === user.id) && (
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleEditionMode}
              className="btn btn-sm btn-secondary"
            >
              Mofifier
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-sm btn-accent"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col py-2 px-4 text-accent">
        {editionMode ? (
          <form onSubmit={handleEdit} className="flex flex-col gap-3">
            <div className="join join-vertical">
              <label htmlFor="title" className="label">
                <span className="label-text font-lobster text-xl text-accent">
                  Titre
                </span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="input input-bordered join-item"
                value={fields.title}
                onChange={handleInputs}
              />
              <label htmlFor="content" className="label">
                <span className="label-text font-lobster text-xl text-accent">
                  Message
                </span>
              </label>
              <textarea
                type="text"
                name="content"
                id="content"
                className="textarea textarea-bordered join-item"
                value={fields.content}
                onChange={handleInputs}
              />
            </div>
            <button type="submit" className="btn btn-primary self-end">
              Enregister
            </button>
          </form>
        ) : (
          <div className="">
            <div className="text-xl font-lobster">{post.title}</div>
            <div className="ml-1">{post.content}</div>
          </div>
        )}
      </div>
      <div
        className={`flex justify-between items-center bg-secondary py-2 px-4 text-accent font-lobster ${
          commentsOpen ? "rounded-none" : "rounded-b-xl"
        }`}
      >
        <button
          type="button"
          onClick={handleCommentsOpen}
          className="flex justify-center items-center gap-2"
        >
          <p className="text-lg">
            <span className="mx-2">{post.commentsCount}</span>Commentaires
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
            fill="none"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            color="#7B2705"
            className={commentsOpen ? "rotate-180" : ""}
          >
            <path
              stroke="#7B2705"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m6 13 6 6 6-6M6 5l6 6 6-6"
            />
          </svg>
        </button>
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            id="upvote"
            onClick={handleVote}
            className="flex gap-2 "
          >
            <p id="upvote">{post.upvoteCount ? post.upvoteCount : "0"}</p>
            <svg
              id="upvote"
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="none"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              color="#7B2705"
            >
              <path
                stroke="#7B2705"
                strokeWidth="1.5"
                strokeLinecap="round"
                d="M16.472 20H4.1a.6.6 0 0 1-.6-.6V9.6a.6.6 0 0 1 .6-.6h2.768a2 2 0 0 0 1.715-.971l2.71-4.517a1.631 1.631 0 0 1 2.961 1.308l-1.022 3.408a.6.6 0 0 0 .574.772h4.575a2 2 0 0 1 1.93 2.526l-1.91 7A2 2 0 0 1 16.473 20Z"
              />
              <path
                stroke="#7B2705"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 20V9"
              />
            </svg>
          </button>
          <button type="button" onClick={handleVote} className="flex gap-2 ">
            <p id="downvote">{post.downvoteCount ? post.downvoteCount : "0"}</p>
            <svg
              id="downvote"
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              height="25px"
              fill="none"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              color="#7B2705"
            >
              <path
                stroke="#7B2705"
                strokeWidth="1.5"
                strokeLinecap="round"
                d="M16.472 3.5H4.1a.6.6 0 0 0-.6.6v9.8a.6.6 0 0 0 .6.6h2.768a2 2 0 0 1 1.715.971l2.71 4.517a1.631 1.631 0 0 0 2.961-1.308l-1.022-3.408a.6.6 0 0 1 .574-.772h4.575a2 2 0 0 0 1.93-2.526l-1.91-7A2 2 0 0 0 16.473 3.5Z"
              />
              <path
                stroke="#7B2705"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 14.5v-11"
              />
            </svg>
          </button>
        </div>
        {commentsOpen ? (
          <button
            type="button"
            onClick={handleCommentInput}
            className="flex justify-center items-center gap-2"
          >
            <div className="lg:flex hidden text-lg">Ajouter</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25px"
              height="25px"
              fill="none"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              color="#7B2705"
            >
              <path
                stroke="#7B2705"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m20.777 13.345-7.297 8.027a2 2 0 0 1-2.96 0l-7.297-8.027a2 2 0 0 1 0-2.69l7.297-8.027a2 2 0 0 1 2.96 0l7.297 8.027a2 2 0 0 1 0 2.69ZM9 12h3m3 0h-3m0 0V9m0 3v3"
              />
            </svg>
          </button>
        ) : (
          <div className="lg:w-[85px] w-[25px]" />
        )}
      </div>
      {commentInput && (
        <form
          onSubmit={postNewComment}
          className="flex flex-col gap-2 w-full px-4 py-2 bg-secondary"
        >
          <div className="join join-vertical ">
            <label htmlFor="comment" className="join-item">
              Ajoutez votre commentaire :
            </label>
            <textarea
              type="text"
              name="comment"
              id="comment"
              className="textarea textarea-accent join-item"
              value={newComment}
              onChange={handleNewComment}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm self-end">
            Envoyer
          </button>
        </form>
      )}
      {commentsOpen && (
        <Comments
          modification={modification}
          setModification={setModification}
          newComment={commentInput}
          postId={post.id}
        />
      )}
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    creation: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    commentsCount: PropTypes.number.isRequired,
    upvoteCount: PropTypes.string,
    downvoteCount: PropTypes.string,
  }),
  modification: PropTypes.bool.isRequired,
  setModification: PropTypes.func.isRequired,
};

PostCard.defaultProps = {
  post: PropTypes.shape({
    upvoteCount: null,
    downvoteCount: null,
  }),
};
export default PostCard;
