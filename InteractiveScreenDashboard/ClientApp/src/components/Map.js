import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const pin = "https://maps.google.com/mapfiles/kml/paddle/grn-circle.png"

const googleAPIKey = "";

const markerStyle = {
    position: "absolute",
    top: "100%",
    left: "100%",
    transform: "translate(-50%, -100%)"
};


const MapExample = ({ center, zoom, data }) => {
    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: googleAPIKey }}
            yesIWantToUseGoogleMapApiInternals={true}
            defaultZoom={zoom}
            defaultCenter={center}
        >
            {data.map(item => {
                return (
                    <div lat={item.location[0]} lng={item.location[1]}>
                        <img style={markerStyle} src={pin} alt="pin" />
                    </div>
                );
            })}
        </GoogleMapReact>
    );
};

export default MapExample;