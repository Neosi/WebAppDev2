import React from 'react';
import { Button, Typography, Row, Col, Input, Form } from 'antd';
import { getRaces, getClasses } from '../requests';

const { Title, Text } = Typography;
const { Search } = Input;

export default class Builder extends React.Component {
  constructor() {
    super();
    this.state = { name: "", races: [], classes: [], alignment: [], ideals: [], bonds: [], flaws: [], traits: [] };
  }
  componentDidMount() {
    getRaces().then(data => {
      this.setState({ races: data });
    })
    getClasses().then(data => {
      this.setState({ classes: data });
    })
  }
  handleSubmit = (data) => {

  }
  changeName = (data) => {
    console.log(data.target.value);
    this.setState({ name: data.target.value })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
    };
    return (
      <div>
        <Row><Title>Character Builder</Title></Row>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Row>
            <Col span={12}>
              <Row>
                <Title level={3}>General</Title>
                <Form.Item {...formItemLayout} label="Name">
                  <Input></Input>
                </Form.Item>
                <Form.Item {...formItemLayout} label="Age">
                  <Input></Input>
                </Form.Item>
                <Form.Item {...formItemLayout} label="Gender">
                  <Input></Input>
                </Form.Item>
                <Input addonBefore="Name:" onChange={this.changeName} />
                <Input addonBefore="Age:" />
                <Input addonBefore="Gender:" />
                {this.state.name}
              </Row>
              <Row>
                <Title level={3}>Race</Title>
              </Row>
              <Row>
                {this.state.races.map(r => <Button>{r.name}</Button>)}
              </Row>
              <Row>
                <Title level={3}>Class</Title>
              </Row>
              <Row>
                {this.state.classes.map(c => <Button>{c.name}</Button>)}
              </Row>
            </Col>
            <Col span={12}>
              <Title level={3}>Personality</Title>
              <Title level={3}>Tags</Title>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "14pc" }}
            >
              Quick Add
              </Button>
          </Form.Item>
        </Form>

      </div>
    );
  }
}