import React from "react";
import { getCharacter } from "../requests";
import { Typography, Row, Col, Divider, Table } from "antd";
import { updateCharacter } from "../requests";
import { MinTable } from "./stories/character.view";

const { Title, Paragraph, Text } = Typography;

export default class CharacterView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: window.location.pathname.slice(11),
      character: [],
      race: [],
      class: []
    };
  }

  componentWillUnmount() {
    updateCharacter(this.state.character);
  }

  componentDidMount() {
    getCharacter(this.state.id).then(data => {
      this.setState({
        character: data,
        race: data.race,
        class: data.character_class,
        alignment: data.alignment,
        background: data.background,
        traits: data.traits,
        ideals: data.ideals,
        bonds: data.bonds,
        flaws: data.flaws
      });
    });
  }

  onChange = str => {
    this.state.character.background = str;
    this.setState({ background: str });
  };

  render() {
    return (
      <div>
        <Row gutter={20}>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={16}
            xl={16}
            style={{ textAlign: "left" }}
          >
            <Text type="secondary">
              {this.state.race + " "}{this.state.class}
              <Divider type={"vertical"} />
              {this.state.alignment}
            </Text>
            <Title style={{ marginTop: "0" }}>
              {this.state.character.name}({this.state.character.age})
            </Title>
            <Title level={3}>Background</Title>
            <Paragraph
              style={{ textAlign: "left" }}
              editable={{ onChange: this.onChange }}
            >
              {this.state.character.background || <b>Start Writing! </b>}
            </Paragraph>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <MinTable title="Trait" data={this.state.traits} />
              <Divider />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>              <MinTable title="Ideal" data={this.state.ideals} />
              <Divider />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>              <MinTable title="Bond" data={this.state.bonds} />
              <Divider />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>              <MinTable title="Flaw" data={this.state.flaws} />
              <Divider />
            </Col>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            
          </Col>
        </Row>
      </div>
    );
  }
}
