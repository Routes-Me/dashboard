import React from 'react';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import { Motion } from 'react-motion';
import { clusterMarkerHOC } from './ClusterMarker.js';
import style from './styles.css';
import $ from "jquery";

const onMarkerClick = (key) => {
    $('.marker').toggleClass("active")
    console.log('the key for click ====>', key)
    console.log('The Passed style is ====>', style);
};

export const simpleMarker = ({
    style,
    text,
    key,
    defaultMotionStyle,
    motionStyle
}) => (
    <Motion key={key}
    defaultStyle={defaultMotionStyle}
    style={motionStyle}>
    {
      ({ scale }) => (
      <div className={style} key={key} id={key} onClick={onMarkerClick(key)} style={{ transform: `translate3D(0,0,0) scale(${scale}, ${scale})`, }}>
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