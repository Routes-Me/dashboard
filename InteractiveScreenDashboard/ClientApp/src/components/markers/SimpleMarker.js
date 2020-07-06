import React from 'react';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import { Motion } from 'react-motion';
import { clusterMarkerHOC } from './ClusterMarker.js';
import style from './styles.css';
import $ from "jquery";

const onMarkerClick = () => {
    $(".marker").toggleClass("active")
    console.log("click Event of SImiple Ma");
};
export const simpleMarker = ({
    styles,
    text,
    key,
    defaultMotionStyle,
    motionStyle,
}) => (
    <Motion
    defaultStyle={defaultMotionStyle}
    style={motionStyle}
  >
  {
    ({ scale }) => (
        <div className="marker" onClick={onMarkerClick} style={{transform: `translate3D(0,0,0) scale(${scale}, ${scale})`,}}>
      
      <div id="icondiv" className="show-text">{text}</div>
      </div>
    )
  }
  </Motion>
);

export const simpleMarkerHOC = compose(
    defaultProps({
        styles: style,
        initialScale: 0.3,
        defaultScale: 0.6,
        hoveredScale: 0.7,
    }),
    // resuse HOC
    clusterMarkerHOC
);

export default simpleMarkerHOC(simpleMarker);