import React from "react";

export const NoContentFound = (props) => {
  return (
    <div>
      <div className="d-flix justify-content-center">
        <span className="h1">No Content Found</span>
      </div>
    </div>
  );
};

export const ServerError = (props) => {
  return (
    <div>
      <div className="d-flix justify-content-center">
        <span className="h1">Unexpected error occured</span>
      </div>
    </div>
  );
};
