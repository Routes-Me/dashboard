import React from 'react';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import withPropsOnChange from 'recompose/withPropsOnChange';
import pure from 'recompose/pure';
import { Motion, spring } from 'react-motion';
import clusterMarkerStyles from './ClusterMarker.sass';
import style from './styles.css';
import $ from "jquery";


const onMarkerClick = () => {
    $(".idle-cluster").toggleClass("selected")
    console.log("click Event on Clustered Marker");
};

export const clusterMarker = ({
    styles,
    text,
    defaultMotionStyle,
    motionStyle,
}) => (
    <Motion
    defaultStyle={defaultMotionStyle}
    style={motionStyle}>
    {
        ({ scale }) => (
        <div className={styles} onClick={onMarkerClick} style={{ transform: `translate3D(0,0,0) scale(${scale}, ${scale})`, }}>
        <div className="text">
          {text}
        </div>
        <div id="icondiv" className="show-text">FF</div>
      </div>
    )
  }
  </Motion>
);

export const clusterMarkerHOC = compose(
    defaultProps({
        text: '0',
        styles: style,
        initialScale: 0.6,
        defaultScale: 1,
        hoveredScale: 1.15,
        hovered: false,
        stiffness: 320,
        damping: 7,
        precision: 0.001,
    }),
    // pure optimization can cause some effects you don't want,
    // don't use it in development for markers
    pure,
    withPropsOnChange(
        ['initialScale'],
        ({ initialScale, defaultScale, $prerender }) => ({
            initialScale,
            defaultMotionStyle: { scale: $prerender ? defaultScale : initialScale },
        })
    ),
    withPropsOnChange(
        ['hovered'],
        ({
            hovered,
            hoveredScale,
            defaultScale,
            stiffness,
            damping,
            precision,
        }) => ({
            hovered,
            motionStyle: {
                scale: spring(
                    hovered ? hoveredScale : defaultScale, { stiffness, damping, precision }
                ),
            },
        })
    )
);

export default clusterMarkerHOC(clusterMarker);