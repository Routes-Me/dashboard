import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as AdvertisementAction from '../../../Redux/Action';
import * as InstitutionAction from '../../../Redux/Action';
import Form from 'react-validation/build/form';
import { onImageCompress, onVideoCompress } from '../../../util/Compress';
import '../../Advertisements/Advertisement.css';


class Extras extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: "",
            name: "",
            institution: "",
            image: "",
            video: "",
            campaigns: [],
            dayInterval: "",
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
    }

    fileChangedHandler = (event) => {
        const file = event.target.files[0];
        //const filepath = file.mozFullPath;
        var filePath = 'C:/Users/Hp/Downloads/Simulater Sample/sample.avi';
        this.onVideoCompress(filePath);
        //this.compressImage(file);

    }

    compressVideo = async (filePath) => {
        const compressedVideo = await onVideoCompress(filePath);
        this.setState({ video: compressedVideo });
    }



    compressImage = async (image) => {
        const compressedImage = await onImageCompress(image);
        //console.log(`The compressed image size ==> ${this.calculateImageSize(compressedImage)}`);
        this.setState({ image: compressedImage });
        //this.props.uploadMedia(compressedImage);
    }

    static getDerivedStateFromProps(props, state) {
        console.log('Users : getDerivedStateFromProps called with NewProps', props.advertisementToDisplay);
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

        event.preventDefault();

        const vehicle = {
            Email: this.state.email,
            Phone: this.state.phone,
            application: this.state.application,
            name: this.state.name
        }

        this.props.saveUser(vehicle);
    }

    render() {
        const advertisementObj = this.state.advertisement;
        const imageText = this.state.image === "" ? "160 X 600" : this.state.image;
        const videoText = this.state.video === "" ? "1280 X 720" : this.state.video;
        return (
            <Form onSubmit={e => this.handleSubmit(e)}>
                <br/>
                <label>Routes enables you to add a promoted QR code connected to the advertisement</label>
                <br />
                    <div className="row">
                    <div className="col-md-12">

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Title</Label><br />
                                    <input type="text" name="email"
                                        placeholder={advertisementObj === undefined ? "" : advertisementObj.name}
                                        value={advertisementObj.name}
                                        onChange={this.onChange}
                                        className="form-control" />
                                </div>
                            </div>


                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Subtitle</Label><br />
                                    <input type="text" name="email"
                                        placeholder={advertisementObj === undefined ? "" : advertisementObj.name}
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
    uploadMedia: AdvertisementAction.uploadMedia,
    saveAdvertisement: AdvertisementAction.addAdvertisement

}

const connectAdvertisementDetail = connect(mapStateToProps, actionCreators)(Extras);
export { connectAdvertisementDetail as Extras };