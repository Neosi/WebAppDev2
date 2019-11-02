import React from "react";
import { Table, Divider, Icon, Form, Input, Button } from "antd";
import { removeRace, createRace, getRaces } from "../API";

export default class RacePage extends React.PureComponent {
  constructor() {
    super();
    this.state = { races: [], hasData: false };
  }

  componentDidMount() {
    getRaces.bind(this)();
  }

  init() {
    getRaces.bind(this)();
  }

  render() {
    return (
      <div>
        <WrappedRaceForm create={createRace.bind(this)} />
        <RaceTable
          races={this.state.races}
          hasData={this.state.hasData}
          remove={removeRace.bind(this)}
        ></RaceTable>
      </div>
    );
  }
}

class RaceTable extends React.PureComponent {
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
        dataSource={this.props.races}
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
            rules: [{ required: true, message: "Input race name!" }]
          })(
            <Input
              prefix={<Icon type="team" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Race"
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
const WrappedRaceForm = Form.create({
  name: "create-race"
})(RaceForm);
