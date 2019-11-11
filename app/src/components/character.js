import React from "react";
import {
  Table,
  Divider,
  Icon,
  Select,
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Tag,
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
import { Link } from "react-router-dom";
export default { title: "Characters" };

const { Title, Text } = Typography;
const { Option } = Select;

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
      this.setState({ races: data });
    });
    getClasses().then(data => {
      console.log(data);
      this.setState({ classes: data });
      const test = data.map(clas => ({
        text: `${clas.name}`,
        value: clas.id
      }));
      console.log(test);
    });
  }

  init() {
    getCharacters().then(data => {
      this.setState({ characters: data });
    });
  }

  async create(data) {
    console.log("RACE " + data.race);

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
              races={this.state.races}
              classes={this.state.classes}
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
            <Link to={"/character/" + record.id}>View</Link>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure delete this character?"
              onConfirm={() => this.props.remove(record.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a>Delete</a>
            </Popconfirm>
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
            <Row>
              <Col>
                <Text ellipsis>Age: {record.age}</Text>
                <Divider type="vertical" />
                <Text ellipsis>Allignment: {record.alignment}</Text>
                <Divider type="vertical" />
                <Text ellipsis>Background: {record.background}</Text>
              </Col>
            </Row>
          </div>
        )}
      />
    );
  }
}

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
                <Select showSearch style={{ minWidth: 180 }}>
                  {this.props.classes.map(c => (
                    <Option style={{ width: "100%" }} key={c.id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12} style={{ left: 0 }}>
            <Form.Item label="Race">
              {getFieldDecorator("race")(
                <Select showSearch style={{ minWidth: 180 }}>
                  {this.props.races.map(c => (
                    <Option style={{ width: "100%" }} key={c.id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
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
