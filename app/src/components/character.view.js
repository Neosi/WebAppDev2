import React from "react";
import { getCharacter } from "../requests";
import { Typography, Row, Col, Divider } from "antd";
import { updateCharacter } from '../requests';

const { Title, Paragraph, Text } = Typography;

export default class CharacterView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: window.location.pathname.slice(11),
      character: [],
      race: [],
      class: [],
    };
  }

  componentWillUnmount(){
    updateCharacter(this.state.character);
  }

  componentDidMount() {
    getCharacter(this.state.id).then(data => {
      console.log(data.race)
      this.setState({
        character: data,
        race: data.race,
        class: data.character_class,
        alignment: data.alignment,
        background: data.background
      });
      console.log(this.state.race)
    });
  }

  onChange = str => {
    this.state.character.background = str;
    this.setState({ background: str });
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={10} style={{ textAlign: "left" }}>
            <Text type="secondary">
              {this.state.race}
              <Divider type={"vertical"} />
              Alignment: {this.state.alignment}
            </Text>
            <Title style={{ marginTop: "0" }}>
              {this.state.character.name}
            </Title>
          </Col>
          <Col span={14}>
            <Row>
              <Text type="secondary">Class: {this.state.class}</Text>
            </Row>
            <Row>
              <Text type="secondary">Age: {this.state.character.age}</Text>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Paragraph
              style={{ textAlign: "left" }}
              editable={{ onChange: this.onChange }}
            >
              {this.state.character.background || <b>Start Writing! </b>}
            </Paragraph>
          </Col>
        </Row>
      </div>
    );
  }
}
