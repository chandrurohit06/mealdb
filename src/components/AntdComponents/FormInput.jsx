import React from "react";
import { Button, Modal, Form, Input } from "antd";

//form input

const FormInput = ({
  label,
  name,
  rules,
  type,
  value,
  onChange,
  min,
  max,
  isContact,
}) => {
  const contactPattern = /^[0-9]{10}$/;
  return (
    <Form.Item
      label={label}
      name={name}
      rules={
        isContact
          ? [
              {
                required: true,
                message: `${label} is required`,
              },
              {
                pattern: contactPattern,
                message: "Please enter a 10-digit number.!",
              },
            ]
          : [
              {
                required: true,
                message: `${label} is required`,
              },
              {
                min: min,
                message: `${label} must be at least ${min} characters long!`,
              },
            ]
      }
    >
      <Input
        style={{ height: name === "address" && "100px" }}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
      />
    </Form.Item>
  );
};

export default FormInput;
