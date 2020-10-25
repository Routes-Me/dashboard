import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as AdvertisementAction from '../../../Redux/Action';
import * as InstitutionAction from '../../../Redux/Action';
import Form from 'react-validation/build/form';
import { onImageCompress } from '../../../util/Compress';
import '../../Advertisements/Advertisement.css';


class Basic extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: "",
            name: "",
            institution: "",
            image: "",
            video: "",
            campaigns: [],
            dayInterval: 0,
            advertisement: ""
        }
    }

    componentDidMount() {
        this.props.getCampaigns();
        this.props.getDayIntervals();
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    fileChangedHandler = async(event) => {

        let fileType = undefined;
        let file = event.target.files[0];
        if (file.type.includes('video')) {
            this.setState({ image: undefined })
            fileType = 'video';
            //this.props.uploadMedia(file);
            //this.compressVideo()
        }
        else {
            this.setState({ video: undefined });
            fileType = 'image';
            file = await onImageCompress(file);
        }
        this.props.uploadMedia(file, fileType);
        
    }




    compressImage = async (image) => {
        const compressedImage = await onImageCompress(image);
        //console.log(`The compressed image size ==> ${this.calculateImageSize(compressedImage)}`);
        this.setState({ image: compressedImage });
        return compressedImage;
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
            name: this.state.name,
            Phone: this.state.phone,
            MediaId: this.props.UploadedMedia,
            IntervalId: this.state.application,
            CampaignId: this.state.campaigns
        }

        this.props.saveUser(vehicle);
    }

    render() {
        const advertisementObj = this.state.advertisement;
        return (
            <div className="container-fluid">
                <label>Create an advertisment that runs interactively on taxi screens, Complete the Basics tab then Create to add the advertisment or review each tab for full customization</label>
                <br />
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Name</Label><br />
                                    <input type="text" name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        className="form-control" />
                                    <span className="form-error is-visible">{this.state.errorText}</span>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Day Interval</Label><br />
                                    <select defaultValue={this.state.dayInterval} className="custom-select my-1 mr-sm-2" name="dayInterval" onChange={this.onChange}>
                                        {this.props.DayInterval.map(interval => (<option className="dropdown-item" value={interval.intervalId}>{interval.title}</option>))}
                                    </select>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Media</Label><br />
                                    <div className="form-group files">
                                        <input type="file" className="form-control" onChange={this.fileChangedHandler} />
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Campaigns</Label><br/>
                                    <select multiple="multiple" className="custom-select" size="5" defaultValue={this.state.campaigns} name="campaigns">
                                        {this.props.Campaigns.map(campaign => (<option value={campaign.campaignId}>{campaign.title}</option>))}
                                    </select>
                                </div>
                            </div>

                            {/*<div className="row form-group">
                                VehicleObj.model.id
                                <div className="col-md-12">
                                <Label>Institution</Label><br />
                                <select defaultValue={advertisementObj ? advertisementObj.institution.institutionId : "Select a model"} className="custom-select my-1 mr-sm-2" name="modelId" onChange={this.onChange}>
                                    {this.props.InstitutionList.map(institution => (<option className="dropdown-item" value={institution.institutionId}>{institution.name}</option>))}
                                </select>
                                </div>
                            </div>*/}

                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}


//connect redux
const mapStateToProps = (state) => {

    return {
        DayInterval: state.AdvertisementStore.DayIntervals,
        Campaigns: state.AdvertisementStore.Campaigns,
        UploadedMedia: state.AdvertisementStore.Media
    }

}

const actionCreators = {

    getCampaigns: AdvertisementAction.getCampaigns,
    getDayIntervals: AdvertisementAction.getDayIntervals,
    uploadMedia: AdvertisementAction.uploadMedia,
    saveAdvertisement: AdvertisementAction.addAdvertisement

}

const connectAdvertisementDetail = connect(mapStateToProps, actionCreators)(Basic);
export { connectAdvertisementDetail as Basic };