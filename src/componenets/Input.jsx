import React from "react";

import {Form} from "react-bootstrap";

const Input = (props) => {
  return (
    <Form.Group className="mb-3" controlId={props.controlId}>
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        name={props.type}
        onChange={props.onChange}
        value={props.value}
        required
      />
    </Form.Group>
  );
};

export default Input;
