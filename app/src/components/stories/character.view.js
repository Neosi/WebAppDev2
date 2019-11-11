import React from "react";
import { Table } from "antd";

export const MinTable = props => {
  let columns = [
    { title: props.title, dataIndex: "description", key: "description" }
  ];
  return (
    <Table rowKey="id" size="small" columns={columns} pagination={false} dataSource={props.data}></Table>
  );
};
