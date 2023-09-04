import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

import { message } from 'antd';

export const Popupmodal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNo: "",
    state: "",
    city: "",
  });
  const navigate = useNavigate();
  let isValid = false;

  const validateUsername = (rule, value) => {
    const contactPattern = /^[0-9]{10}$/;
    if (!value) {
      isValid = false;
      return Promise.reject(`name is required`);
    } else if (rule?.field === "fullName" || rule?.field === "address") {
      isValid = false;
      if (value?.length < 5) {
        return Promise.reject(`name must be at least 5 characters long`);
      }
    } else if (rule?.field === "mobileNo") {
      if (!contactPattern.test(value)) {
        isValid = false;
        return Promise.reject(`Please enter a 10-digit number.`);
      }
    } else {
      return Promise.resolve();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const closeData = () => {
    setFormData({});
  };
  // Handle form submission here
  const handleSubmit = async (values) => {
    await form.validateFields();
    let checkErr = form.getFieldsError();

    if (checkErr.some((data) => !data?.errors?.length)) {
      messageApi.open({
        type: 'success',
        content: 'Thank you for providing your shipping information',
        duration: 3,
      });
      setTimeout(()=>{
        navigate("/meal/delivered", { state: { formData } });
      },3000)
    
    }
  };
  console.log(formData);

  return (
    <>
     {contextHolder}
      <Modal
        open={visible}
        title="Shipping Address"
        okText="Submit"
        cancelText="Cancel"
        style={{
          top: 20,
        }}
        onCancel={() => {
          onClose();
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              onClose();
              form.resetFields();
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            // loading={postData.loading}
            onClick={handleSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          // onFinish={handleSubmit}
          layout="vertical"
          name="form_in_modal"
        >
          {/* validator: (_, value) => validateUsername(_, value,), */}
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "full Name is required",
              },
            ]}
          >
            <Input
              type="text"
              value={formData?.fullName}
              name="fullName"
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Mobile No."
            name="mobileNo"
            rules={[
              {
                required: true,
                message: "Mobile No. is required",
              },
            ]}
          >
            <Input
              type="number"
              value={formData?.mobileNo}
              name="mobileNo"
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="State"
            name="state"
            rules={[
              {
                required: true,
                message: "State name is required",
              },
            ]}
          >
            <Input
              type="textarea"
              value={formData?.state}
              name="state"
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[
              {
                required: true,
                message: "City Name is required",
              },
            ]}
          >
            <Input
              type="textarea"
              value={formData?.city}
              name="city"
              onChange={handleInputChange}
            />
          </Form.Item>

          <Form.Item
            label="Address(include house No.)"
            name="address"
            rules={[
              {
                required: true,
                message: "Address is required",
              },
            ]}
          >
            <Input
              value={formData?.address}
              type="textarea"
              name="address"
              onChange={handleInputChange}
            />
          </Form.Item>

          {/* {postData.error && (
            <>
              <br />
              <span style={{ color: "red" }}>{postData.data}</span>
            </>
          )} */}
        </Form>
      </Modal>
    </>
  );
};
