import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Comment from "./Comment";
import backendApi from "../../services/backendApi";

function Comments({ newComment, postId, modification, setModification }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await backendApi.get(`/api/comments/${postId}`);

        if (res.status === 200) {
          setComments(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [newComment, modification]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {comments.length ? (
        <div className="flex flex-col bg-secondary p-2 gap-2 rounded-b-xl">
          {comments.map((elem) => (
            <Comment
              comment={elem}
              modification={modification}
              setModification={setModification}
            />
          ))}
        </div>
      ) : (
        <div className=" bg-secondary p-4 rounded-b-xl font-poppins text-primary">
          Aucun commentaire pour l'instant
        </div>
      )}
    </>
  );
}

Comments.propTypes = {
  postId: PropTypes.number.isRequired,
  newComment: PropTypes.string.isRequired,
  modification: PropTypes.bool.isRequired,
  setModification: PropTypes.func.isRequired,
};
export default Comments;
