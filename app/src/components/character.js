import React from "react";
import { Table, Divider, Icon, Form, Input, Button, Row, Col } from "antd";
import axios from "axios";
export default { title: "Characters" };

export class CharacterPage extends React.PureComponent {
  constructor() {
    super();
    this.state = { characters: [], hasData: false };
  }

  async removeCharacter(id) {
    await axios.post("http://127.0.0.1:5000/remove-character", { id });
    this.init();
  }

  async createCharacter(name) {
    await axios.post("http://127.0.0.1:5000/add-character", name);
    this.init();
  }
  componentDidMount() {
    this.init();
  }
  init() {
    axios
      .get("http://127.0.0.1:5000/get-characters")
      .then(response => {
        this.setState({ characters: response.data, hasData: true });
        console.log("SETTING STATE" + JSON.stringify(response.data));
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <WrappedCreateCharacterForm
              init={this.createCharacter.bind(this)}
            />
          </Col>
          <Col span={12}>
            <CharacterStats />
          </Col>
        </Row>
        <CharacterTable
          characters={this.state.characters}
          hasData={this.state.hasData}
          remove={this.removeCharacter.bind(this)}
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
            <a onClick={() => this.props.remove(record.id)}>Delete</a>
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
        this.props.init(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        onSubmit={this.handleSubmit}
        className="character-form"
        layout="inline"
      >
        <Form.Item>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Input character name!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Name"
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
