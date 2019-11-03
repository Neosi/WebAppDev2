import React from "react";
import { Table, Divider, Icon, Form, Input, Button } from "antd";
import { removeClass, createClass, getClasses } from "../requests";

export default class ClassPage extends React.PureComponent {
  constructor() {
    super();
    this.state = { classes: [], hasData: false };
  }

  componentDidMount() {
    getClasses.bind(this)();
  }

  init() {
    getClasses.bind(this)();
  }

  render() {
    return (
      <div>
        <WrappedClassForm create={createClass.bind(this)} />
        <ClassTable
          classes={this.state.classes}
          hasData={this.state.hasData}
          remove={removeClass.bind(this)}
        ></ClassTable>
      </div>
    );
  }
}

class ClassTable extends React.PureComponent {
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: (text, record) => (
          <span>
            <a>View</a>
            <Divider type="vertical" />
            <a onClick={() => this.props.remove(record.id)}>Delete</a>
            <Divider type="vertical" />
            <a className="ant-dropdown-link">
              More actions <Icon type="down" />
            </a>
          </span>
        )
      }
    ];
    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={this.props.classes}
        hasData={this.props.hasData}
      />
    );
  }
}

class RaceForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.create(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} layout="inline">
        <Form.Item>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Input class name!" }]
          })(
            <Input
              prefix={<Icon type="team" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Class"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Quick Add
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedClassForm = Form.create({
  name: "create-race"
})(RaceForm);
