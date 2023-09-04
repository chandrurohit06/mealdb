import React, { useState } from "react";
//antd
import { Button, Modal, Form, Input,Grid,Col,Row } from "antd";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

//component
import FormInput from "./formInput";

//pop up model for shipping
export const Popupmodal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNo: "",
    state: "",
    city: "",
  });
 
//common onchange function for handling input
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
        type: "success",
        content: "Thank you for providing your shipping information",
        duration: 3,
      });
      setTimeout(() => {
        navigate("/meal/delivered", { state: { formData } });
      }, 3000);
    }
  };
  



  return (
    <>
      {contextHolder}
      <Modal
       width={700}
        open={visible}
        title="Shipping Address"
        okText="Submit"
        cancelText="Cancel"
        style={{
          top: 20,
          width:500
        }}
        onCancel={() => {
          onClose();
        }}
        footer={[
          <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
          <Button
           size="large"
            key="submit"
            type="primary"
            // loading={postData.loading}
            onClick={handleSubmit}
          >
            Purchase
          </Button>
          </div>,
        ]}
      >
        <Form
          form={form}
          // onFinish={handleSubmit}
          layout="vertical"
          name="form_in_modal"
        >
           <Row gutter={30}>
      <Col span={12}>
      <FormInput
            label="Full Name"
            name="fullName"
            type="text"
            value={formData?.fullName}
            onChange={handleInputChange}
            min={5}
          />
            <FormInput
            label="State"
            name="state"
            type="text"
            value={formData?.state}
            onChange={handleInputChange}
          />
      </Col>
      <Col span={12}>
         <FormInput
            label="Mobile No."
            name="mobileNo"
            type="number"
            value={formData?.mobileNo}
            onChange={handleInputChange}
            isContact={true}
          />
            <FormInput
            label="City"
            name="city"
            type="text"
            value={formData?.city}
            onChange={handleInputChange}
          />
      </Col>
         </Row>

         

       
        
        
         <FormInput
            label="Address"
            name="address"
            type="text"
            value={formData?.address}
            onChange={handleInputChange}
            min={5}
          />

         
        </Form>
      </Modal>
    </>
  );
};
