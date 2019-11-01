import React from "react";
import { Table, Divider, Icon, Form, Input, Button, Row, Col } from "antd";
import axios from "axios";
export default { title: "Characters" };

function createCharacter(values) {
  axios.post("http://127.0.0.1:5000/add-character", values);
}
function removeCharacter(id) {
  axios.post("http://127.0.0.1:5000/remove-character", { id });
}
export class CharacterPage extends React.PureComponent {
  constructor() {
    super();
    this.state = { characters: [], hasData: false };
  }

  componentDidMount() {
    this.init();
  }
  init = () => {
    axios
      .get("http://127.0.0.1:5000/get-characters")
      .then(response => {
        this.setState({ characters: response.data, hasData: true });
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <WrappedCreateCharacterForm init={this.init} />
          </Col>
          <Col span={12}>
            <CharacterStats />
          </Col>
        </Row>
        <Button onClick={this.init}>REFRESH</Button>
        <CharacterTable
          characters={this.state.characters}
          hasData={this.state.hasData}
        />
      </div>
    );
  }
}

export class CharacterTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: []
    };
  }

  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Class",
        dataIndex: "character_class",
        key: "character_class"
      },
      {
        title: "Race",
        dataIndex: "race",
        key: "race"
      },
      {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: (text, record) => (
          <span>
            <a>View</a>
            <Divider type="vertical" />
            <a onClick={() => removeCharacter(record.id)}>Delete</a>
            <Divider type="vertical" />
            <a className="ant-dropdown-link">
              More actions <Icon type="down" />
            </a>
          </span>
        )
      }
    ];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true
    };
    return (
      <Table
        loading={!this.props.hasData}
        rowSelection={rowSelection}
        rowKey="id"
        dataSource={this.props.characters}
        columns={columns}
        expandedRowRender={record => (
          <div>
            Allignment: {record.allignment}
            <Divider type="vertical" />
            Age: {record.age}
            <Divider type="vertical" />
            Background:{record.background}
            <Divider type="vertical" />
            Appearance: {record.appearance}
          </div>
        )}
      />
    );
  }
}

const CharacterStats = () => <div>Charcter stats</div>;

class CreateCharacterForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        createCharacter(values);
        this.props.init.bind(this);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" layout="inline">
        <Form.Item>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="create-character-button"
          >
            Create Character
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const WrappedCreateCharacterForm = Form.create({
  name: "create-character"
})(CreateCharacterForm);
