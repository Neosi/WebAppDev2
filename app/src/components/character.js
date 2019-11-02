import React from "react";
import {
  Table,
  Divider,
  Icon,
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography
} from "antd";
import { createCharacter, removeCharacter, getCharacters } from "../API";
export default { title: "Characters" };

const { Title } = Typography;

export class CharacterPage extends React.PureComponent {
  constructor() {
    super();
    this.state = { characters: [], hasData: false };
  }

  componentDidMount() {
    getCharacters.bind(this)();
  }

  init() {
    getCharacters.bind(this)();
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <WrappedCreateCharacterForm create={createCharacter.bind(this)} />
          </Col>
          <Col span={12}>
            <CharacterStats />
          </Col>
        </Row>
        <CharacterTable
          characters={this.state.characters}
          hasData={this.state.hasData}
          remove={removeCharacter.bind(this)}
        />
      </div>
    );
  }
}

class CharacterTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: []
    };
  }

  onSelectChange = selectedRowKeys => {
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

const CharacterStats = () => (
  <div>
    <Title level={4}>Charcter stats</Title>
  </div>
);

class CreateCharacterForm extends React.PureComponent {
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
            rules: [{ required: true, message: "Input character name!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Name"
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

export const WrappedCreateCharacterForm = Form.create({
  name: "create-character"
})(CreateCharacterForm);
