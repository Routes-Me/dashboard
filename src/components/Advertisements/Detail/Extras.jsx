﻿import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as AdvertisementAction from '../../../Redux/Action';
import * as InstitutionAction from '../../../Redux/Action';
import Form from 'react-validation/build/form';
import { onImageCompress } from '../../../util/Compress';
import '../../Advertisements/Advertisement.css';


class Extras extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: "",
            title: "",
            subtitle: "",
            startDate:"",
            endDate:"",
            useageLimit:"",
            shareQR:false,
            advertisement: ""
        }
    }

    componentDidMount() {
        this.props.getCampaigns();
        this.props.getDayIntervals();
        //this.props.getInstitutions();
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        if (event.target.name === "title") {
            this.props.updateTitle(event.target.value);
        }
    }

    fileChangedHandler = (event) => {
        const file = event.target.files[0];
        this.compressImage(file);

    }

  



    compressImage = async (image) => {
        const compressedImage = await onImageCompress(image);
        //console.log(`The compressed image size ==> ${this.calculateImageSize(compressedImage)}`);
        this.setState({ image: compressedImage });
        //this.props.uploadMedia(compressedImage);
    }

    static getDerivedStateFromProps(props, state) {

        if (props.advertisementToDisplay !== undefined) {
            if (props.advertisementToDisplay !== state.userToDisplay) {
                return {
                    advertisement: props.advertisementToDisplay,
                    id: props.advertisementToDisplay.id,
                    name: props.advertisementToDisplay.name,
                    dayInterval: props.advertisementToDisplay.dayInterval,
                    institution: props.advertisementToDisplay.institution,
                    media: props.advertisementToDisplay.media,
                    campaigns: props.advertisementToDisplay.campaigns
                }
            }
        }

    }

    //Submit button action 
    handleSubmit = (event) => {

    //     "PlaceId": "1",
    // "Title": "30% off at place 1",
    // "Subtitle": "Grab it now!",
    // "StartAt": "2020-09-20T00:00:00",
    // "EndAt": "2020-09-27T00:00:00",
    // "QrCodeUrl": "https://routesme.blob.core.windows.net/advertisements/Test_637338534992927001.jpg",
    // "UsageLimit": 100,
    // "ExpieryDate": "2020-09-25T00:00:00",
    // "AdvertisementId": "1",
    // "InstitutionId": "2",
    // "IsSharable": false,

        event.preventDefault();

        const vehicle = {
            Title: this.state.email,
            Subtitle: this.state.phone,
            StartAt: this.state.application,
            EndAt: this.state.name
        }

        this.props.saveUser(vehicle);

    }

    render() {
        const advertisementObj = this.state.advertisement;
        return (
            <Form onSubmit={e => this.handleSubmit(e)}>
                <label>Routes enables you to add a promoted QR code connected to the advertisement</label>
                <br />
                    <div className="row">
                    <div className="col-md-12">

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Title</Label><br />
                                <input type="text" name="title"
                                    placeholder={advertisementObj === undefined ? "" : advertisementObj.title}
                                        value={advertisementObj.name}
                                        onChange={this.onChange}
                                        className="form-control" />
                                </div>
                            </div>


                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Subtitle</Label><br />
                                <input type="text" name="subtitle"
                                    placeholder={advertisementObj === undefined ? "" : advertisementObj.subtitle}
                                        value={advertisementObj.name}
                                        onChange={this.onChange}
                                        className="form-control" />
                                </div>
                            </div>


                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Starts At</Label><br />
                                <input type="date" name="email"
                                    placeholder={advertisementObj === undefined ? "" : advertisementObj.name}
                                    value={advertisementObj.name}
                                    onChange={this.onChange}
                                    className="form-control" />
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Ends At</Label><br />
                                <input type="date" name="email"
                                    placeholder={advertisementObj === undefined ? "" : advertisementObj.name}
                                    value={advertisementObj.name}
                                    onChange={this.onChange}
                                    className="form-control" />
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Useage Limit</Label><br />
                                <input type="number" name="email"
                                    placeholder={advertisementObj === undefined ? "" : advertisementObj.name}
                                    value={advertisementObj.name}
                                    onChange={this.onChange}
                                    className="form-control" />
                                </div>
                            </div>

                        <div className="row form-group">
                            <div className="col-md-12">
                                <Label>Enable Share QR Code</Label>
                                <label class="radio-inline"><input type="radio" name="optradio" checked/> Yes</label>
                                <label class="radio-inline"><input type="radio" name="optradio"/> No</label>
                            </div>
                        </div>
                            
                            <br /><br />

                            {/*<div className="align-self-end ml-auto" style={{ textAlign: "end" }}><button type="submit" className="btn btn-primary"> {buttonText} </button></div>*/}

                        </div>
                    </div>
                </Form>
        )
    }
}


//connect redux
const mapStateToProps = (state) => {

    const intervals = state.AdvertisementStore.DayIntervals;

    return {
        DayInterval: state.AdvertisementStore.DayIntervals,
        Campaigns: state.AdvertisementStore.Campaigns
    }

}

const actionCreators = {

    getCampaigns: AdvertisementAction.getCampaigns,
    getDayIntervals: AdvertisementAction.getDayIntervals,
    getInstitutions: InstitutionAction.getInstitutions,
    updateTitle: AdvertisementAction.onTitleChange,
    updateSubtitle: AdvertisementAction.onSubTitleChange,
    uploadMedia: AdvertisementAction.uploadMedia,
    saveAdvertisement: AdvertisementAction.addAdvertisement

}

const connectAdvertisementDetail = connect(mapStateToProps, actionCreators)(Extras);
export { connectAdvertisementDetail as Extras };