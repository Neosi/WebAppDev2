import React from "react";
import { Row, Col, Typography, Icon, Select, Input } from "antd";
import { storiesOf } from '@storybook/react';

const { Title, Paragraph } = Typography;
const { Option } = Select;

export const PersonalitySection = props => {
  return (
    <div>
      <Row>
        <Col span={22}>
          <Title level={3}>{props.title}</Title>
        </Col>
        <Col span={2}>
          <Title level={4}>
            <Icon type="reload" onClick={() => props.refresh()} />
          </Title>
        </Col>
      </Row>
      {props.data.map(c => (
        <Paragraph key={c.id}>{c.description}</Paragraph>
      ))}
    </div>
  );
};

