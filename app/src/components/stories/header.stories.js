import React from "react";
import { Heading } from "./header";
import { storiesOf } from "@storybook/react";

export default { title: "Header" };

storiesOf("Heading", module).add("Default", () => (
  <Heading title="Character Builder" />
));
