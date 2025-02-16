import React from "react";

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    >
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;