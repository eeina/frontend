import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full space-x-2 my-5">
      <span className="w-3 h-3 rounded-full bg-green-300-300 animate-pulse"></span>
      <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse [animation-delay:-0.2s]"></span>
      <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse [animation-delay:-0.4s]"></span>
      <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse [animation-delay:-0.6s]"></span>
      <span className="w-3 h-3 rounded-full bg-green-300 animate-pulse [animation-delay:-0.8s]"></span>
    </div>
  );
};

export default Loader;
