import React from 'react';
import "./NotFound.scss";
import { Button, Result } from 'antd';

//not found component when there is no meals

const NotFound = () => {
  return (
    <Result
    status="404"
    title="404"
    subTitle="Sorry, Meals not found"
   
  />
  )
}

export default NotFound


