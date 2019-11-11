import React from "react";
import {
  Table,
  Divider,
  Icon,
  Form,
  Input,
  Button,
  Popconfirm,
  message
} from "antd";
import { removeRace, createRace, getRaces } from "../requests";

export default class RacePage extends React.PureComponent {
  constructor() {
    super();
    this.state = { races: [], hasData: false };
  }

  componentDidMount() {
    this.init();
  }

  init() {
    getRaces().then(data => {
      this.setState({ races: data });
    });
  }

  async add(name) {
    await createRace(name);
    this.init();
  }
  async remove(id) {
    await removeRace(id);
    this.init();
  }

  render() {
    return (
      <div>
        <WrappedRaceForm create={name => this.add(name)} />
        <RaceTable
          races={this.state.races}
          hasData={this.state.hasData}
          remove={id => this.remove(id)}
        ></RaceTable>
      </div>
    );
  }
}
function cancel(e) {
  console.log(e);
  message.error("Cancelled");
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
            <Popconfirm
              title="Are you sure delete this race?"
              onConfirm={() => this.props.remove(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a>Delete</a>
            </Popconfirm>

            <Divider type="vertical" />
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
