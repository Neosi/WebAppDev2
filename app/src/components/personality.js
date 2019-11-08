import React from "react";
import { Row, Col, Typography, Input, Table, Button, Divider } from "antd";
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
import { PersonalityColumn } from "./stories/personality";

const { Title } = Typography;

export default class Personality extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      traits: [],
      ideals: [],
      bonds: [],
      flaws: [],
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
        <Row type="flex" gutter={[16, 16]}>
          <PersonalityColumn
            title="Trait"
            data={this.state.traits}
            submit={data => this.addTrait(data)}
            delete={id => this.removeTrait(id)}
          />
          <PersonalityColumn
            title="Ideal"
            data={this.state.ideals}
            submit={data => this.addIdeal(data)}
            delete={id => this.removeIdeal(id)}
          />
        </Row>
        <Row type="flex" gutter={[16, 16]}>
          <PersonalityColumn
            title="Bond"
            data={this.state.bonds}
            submit={data => this.addBond(data)}
            delete={id => this.removeBond(id)}
          />

          <PersonalityColumn
            title="Flaw"
            data={this.state.flaws}
            submit={data => this.addFlaw(data)}
            delete={id => this.removeFlaw(id)}
          />
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
