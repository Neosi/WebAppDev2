import React from "react";
import { storiesOf } from "@storybook/react";
import { PersonalityColumn } from "./personality";

const data = [{ id: "1", description: "TestData" }];

storiesOf("PersonalityColumn", module)
  .add("Trait", () => <PersonalityColumn title="Trait" data={data} />)
  .add("Ideal", () => <PersonalityColumn title="Ideal" data={data} />)
  .add("Bond", () => <PersonalityColumn title="Bond" data={data} />)
  .add("Flaw", () => <PersonalityColumn title="Flaw" data={data} />);
