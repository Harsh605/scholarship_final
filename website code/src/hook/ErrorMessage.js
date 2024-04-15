import React from "react";

const ErrorMessage = ({ message }) => {
  return <div className="mt-3 text-xs leading-3 " style={{ color: 'red'}}>{message}</div>;
};

export default ErrorMessage;
