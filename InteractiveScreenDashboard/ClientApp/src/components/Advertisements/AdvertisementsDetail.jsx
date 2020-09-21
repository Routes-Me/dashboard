import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as AdvertisementAction from '../../Redux/Action';
import * as InstitutionAction from '../../Redux/Action';
import { onImageCompress, onVideoCompress } from '../../util/Compress';
import { Basic } from './Detail/Basic';
import { Extras } from './Detail/Extras';
import ReactPlayer from 'react-player';
import '../Advertisements/Advertisement.css';


class AdvertisementsDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: "",
            name: "",
            institution: "",
            image: "",
            video:"",
            campaigns: [],
            dayInterval: "",
            advertisement: "",
            tabIndex:0
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

    onTabClick = (index) => {
        this.setState({ tabIndex: index });
    }

    render() {
        const advertisementObj = this.state.advertisement;
        const imageText = this.state.image === "" ? "160 X 600" : this.state.image;
        const videoText = this.state.video === "" ? "1280 X 720" : this.state.video;
        return (
            <div className="container-fluid">
                <div className="row col-md-12 detail-form">
                    <div className="headerTabStyle">
                        <nav>
                            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" onClick={(e) => this.onTabClick(0)} role="tab" aria-controls="nav-home" aria-selected="true"> Basic</a>
                                <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" onClick={(e) => this.onTabClick(1)} role="tab" aria-controls="nav-profile" aria-selected="false"> QR Code Promotion</a>
                            </div>
                        </nav>
                        {/*<button className="btn default" onClick={(e) => this.onTabClick(0)}> Basic </button>
                        <button className="btn default" onClick={(e) => this.onTabClick(1)}> QR Code Promotion</button>*/}
                    </div>
                    <div className="row col-md-12 detail-form">
                        <div className="col-md-6">
                            {this.state.tabIndex === 0 ? < Basic /> : <Extras />}
                        </div>
                        <div className="col-md-6">
                            <div className="col-md-12 simulator">
                            <div className="container row topPanel">
                                <div className="banner1">
                                    {
                                        this.state.video === "" ? videoText :
                                            <ReactPlayer
                                                width='100%'
                                                height='100%'
                                                controls
                                                url="https://firebasestorage.googleapis.com/v0/b/wdeniapp.appspot.com/o/000000%2FKuwait%20National%20Day.mp4?alt=media&token=fd4c77c5-1d5c-4aed-bb77-a6de9acb00b3" />
                                    }
                                </div>
                                <div className="banner2">
                                    {this.state.image === "" ? imageText : <img className="img-fluid" alt="" src={imageText} />}
                                </div>
                            </div>
                            <div className="container row bottomPanel">
                                <div className="banner3"></div>
                                <div className="banner4"></div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                <div className="footerStyle">
                    <button type="submit" style={{ float: 'left' }}> Create </button>
                        <button className="btn btn-light"> <span class="glyphicon glyphicon-menu-left" aria-hidden="true" /> Previous</button>
                        <button className="next" style={{ marginLeft: '7px'}}>Next: Extras <span class="glyphicon glyphicon-menu-right" aria-hidden="true" /> </button>
                    </div>
                </div>
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