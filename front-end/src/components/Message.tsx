import React from "react";
import { Alert } from "react-bootstrap";

const Message: React.FC = ({ children }) => {
   return <Alert variant="danger">{children}</Alert>;
};

export default Message;
