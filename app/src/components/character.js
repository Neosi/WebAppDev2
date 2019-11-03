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
  AutoComplete,
  Popconfirm,
  message
} from "antd";
import {
  createCharacter,
  removeCharacter,
  getCharacters,
  getRaces,
  getClasses
} from "../requests";
import _default from "antd/lib/date-picker";
export default { title: "Characters" };

const { Title } = Typography;

export class CharacterPage extends React.PureComponent {
  constructor() {
    super();
    this.state = { characters: [], races: [], classes: [], hasData: false };
  }

  componentDidMount() {
    getCharacters().then(data => {
      this.setState({ characters: data, hasData: true });
    });
    getRaces().then(data => {
      toDict(data);
      this.setState({ races: data });
    });
    getClasses().then(data => {
      console.log(toDict(data));
      console.log(data);
      console.log(JSON.stringify(data));
      this.setState({ classes: data });
    });
  }

  init() {
    getCharacters().then(data => {
      this.setState({ characters: data });
    });
  }

  async create(data) {
    console.log(data);
    var r;
    for (r in this.state.races) {
      if (getKeyByValue(this.state.races[r], data.race) != null) {
        data.race = this.state.races[r].id;
        break;
      }
    }
    var c;
    for (c in this.state.classes) {
      console.log(data.class);
      if (getKeyByValue(this.state.classes[c], data.character_class) != null) {
        data.character_class = this.state.classes[c].id;
        break;
      }
    }
    await createCharacter(data).then(() => {
      this.init();
    });
  }

  async remove(id) {
    await removeCharacter(id).then(() => {
      message.success("Removed character");
      this.init();
    });
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <WrapFullForm
              races={toDict(this.state.races)}
              classes={toDict(this.state.classes)}
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

function toDict(props) {
  var data = [];
  var p;
  for (p in props) {
    data.push(props[p].name);
  }
  return data;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
function cancel(e) {
  console.log(e);
  message.error("Cancelled");
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
            <Popconfirm
              title="Are you sure delete this character?"
              onConfirm={() => this.props.remove(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              Delete
            </Popconfirm>
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
              {getFieldDecorator("character_class")(
                <AutoComplete
                  style={{ left: 0 }}
                  dataSource={this.props.classes}
                  placeholder={this.props.placeholder}
                  filterOption={matchText}
                />
              )}
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
