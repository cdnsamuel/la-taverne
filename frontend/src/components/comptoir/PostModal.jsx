import PropTypes from "prop-types";
import NewPost from "./NewPost";

function PostModal({
  modification,
  setModification,
  postModalOpen,
  setPostModalOpen,
}) {
  return (
    <div className="fixed inset-0 bg-base-200 bg-opacity-70 flex justify-center items-center">
      <div className="bg-base-100 m-2 py-3 rounded-xl">
        <NewPost
          modification={modification}
          setModification={setModification}
          postModalOpen={postModalOpen}
          setPostModalOpen={setPostModalOpen}
        />
      </div>
    </div>
  );
}

PostModal.propTypes = {
  modification: PropTypes.bool.isRequired,
  setModification: PropTypes.func.isRequired,
  postModalOpen: PropTypes.bool,
  setPostModalOpen: PropTypes.func,
};

PostModal.defaultProps = {
  postModalOpen: undefined,
  setPostModalOpen: undefined,
};

export default PostModal;
