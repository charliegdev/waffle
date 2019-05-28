import React from "react";
import SelectMenu from "./SelectMenu";
import { routineTests } from "../test-utils";

describe("Dialog", () => {
  let selectMenu;

  beforeEach(() => {
    selectMenu = (
      <SelectMenu
        options={[
          {
            label: "option 1",
            value: "option 1"
          },
          {
            label: "option 2",
            value: "option 2"
          },
          {
            label: "option 3",
            value: "option 3"
          }
        ]}
        onSelect={() => undefined}
      />
    );
  });

  routineTests(selectMenu);
});
