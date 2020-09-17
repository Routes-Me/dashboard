import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as AdvertisementAction from '../../Redux/Action';
import * as InstitutionAction from '../../Redux/Action';
import Form from 'react-validation/build/form';
import ReactPlayer from 'react-player';
import '../Advertisements/Advertisement.css';

class AdvertisementsDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: "",
            name: "",
            institution: "",
            media: "",
            campaigns: [],
            dayInterval: "",
            advertisement:""
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
        this.props.uploadMedia(file);
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
        const buttonText = advertisementObj ? "Update" : "Add";

        return (
            <div className="row col-md-12 detail-form">
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <div className="row">
                    <div class="col-md-6">
                        <div className="row form-group">
                            <div className="col-md-10">
                                <Label>Name</Label><br />
                                <input type="text" name="email"
                                    placeholder={advertisementObj === undefined ? "" : advertisementObj.name}
                                    value={advertisementObj.name}
                                    onChange={this.onChange}
                                    className="form-control" />
                            </div>
                        </div>


                        <div className="row form-group">
                            {/*VehicleObj.model.id*/}
                            <div className="col-md-10">
                                <Label>Day Interval</Label><br />
                                <select defaultValue={advertisementObj ? this.state.dayInterval : "Select an interval"} className="custom-select my-1 mr-sm-2" name="dayInterval" onChange={this.onChange}>
                                    {this.props.DayInterval.map(interval => (<option className="dropdown-item" value={interval.Id}>{interval.name}</option>))}
                                </select>
                            </div>
                        </div>


                        <div className="row form-group">
                            <div className="col-md-10">
                                <Label>Media</Label><br />
                                    <div class="form-group files">
                                        <input type="file" class="form-control" onChange={this.fileChangedHandler}/>
                                </div>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-10">
                                <Label>Media</Label><br />
                                <select multiple="multiple" class="custom-select" size="3" defaultValue={advertisementObj.campaigns}>
                                {this.props.Campaigns.map(campaign => (<option value={campaign.id}>{campaign.name}</option>))}
                                </select>
                            </div>
                        </div>
                           


                        {/*<div className="row form-group">
                            VehicleObj.model.id
                            <div className="col-md-4">
                                <Label>Institution</Label><br />
                                <select defaultValue={advertisementObj ? advertisementObj.institution.institutionId : "Select a model"} className="custom-select my-1 mr-sm-2" name="modelId" onChange={this.onChange}>
                                    {this.props.InstitutionList.map(institution => (<option className="dropdown-item" value={institution.institutionId}>{institution.name}</option>))}
                                </select>
                            </div>
                        </div>*/}


                        <br /><br />

                        {/*<div className="align-self-end ml-auto" style={{ textAlign: "end" }}><button type="submit" className="btn btn-primary"> {buttonText} </button></div>*/}

                        </div>
                        <div className="col-md-6">
                            <div className="col-md-12 simulator">
                                <div className="container row topPanel">
                                    <div className="banner1">
                                            <ReactPlayer
                                                width='100%'
                                                height='100%'
                                                controls
                                            url="https://firebasestorage.googleapis.com/v0/b/wdeniapp.appspot.com/o/000000%2FKuwait%20National%20Day.mp4?alt=media&token=fd4c77c5-1d5c-4aed-bb77-a6de9acb00b3" />
                                    </div>
                                    <div className="banner2">
                                        <img className="img-fluid" alt="" src="https://firebasestorage.googleapis.com/v0/b/usingfirebasefirestore.appspot.com/o/000000000%2Funnamed.jpg?alt=media&token=ff4adc90-1e6a-487b-8774-1eb3152c60d5" />
                                    </div>
                                </div>
                                <div className="container row bottomPanel">
                                    <div className="banner3"></div>
                                    <div className="banner4"></div>
                                </div>
                            </div>


                        </div>
                    </div>
                </Form>
            </div>
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

const connectAdvertisementDetail = connect(mapStateToProps, actionCreators)(AdvertisementsDetail);
export { connectAdvertisementDetail as AdvertisementsDetail };