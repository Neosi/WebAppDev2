import React from "react";
import { Row, Col, Typography, Input, Table, Button } from "antd";
import {
  createTrait,
  removeTrait,
  getTraits,
  createIdeal,
  removeIdeal,
  getIdeals,
  createBond,
  removeBond,
  getBonds,
  createFlaw,
  removeFlaw,
  getFlaws
} from "../requests";

const { Title, Text } = Typography;
const { TextArea } = Input;

export default class Personality extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      traits: [],
      ideals: [],
      bonds: [],
      flaws: [],
      trait: "",
      bond: "",
      flaw: "",
      ideal: ""
    };
  }

  componentDidMount() {
    this.init();
  }
  init() {
    getTraits().then(data => {
      this.setState({ traits: data });
    });
    getBonds().then(data => {
      this.setState({ bonds: data });
    });
    getIdeals().then(data => {
      this.setState({ ideals: data });
    });
    getFlaws().then(data => {
      this.setState({ flaws: data });
    });
  }

  async addTrait(description) {
    await createTrait(description);
    this.init();
  }
  async addIdeal(description) {
    await createIdeal(description);
    this.init();
  }
  async addFlaw(description) {
    await createFlaw(description);
    this.init();
  }
  async addBond(description) {
    await createBond(description);
    this.init();
  }
  async removeTrait(id) {
    await removeTrait(id);
    this.init();
  }
  async removeIdeal(id) {
    await removeIdeal(id);
    this.init();
  }
  async removeFlaw(id) {
    await removeFlaw(id);
    this.init();
  }
  async removeBond(id) {
    await removeBond(id);
    this.init();
  }

  render() {
    return (
      <div>
        <Row>
          <Title>Personality</Title>
        </Row>
        <Row>
          <Col span={12} className="personality-column">
            <Title level={3}>Traits</Title>
            <Traits traits={this.state.traits} />
            <TextArea
              onChange={data => this.setState({ trait: data.target.value })}
            />
            <Button onClick={() => this.addTrait(this.state.trait)}>
              Add Trait
            </Button>
          </Col>
          <Col span={12} className="personality-column">
            <Title level={3}>Ideals</Title>
            <Ideals ideals={this.state.ideals} />
            <TextArea
              onChange={data => this.setState({ ideal: data.target.value })}
            />
            <Button onClick={() => this.addIdeal(this.state.ideal)}>
              Add Ideal
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="personality-column">
            <Title level={3}>Bonds</Title>
            <Bonds bonds={this.state.bonds} />
            <TextArea
              onChange={data => this.setState({ bond: data.target.value })}
            />
            <Button onClick={() => this.addBond(this.state.bond)}>
              Add Bond
            </Button>
          </Col>
          <Col span={12} className="personality-column">
            <Title level={3}>Flaws</Title>
            <Flaws flaws={this.state.flaws} />
            <TextArea
              onChange={data => this.setState({ flaw: data.target.value })}
            />
            <Button onClick={() => this.addFlaw(this.state.flaw)}>
              Add Flaw
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  }
];

const Traits = props => {
  return <Table columns={columns} dataSource={props.traits}></Table>;
};
const Ideals = props => {
  return <Table columns={columns} dataSource={props.ideals}></Table>;
};
const Bonds = props => {
  return <Table columns={columns} dataSource={props.bonds}></Table>;
};
const Flaws = props => {
  return <Table columns={columns} dataSource={props.flaws}></Table>;
};
