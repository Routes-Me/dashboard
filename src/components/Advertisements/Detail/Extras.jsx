import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as AdvertisementAction from '../../../Redux/Action';
import * as InstitutionAction from '../../../Redux/Action';
import Form from 'react-validation/build/form';
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
            advertisement: "",
            weblink:"",
            iOSLink:"",
            androidLink:"",
            tabIndex:1
        }
    }

    onChangeRadioButton = (event) => {
        const share = event.target.value === 'on' ? true: false;
        this.setState({ shareQR : share });
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        if (event.target.name === "title") {
            this.props.updateTitle(event.target.value);
        }
    }

    onTabClick = (index) => {
        this.setState({ tabIndex: index });
    }
  
    componentDidUpdate(prevProps, prevState) {
        if (this.props.submitForm !== prevProps.submitForm) {
            if(this.props.submitForm)
            {
                this.handleSubmit(this.props.addForPromotion.advertisementId);
            }
        }
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
    handleSubmit = (advertisementIdForPromotion) => {

        let promotion ='';
        if(this.state.weblink === '')
        {
            promotion = {
                Title: this.state.title,
                Subtitle: this.state.subtitle,
                StartAt: this.state.startDate,
                EndAt: this.state.endDate,
                UsageLimit: this.state.useageLimit,
                IsSharable: this.state.shareQR,
                AdvertisementId: advertisementIdForPromotion,
                InstitutionId: this.props.InstitutionId,
                type:"coupons"
            }
        }
        else {
            promotion = {
                Title: this.state.title,
                Subtitle: this.state.subtitle,
                links :{
                    Web: this.state.weblink,
                    Ios: this.state.androidLink,
                    Android: this.state.iOSLink
                },
                type: "links",
                AdvertisementId: advertisementIdForPromotion,
                InstitutionId: this.props.InstitutionId
            }
        }
        

        this.props.savePromotion(promotion);

    }

    render() {
        const tabIndex = this.state.tabIndex; 
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
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    className="form-control" />
                                </div>
                            </div>


                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Subtitle</Label><br />
                                <input type="text" name="subtitle"
                                    value={this.state.subtitle}
                                    onChange={this.onChange}
                                    className="form-control" />
                                </div>
                            </div>

                            <div className="headerTabStyle">
                                <nav>
                                    <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                        <a className={`nav-item nav-link ${tabIndex === 1 && "active"}`}  id="nav-home-tab" data-toggle="tab" onClick={(e) => this.onTabClick(1)} role="tab" aria-controls="nav-home" aria-selected="true"> Links</a>
                                        <a className={`nav-item nav-link ${tabIndex === 2 && "active"}`} id="nav-profile-tab" data-toggle="tab" onClick={(e) => this.onTabClick(2)} role="tab" aria-controls="nav-profile" aria-selected="false"> Coupons</a>
                                    </div>
                                </nav>
                            </div>

                            <div style={{display: this.state.tabIndex === 1? 'block':'none'}}>

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Web Link</Label><br />
                                <input type="text" name="weblink"
                                    value={this.state.weblink}
                                    onChange={this.onChange}
                                    className="form-control" />
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Android Link</Label><br />
                                <input type="text" name="androidLink"
                                    value={this.state.androidLink}
                                    onChange={this.onChange}
                                    className="form-control" />
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>iOS Link</Label><br />
                                <input type="text" name="iOSLink"
                                    value={this.state.iOSLink}
                                    onChange={this.onChange}
                                    className="form-control" />
                                </div>
                            </div>

                            </div>

                            <div style={{display: this.state.tabIndex === 2? 'block':'none'}}>

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Starts At</Label><br />
                                <input type="date" name="startDate"
                                    value={this.state.startDate}
                                    onChange={this.onChange}
                                    className="form-control" />
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Ends At</Label><br />
                                <input type="date" name="endDate"
                                    value={this.state.endDate}
                                    onChange={this.onChange}
                                    className="form-control" />
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Useage Limit</Label><br />
                                <input type="number" name="useageLimit"
                                    value={this.state.useageLimit}
                                    onChange={this.onChange}
                                    className="form-control" />
                                </div>
                            </div>

                        <div className="row form-group">
                            <div className="col-md-12">
                                <Label>Enable Share QR Code</Label>
                                <label class="radio-inline"><input type="radio" name="shareQR" onChange={this.onChangeRadioButton} checked={this.state.shareQR}/> Yes</label>
                                <label class="radio-inline"><input type="radio" name="shareQR" onChange={this.onChangeRadioButton} checked={!this.state.shareQR}/> No</label>
                            </div>
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


    return {
        DayInterval: state.AdvertisementStore.DayIntervals,
        Campaigns: state.AdvertisementStore.Campaigns,
        InstitutionId : state.Login.user.InstitutionId
    }

}

const actionCreators = {

    getInstitutions: InstitutionAction.getInstitutions,
    updateTitle: AdvertisementAction.onTitleChange,
    updateSubtitle: AdvertisementAction.onSubTitleChange,
    savePromotion: AdvertisementAction.addPromotions

}

const connectAdvertisementDetail = connect(mapStateToProps, actionCreators)(Extras);
export { connectAdvertisementDetail as Extras };