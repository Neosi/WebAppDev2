import React from "react";
import { storiesOf } from "@storybook/react";
import { MinColumn } from './character.view'

export default {title: "view"}

storiesOf("MinTable", module)
  .add("Trait", () => <MinColumn title="Trait" data={data} />)

const data = [{ id: "1", description: "TestData" }];