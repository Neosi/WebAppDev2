import React from "react";
import { getCharacter } from "../requests";
import { Typography, Row, Col } from "antd";

const { Title, Paragraph } = Typography;

export default class CharacterView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: window.location.pathname.slice(11),
      character: {},
      race: {},
      class: {}
    };
  }

  async componentWillMount() {
    await getCharacter(this.state.id).then(data => {
      console.log(data.character_class.name);
      this.setState({
        character: data,
        race: data.race,
        class: data.character_class
      });
    });
    console.log(this.state.character);
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={10}>
            <Title style={{ textAlign: "left" }}>
              {this.state.character.name}
            </Title>
          </Col>
          <Col span={14}>
            <Title level={4} type="secondary">
              Race: {this.state.race.name} 
            </Title>
            <Title level={4} type="secondary">
              Class: {this.state.class.name} 
            </Title>
            <Title level={4} type="secondary">
              Age: {this.state.character.age}
            </Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Paragraph style={{ textAlign: "left" }} editable >
              <b>Start Writing! </b>
              {this.state.character.background}
            </Paragraph>
          </Col>
        </Row>
      </div>
    );
  }
}
