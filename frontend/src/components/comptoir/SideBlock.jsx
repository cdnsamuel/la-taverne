import PropTypes from "prop-types";

function SideBlock({ title, content }) {
  return (
    <div className="w-full px-3">
      <h3 className="bg-primary w-full text-center p-2 text-2xl text-white font-lobster rounded-t-xl">
        {title}
      </h3>
      <div className=" flex flex-col justify-center p-2 border-x-2 border-b-2 border-accent py-16 rounded-b-xl shadow-lg">
        <p>{content}</p>
      </div>
    </div>
  );
}

SideBlock.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default SideBlock;
