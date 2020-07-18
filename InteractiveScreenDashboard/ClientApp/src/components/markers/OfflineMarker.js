import React from 'react';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import { Motion } from 'react-motion';
import { clusterMarkerHOC } from './ClusterMarker.js';
import style from './styles.css';
import OfflinMarkerStyles from './OfflineMarker.sass';
import $ from "jquery";

const onMarkerClick = () => {
    $(".idle-marker").toggleClass("selected")
    console.log("click Event of offmarker");
};
export const offlineMarker = ({
    style,
    text,
    defaultMotionStyle,
    motionStyle,
}) => (<Motion
            defaultStyle={defaultMotionStyle}
            style={motionStyle}>
            {
                ({ scale }) => (
                    <div className="OfflinMarkerStyles" onClick={onMarkerClick} style={{ transform: `translate3D(0,0,0) scale(${scale}, ${scale})`, }}>
                        <div id="icondiv" className="show-text">{text}</div>
                    </div>)
            }
       </Motion>);

export const offMarkerHOC = compose(
    defaultProps({
        styles: style,
        initialScale: 0.3,
        defaultScale: 0.6,
        hoveredScale: 0.7,
    }),
    // resuse HOC
    clusterMarkerHOC
);

export default offMarkerHOC(offlineMarker);