import React from "react";
import { Alert } from "react-bootstrap";

function Message({ message }) {
   return <Alert variant="danger">{message}</Alert>;
}

export default Message;
