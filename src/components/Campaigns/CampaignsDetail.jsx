import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as InstitutionAction from '../../Redux/Action';
import * as AdvertisementAction from '../../Redux/Action';
import Form from 'react-validation/build/form';
import { config } from '../../constants/config';

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
        
        if (props.campaignToDisplay !== undefined) {
            if (props.campaignToDisplay.campaignId !== state.campaignId) {
                
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

    componentDidUpdate() {
        this.state.campaignId !=='' && this.props.getAdvertisementsForCampaign(1,config.Pagelimit,this.state.campaignId);
    }
    

        //Load Advertisements in a table
        renderAllAdvertisementTable(Advertisements) {
            return (
                <div>
                    <table>
                            {
                                Advertisements.data?.map(Advertisement => (
                                    <tr key={Advertisement.id}>
                                        <td>{Advertisement.resourceName}</td>
                                    </tr>
                                ))
                            }
                    </table>
                </div>
            );
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

        let content = this.renderAllAdvertisementTable(this.props.AdvertisementList);
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

                        <div className='col-md-6'>
                        {content}
                        </div>

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
        AdvertisementList: state.AdvertisementStore.Advertisements,
        servicesList: state.InstitutionStore.Services,
        savedSuccessfully : state.InstitutionStore.Loading
    }

}

const actionCreators = {
    getServiceList: InstitutionAction.getServicesList,
    saveCampaign: InstitutionAction.saveCampaign,
    getAdvertisementsForCampaign : AdvertisementAction.getAdvertisements
};

const connectCampaignsDetail = connect(mapStateToProps, actionCreators)(CampaignsDetail);
export { connectCampaignsDetail as CampaignsDetail };