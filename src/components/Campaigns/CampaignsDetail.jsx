import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as InstitutionAction from '../../Redux/Action';
import Form from 'react-validation/build/form';

class CampaignsDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            campaignId: '',
            title: '',
            startAt: '',
            endAt:'',
            campaign: ""
        }
    }


    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    static getDerivedStateFromProps(props, state) {
        //console.log('Users : getDerivedStateFromProps called with NewProps', props.vehicleToDisplay);
        if (props.campaignToDisplay !== undefined) {
            if (props.campaignToDisplay !== state.campaign) {
                return {
                    campaign    : props.campaignToDisplay,
                    campaignId  : props.campaignToDisplay.campaignId,
                    title       : props.campaignToDisplay.title,
                    startAt     : props.campaignToDisplay.startAt.substr(0, 10),
                    endAt       : props.campaignToDisplay.endAt.substr(0, 10)
                }
            }
        }
    }

    

    //Submit button action
    handleSubmit = (event) => {

        event.preventDefault();
        
        let action ="";
        let campaign ='';

        {this.state.campaign.campaignId? action = "save": action = "add"}

        if(action==="add"){
        campaign = {
                title  : this.state.title,
                startAt: this.state.startAt,
                endAt  : this.state.endAt
            }
        }
        else{
        campaign = {
                campaignId :this.state.campaignId,
                title      : this.state.title,
                startAt    : this.state.startAt,
                endAt      : this.state.endAt
            }
        }
        
        this.props.saveCampaign(campaign,action);

    }

    render() {

        // Render nothing if the "show" prop is false
        // if (this.props.savedSuccessfully && !this.props.show) {
        //     return null;
        // }

        const institutionObj = this.state.institution;
        const buttonText = institutionObj ? "Update" : "Add";

        return (
            <div>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <div class="col-md-12" style={{padding:'0px'}}>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <Label>Title</Label><br />
                                <input type="text" name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}
                                    className="form-control" />
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <Label>Start At</Label><br />
                                <input type="date" name="startAt"
                                    value={this.state.startAt}
                                    onChange={this.onChange}
                                    className="form-control" />
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-6">
                                <Label>End At</Label><br />
                                <input type="date" name="endAt"
                                    value={this.state.endAt}
                                    onChange={this.onChange}
                                    className="form-control" />
                            </div>
                        </div>

                        <br /><br />

                    </div>

            <div className="container-fluid">
                    <div className="footerStyle">
                        <button type="submit" style={{ float: 'left' }}> {buttonText} </button>
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
        servicesList: state.InstitutionStore.Services,
        token : state.Login.token,
        savedSuccessfully : state.InstitutionStore.Loading
    }

}

const actionCreators = {
    getServiceList: InstitutionAction.getServicesList,
    saveCampaign: InstitutionAction.saveCampaign
};

const connectCampaignsDetail = connect(mapStateToProps, actionCreators)(CampaignsDetail);
export { connectCampaignsDetail as CampaignsDetail };