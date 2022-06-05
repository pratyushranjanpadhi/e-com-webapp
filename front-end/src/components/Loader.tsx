import React from "react";
import { Spinner } from "react-bootstrap";

const Loader: React.FC = () => {
   return (
      <Spinner
         animation="border"
         role="status"
         style={{ display: "block", height: "100px", width: "100px", margin: "auto" }}
      >
         <span className="sr-only">Loading...</span>
      </Spinner>
   );
};

export default Loader;
