import React from "react";
import { Button } from 'antd';

//common button component
export const ButtonVariant = ({ type, click, label }) => {
  return <Button style={{width:"100%"}} onClick={click}  type={type}>{label}</Button>;
};


