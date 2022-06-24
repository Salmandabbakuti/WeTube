//Background.js
import React from "react";

const Background = ({ children }) => {
  return (
    <div className="bg-white dark:bg-backgroundBlack  transition-all">
      {children}
    </div>
  );
};

export default Background;
