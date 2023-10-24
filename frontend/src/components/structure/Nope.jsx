import React from "react";

function Nope() {
  return (
    <div className="flex-grow flex flex-col  justify-evenly items-center">
      <div className="bg-secondary p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl text-primary font-lobster">
          Wrong <span className="line-through">hole</span> path ?
        </h1>
      </div>
    </div>
  );
}

export default Nope;
