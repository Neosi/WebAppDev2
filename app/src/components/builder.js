import React from "react";
import {
  Button,
  Typography,
  Row,
  Col,
  Input,
  Form,
  Divider,
  Select,
  Tag
} from "antd";
import {
  getRaces,
  getClasses,
  getAlignments,
  getRandomIdeal,
  getRandomBond,
  getRandomFlaw,
  getRandomTrait,
  createCharacter
} from "../requests";
import { PersonalitySection } from "./stories/builder";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

class Builder extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      name: "",
      races: [],
      classes: [],
      alignments: [],
      ideals: [],
      bonds: [],
      flaws: [],
      traits: [],
      raceSelect: [],
      classSelect: []
    };
  }

  create(values) {
    createCharacter(values);
  }

  componentDidMount() {
    getRaces().then(data => {
      this.setState({ races: data });
    });
    getClasses().then(data => {
      this.setState({ classes: data });
    });
    this.refreshTraits();
    this.refreshIdeals();
    this.refreshBonds();
    this.refreshFlaws();
    getAlignments().then(data => {
      this.setState({ alignments: data });
    });
  }
  handleSubmit = data => {
    data.preventDefault();
    let tlist = [];
    this.state.traits.map(t => {
      console.log("TRAIT" + t.id)
      tlist.push(t.id);
    });
    let ilist = [];
    this.state.ideals.map(t => {
      console.log("Ideal" + t.id)

      ilist.push(t.id);
    });
    let blist = [];
    this.state.bonds.map(t => {
      console.log("BOND" + t.id)

      blist.push(t.id);
    });
    let flist = [];
    this.state.flaws.map(t => {
      console.log("FLAW" + t.id)

      flist.push(t.id);
    });
    this.props.form.setFieldsValue({
      race: this.state.raceSelect.id,
      character_class: this.state.classSelect.id,
      traits: tlist,
      ideals: ilist,
      bonds: blist,
      flaws: flist
    });
    console.log(tlist)

    console.log(this.props.form.getFieldsValue());
    this.props.form.validateFields((err, values) => {
      if (!err) {
        createCharacter(values);
        console.log("Received values of form: ", values);
      }
    });
    this.props.form.resetFields();
  };

  async handleRaceChange(value) {
    const { setFieldsValue } = this.props.form;
    await setFieldsValue({
      race: value.name
    });
    this.setState({ raceSelect: value });
  }

  async handleClassChange(value) {
    const { setFieldsValue } = this.props.form;
    await setFieldsValue({
      character_class: value.name
    });
    this.setState({ classSelect: value });
  }

  refreshTraits() {
    getRandomTrait().then(data => {
      this.setState({ traits: data });
    });
  }
  refreshIdeals() {
    getRandomIdeal().then(data => {
      this.setState({ ideals: data });
    });
  }
  refreshBonds() {
    getRandomBond().then(data => {
      this.setState({ bonds: data });
    });
  }
  refreshFlaws() {
    getRandomFlaw().then(data => {
      this.setState({ flaws: data });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Title>Character Builder</Title>
        <Row gutter={40}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Row>
              <Title level={3}>General</Title>
            </Row>
            <Row>
              <Col span={24}>
                <Title level={4}>Name</Title>
                <Form.Item>
                  {getFieldDecorator("name", {})(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={8}>
                <Title level={4}>Age</Title>
                <Form.Item>{getFieldDecorator("age", {})(<Input />)}</Form.Item>
              </Col>
              <Col span={16}>
                <Title level={4}>Alignment</Title>
                <Form.Item>
                  {getFieldDecorator("alignment")(
                    <Select
                      showSearch
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.state.alignments.map(c => (
                        <Option key={c.id}>{c.name}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row gutter={20}>
              <Col span={12}>
                <Title level={3}>Race</Title>
                <Form.Item>
                  {getFieldDecorator("race")(
                    <Select
                      showArrow={false}
                      showSearch
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.state.races.map(c => (
                        <Option onClick={() => this.handleRaceChange(c)} key={c.id}>{c.name}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <Divider>race choices</Divider>
                {this.state.races.map(r => (
                  <Tag color={randomColour()} onClick={() => this.handleRaceChange(r)}>
                    {r.name}
                  </Tag>
                ))}
              </Col>
              <Col span={12}>
                <Title level={3}>Class</Title>
                <Form.Item>
                  {getFieldDecorator("character_class")(
                    <Select
                      showArrow={false}
                      showSearch
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {this.state.classes.map(c => (
                        <Option onClick={() => this.handleClassChange(c)} key={c.id}>{c.name}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <Divider>class choices</Divider>
                {this.state.classes.map(r => (
                  <Tag color={randomColour()} onClick={() => this.handleClassChange(r)}>
                    {r.name}
                  </Tag>
                ))}
              </Col>
            </Row>
            <Divider />
            <Row>
              <Title level={3}>Background</Title>
              <Form.Item>
                {getFieldDecorator("background")(
                  <TextArea />
                )}
              </Form.Item>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Title level={3}>Personality</Title>
            <PersonalitySection
              title="Traits"
              refresh={() => this.refreshTraits()}
              data={this.state.traits}
            />
            {getFieldDecorator("traits")}
            <PersonalitySection
              title="Ideals"
              refresh={() => this.refreshIdeals()}
              data={this.state.ideals}
            />
            {getFieldDecorator("ideals")}
            <PersonalitySection
              title="Bonds"
              refresh={() => this.refreshBonds()}
              data={this.state.bonds}
            />
            {getFieldDecorator("bonds")}
            <PersonalitySection
              title="Flaws"
              refresh={() => this.refreshFlaws()}
              data={this.state.flaws}
            />
            {getFieldDecorator("flaws")}
            <Title level={3}>Tags</Title>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Character
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const WrappedBuilder = Form.create({ name: "character_form" })(Builder);

function randomColour() {
  let string = [
    "red",
    "blue",
    "lime",
    "geekblue",
    "green",
    "orange",
    "magenta",
    "volcano",
    "gold",
    "purple",
    "cyan"
  ]
  return string[Math.floor(Math.random() * string.length)];
}
