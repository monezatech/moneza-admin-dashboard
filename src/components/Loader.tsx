import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[100px]">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
