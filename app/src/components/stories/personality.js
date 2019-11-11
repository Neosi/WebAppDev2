import React from "react";
import {
  Col,
  Typography,
  Button,
  Input,
  Table,
  Divider,
  Popconfirm
} from "antd";

export default { title: "Personality" };

const { TextArea } = Input;
const { Title } = Typography;

export const PersonalityColumn = props => {
  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Actions",
      width: 86,
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Popconfirm
            title={`Are you sure you want to delete this ${props.title}`}
            onConfirm={() => props.delete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </span>
      )
    }
  ];
  var input;
  return (
    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
      <Title level={3}>{props.title}</Title>
      <Table
        rowKey="id"
        bordered
        columns={columns}
        dataSource={props.data}
        pagination={{ pageSize: 6 }}
      />
      <TextArea
        onPressEnter={() => props.submit(input)}
        autoSize
        style={{ textAlign: "left", width: "80%" }}
        onChange={data => (input = data.target.value)}
      />

      <Button
        style={{ width: "20%" }}
        block
        onClick={() => props.submit(input)}
      >
        Add {props.title}
      </Button>
    </Col>
  );
};
