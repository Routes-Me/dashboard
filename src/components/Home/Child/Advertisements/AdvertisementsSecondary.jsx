import React, { Component } from 'react';
import { QRCode } from "react-qr-svg";
import ReactPlayer from 'react-player';
import { Label } from 'reactstrap';

export class AdvertisementsSecondary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: "",
            media: "",
            qr: "",
            mediaType:"",
            advertisementId:0
        }
    }

    render() {

        return (
            <div className="search-main">
                {this.state.advertisementId === 0 ? <p>Select a advertisement <br /> to display <b>media info</b> related to it</p> :
                    <div className="container align-self-start" style={{ marginTop: "30px" }}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row-md-12 col-md-12"><label>Medias</label><a style={{ float: "right" }} onClick="">Edit</a></div>
                                <div className="row-md-12 col-md-12">
                                    <ReactPlayer
                                        width='100%'
                                        height='100%'
                                        controls
                                        url="https://firebasestorage.googleapis.com/v0/b/wdeniapp.appspot.com/o/000000%2FKuwait%20National%20Day.mp4?alt=media&token=fd4c77c5-1d5c-4aed-bb77-a6de9acb00b3" />
                                </div>
                            </div>
                        </div>
                        <br />
                        {/*<div className="row" style={{ width: "100 %", height: "50px", color: "black" }} />*/}
                        <hr style={{ width: "100 %", height: "6px", color: "black" }} />
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row-md-12 col-md-12"><label>Extras</label></div>
                                <div className="row-md-12 col-md-12">
                                    <QRCode
                                        bgColor="#FFFFFF"
                                        fgColor="#000000"
                                        level="Q"
                                        style={{ width: 139, height: 139 }}
                                        value="some text" />
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>
        );
    }

}