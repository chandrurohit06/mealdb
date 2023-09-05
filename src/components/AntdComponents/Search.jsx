import React from 'react';
import { Row, Col, Input } from 'antd';

//antd search input
function Search({onSearch,searchTerm,onChange}) {
  return (
    <div style={{ padding: '20px' }}>
      <Row justify="center">
        <Col span={8}>
          <Input.Search
            value={searchTerm}
            placeholder="Search Meals..."
            enterButton="Search"
            size="large"
            onChange={onChange}
            onSearch={onSearch}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Search;
