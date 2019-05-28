import React from "react";
import Topbar from "./Topbar";
import { routineTests } from "../test-utils";

describe("Topbar", () => {
  let topbar;

  beforeEach(() => {
    topbar = (
      <Topbar>
        <p>Test</p>
      </Topbar>
    );
  });

  routineTests(topbar);
});
