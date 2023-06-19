import React, { Component, useRef } from "react";
import { Primary } from "./Primary";
import { Secondary } from "./Secondary";
import { SplitPane } from "react-collapse-pane";

function Master({isShow}) {
  const ref = useRef();
  const ref2 = useRef();

  return (
    <div ref={ref2} className={`left-panel ${isShow ? "open-panel" : ""}`}>
      <SplitPane
        split="horizontal"
        resizerOptions={{
          css: {
            width: "100%",
            height: "1px",
            background: "black",
          },
          hoverCss: {
            width: "100%",
            height: "1px",
            background: "1px solid black",
          },
          grabberSize: "1rem",
        }}
        collapseOptions={{
          beforeToggleButton: (
            <button
              style={{
                backgroundColor: "#0b0b0b",
                width: "32.6px",
                height: "2.7px",
                borderRadius: "2px",
                border: "none",
                marginTop: "4px",
              }}
            />
          ),
          afterToggleButton: (
            <button
              style={{
                backgroundColor: "#0b0b0b",
                width: "32.6px",
                height: "2.7px",
                borderRadius: "2px",
                border: "none",
                marginTop: "4px",
              }}
            />
          ),
          buttonTransition: "none",
          overlayCss: { backgroundColor: "rgb(0, 0, 0, 0.1)" },
          collapseDirection: "down",
          timeout: 300,
          transition: "none",
          collapseSize: 390,
          buttonPositionOffset: "4px",
        }}
      >
        <Primary />
        <Secondary />
      </SplitPane>
    </div>
  );
}

export default Master;
