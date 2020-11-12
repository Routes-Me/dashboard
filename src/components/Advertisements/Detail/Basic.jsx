import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as AdvertisementAction  from '../../../Redux/Action';
import * as InstitutionAction  from '../../../Redux/Action';
import Form from 'react-validation/build/form';
import { onImageCompress } from '../../../util/Compress';
import { uploadMedia } from '../../../util/blobStorage';
import '../../Advertisements/Advertisement.css';
import { config } from '../../../constants/config';


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
            advertisement: "",
            submit:false
        }
    }

    componentDidMount() {
        this.props.getCampaigns();
        this.props.getDayIntervals();
        this.props.getInstitutions();
    }

    onChange = (event) => {
        if(event.target.name === "campaigns")
        {
            const selected=[];
            let selectedOption=(event.target.selectedOptions);
            for (let i = 0; i < selectedOption.length; i++)
            {
                selected.push(selectedOption.item(i).value)
            }
            this.setState({ [event.target.name]: selected})
        }
        else
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


     hexToRgb = (hex) => {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
          return r + r + g + g + b + b;
        });
      
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }




    compressImage = async (image) => {
        const compressedImage = await onImageCompress(image);
        //console.log(`The compressed image size ==> ${this.calculateImageSize(compressedImage)}`);
        this.setState({ image: compressedImage });
        return compressedImage;
    }



    static getDerivedStateFromProps(props, state) {
        // console.log('Users : getDerivedStateFromProps called with NewProps', props.advertisementToDisplay);
        if (props.advertisementToDisplay !== undefined) {
            if (props.advertisementToDisplay !== state.advertisement) {
                return {
                    advertisement   : props.advertisementToDisplay,
                    id              : props.advertisementToDisplay.id,
                    name            : props.advertisementToDisplay.resourceName,
                    dayInterval     : props.advertisementToDisplay.interval.IntervalId,
                    institutionId     : props.advertisementToDisplay.institution.InstitutionId,
                    media           : props.advertisementToDisplay.media,
                    campaigns       : props.advertisementToDisplay.campaigns
                }
            }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.submitForm !== prevProps.submitForm) {
          this.handleSubmit();
        }
      }

    //Submit button action 
    handleSubmit = () => {

        let advertisement = '';

        let action = this.props.withPromotion? 'NoPromo' : this.state.advertisement === ''? 'save': 'add'

        if(action === 'add')
        {
            advertisement = {
                ResourceName    : this.state.name,
                InstitutionId   : this.state.institutionId,
                MediaId         : this.props.UploadedMedia.Id,
                IntervalId      : this.state.dayInterval,
                CampaignId      : this.state.campaigns
            }
        }
        else
        {
            advertisement = {
                ResourceName    : this.state.name,
                InstitutionId   : this.state.institutionId,
                MediaId         : this.state.media.Id,
                IntervalId      : this.state.dayInterval,
                CampaignId      : this.state.campaigns
            }
        }

        this.props.saveAdvertisement( advertisement, action );

    }

    render() {
        
        // {this.state.submit && this.handleSubmit()} 
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
                                        className="form-control"/>
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
                                    <Label>Media</Label>
                                    <div className="progress">
                                    <div className="progress-bar progress-bar-striped progress-bar-animated"
                                      role="progressbar"
                                      aria-valuenow={this.props.onProgress}
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                      style={{ width: this.props.onProgress + "%" }}
                                    >
                                      {this.props.onProgress}%
                                    </div>
                                    </div>
                                    <div className="form-group files">
                                        <input type="file" className="form-control" onChange={this.fileChangedHandler} />
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Campaigns</Label><br/>
                                    <select className="custom-select" multiple size="5" defaultValue={this.state.campaigns} name="campaigns" onChange={this.onChange}>
                                        {this.props.Campaigns.map(campaign => (<option value={campaign.campaignId}>{campaign.title}</option>))}
                                    </select>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Institution</Label><br />
                                    <select defaultValue={this.state.institutionId } className="custom-select my-1 mr-sm-2" name="institutionId" onChange={this.onChange}>
                                        {this.props.InstitutionList.map(institution => (<option className="dropdown-item" value={institution.institutionId}>{institution.name}</option>))}
                                    </select>
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

    return {
        DayInterval      : [config.selectDayInterval, ...state.AdvertisementStore.DayIntervals],
        Campaigns        : state.AdvertisementStore.Campaigns,
        InstitutionList  : [config.selectInstitution, ...state.InstitutionStore.Institutions],
        UploadedMedia    : state.AdvertisementStore.Media,
        onProgress       : state.AdvertisementStore.progress
    }

}

const actionCreators = {

    getCampaigns: AdvertisementAction.getCampaigns,
    getDayIntervals: AdvertisementAction.getDayIntervals,
    getInstitutions: InstitutionAction.getInstitutions,
    uploadMedia: AdvertisementAction.uploadMedia,
    saveAdvertisement: AdvertisementAction.addAdvertisement

}

const connectAdvertisementDetail = connect(mapStateToProps, actionCreators)(Basic);
export { connectAdvertisementDetail as Basic };