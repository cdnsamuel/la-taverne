import { useState } from "react";
import PropTypes from "prop-types";

import { useUserContext } from "../../contexts/UserContext";
import dateTimeFr from "../../services/dateTimeFr";
import backendApi from "../../services/backendApi";

function Comment({ comment, modification, setModification }) {
  const { user } = useUserContext();
  const [editionMode, setEditionMode] = useState(false);

  const [editedComment, setEditedComment] = useState(comment.content);

  const handleEditionMode = () => {
    setEditionMode(!editionMode);
  };

  const handleCommentInput = (evt) => {
    setEditedComment(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const res = await backendApi.put(`/api/comments/${comment.id}`, {
        content: editedComment,
      });
      if (res.status === 201) {
        handleEditionMode();
        setModification(!modification);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async () => {
    try {
      const res = await backendApi.delete(`/api/comments/${comment.id}`);

      if (res.status === 204) {
        setModification(!modification);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-accent bg-opacity-10 p-2 rounded-xl text-primary">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-4 border-b-2 border-accent border-opacity-50 pb-1">
        <div className="flex justify-between lg:w-full">
          <p className="font-lobster text-lg">{comment.nickname}</p>
          <p>{`Le ${dateTimeFr(comment.creation).date} à ${
            dateTimeFr(comment.creation).time
          }`}</p>
        </div>
        {(user.roles.includes("admin") || comment.userId === user.id) && (
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleEditionMode}
              className="btn btn-xs btn-secondary"
            >
              Mofifier
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-xs btn-accent"
            >
              Supprimer
            </button>
          </div>
        )}
      </div>
      {editionMode ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <textarea
            type="text"
            name="edited"
            id="edited"
            value={editedComment}
            onChange={handleCommentInput}
            className="textarea textarea-accent textarea-sm"
          />
          <button type="submit" className="btn btn-xs btn-primary self-end">
            Enregistrer
          </button>
        </form>
      ) : (
        <p className="p-1">{comment.content}</p>
      )}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    creation: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  modification: PropTypes.bool.isRequired,
  setModification: PropTypes.func.isRequired,
};

export default Comment;
