import React from "react";
import { storiesOf } from "@storybook/react";
import { NativeSelects } from "../src";



storiesOf("Form MUI", module).add("Form MUI", () =>
    <NativeSelects/>
  , {
  notes: "A very simple component"
});
