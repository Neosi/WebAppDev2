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
  Typography,
  AutoComplete
} from "antd";
import {
  createCharacter,
  removeCharacter,
  getCharacters,
  getRaceNames,
  getRace
} from "../requests";
import _default from "antd/lib/date-picker";
export default { title: "Characters" };

const { Title } = Typography;

export class CharacterPage extends React.PureComponent {
  constructor() {
    super();
    this.state = { characters: [], races: [], hasData: false };
  }

  componentDidMount() {
    getCharacters().then(data => {
      this.setState({ characters: data, hasData: true });
    });
    getRaceNames().then(data => {
      this.setState({ races: data });
    });
  }

  init() {
    getCharacters().then(data => {
      this.setState({ characters: data });
    });
  }

  async create(data) {
    await createCharacter(data).then(() => {
      this.init();
    });
  }

  async remove(id) {
    await removeCharacter(id).then(() => {
      this.init();
    });
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <WrapFullForm
              races={this.state.races}
              create={data => this.create(data)}
            />
          </Col>
        </Row>
        <CharacterTable
          characters={this.state.characters}
          hasData={this.state.hasData}
          remove={id => this.remove(id)}
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

const matchText = (inputValue, option) =>
  option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

class FullForm extends React.PureComponent {
  constructor(props) {
    super(props);
  }

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
        <Row>
          <Col span={12} style={{ left: 0 }}>
            <Form.Item label="Name">
              {getFieldDecorator("name")(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12} style={{ left: 0 }}>
            <Form.Item label="Age">
              {getFieldDecorator("age")(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ left: 0 }}>
            <Form.Item label="Class">
              {getFieldDecorator("character-class")(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12} style={{ left: 0 }}>
            <Form.Item label="Race">
              {getFieldDecorator("race")(
                <AutoComplete
                  style={{ left: 0 }}
                  dataSource={this.props.races}
                  placeholder={this.props.placeholder}
                  filterOption={matchText}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} />
          <Col span={12}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "14pc" }}
              >
                Quick Add
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export const WrapFullForm = Form.create({
  name: "create-character"
})(FullForm);
