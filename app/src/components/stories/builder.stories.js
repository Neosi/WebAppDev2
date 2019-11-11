import React from 'react';
import { storiesOf } from '@storybook/react';
import { PersonalitySection } from './builder';

export default {title: "Builder"}

storiesOf("PersonalitySection", module)
  .add("Trait", () => <PersonalitySection title="Trait" data={data} />)

const data = [{ id: "1", description: "TestData" }];