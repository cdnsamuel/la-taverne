import { useState } from "react";
import PropTypes from "prop-types";
import { useUserContext } from "../../contexts/UserContext";
import backendApi from "../../services/backendApi";

function NewPost({
  modification,
  setModification,
  postModalOpen,
  setPostModalOpen,
}) {
  const { user } = useUserContext();

  const [fields, setFields] = useState({
    title: "",
    content: "",
  });

  const handleFields = (evt) => {
    setFields({ ...fields, [evt.target.id]: evt.target.value });
  };

  const handleNewPost = async (evt) => {
    evt.preventDefault();

    try {
      const res = await backendApi.post(`/api/posts`, {
        ...fields,
        userId: user.id,
      });

      if (res.status === 201) {
        setModification(!modification);
        setFields({ title: "", content: "" });
      }

      if (postModalOpen) {
        setPostModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full px-3">
      <div className="rounded-xl shadow-xl bg-base-200">
        <h3 className="bg-primary w-full text-center p-2 text-2xl text-white font-lobster rounded-t-xl">
          Créer un Post
        </h3>
        <div className=" flex flex-col justify-center p-2 rounded-b-xl">
          <form onSubmit={handleNewPost} className="flex flex-col gap-3">
            <div>
              <div className="join join-vertical w-full">
                <label htmlFor="title" className="join-item label">
                  <span className="label-text font-lobster text-xl  text-accent">
                    Titre
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={fields.title}
                  onChange={handleFields}
                  className="join-item input input-accent font-poppins  text-accent"
                  required
                  minLength="4"
                  maxLength="50"
                />
              </div>
              <div className="join join-vertical w-full">
                <label htmlFor="content" className="join-item label">
                  <span className="label-text font-lobster text-xl  text-accent">
                    Message
                  </span>
                </label>
                <textarea
                  type="text"
                  name="content"
                  id="content"
                  value={fields.content}
                  onChange={handleFields}
                  className="join-item textarea textarea-accent font-poppins  text-accent"
                  required
                  minLength="10"
                  maxLength="250"
                />
              </div>
            </div>
            <div className="flex justify-between">
              {postModalOpen && (
                <button
                  type="button"
                  className="btn btn-accent text-lg font-poppins text-secondary"
                  onClick={() => setPostModalOpen(!postModalOpen)}
                >
                  FERMER
                </button>
              )}
              <button
                type="submit"
                className="btn btn-secondary text-lg font-poppins text-accent"
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
NewPost.propTypes = {
  modification: PropTypes.bool.isRequired,
  setModification: PropTypes.func.isRequired,
  postModalOpen: PropTypes.bool,
  setPostModalOpen: PropTypes.func,
};

NewPost.defaultProps = {
  postModalOpen: undefined,
  setPostModalOpen: undefined,
};

export default NewPost;
