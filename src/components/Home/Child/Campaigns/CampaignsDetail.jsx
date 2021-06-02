import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as InstitutionAction from '../../../../Redux/Action';
import * as AdvertisementAction from '../../../../Redux/Action';
import Form from 'react-validation/build/form';
import { config } from '../../../../constants/config';
import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';

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
                <div className="table-list" style={{border:'1px solid #ced4da', borderRadius:'4px'}}>
                    <DragDropContext onDragEnd={(...props) => {console.log(props)}}>
                        <Droppable droppableId="droppable-1">
                            {(provided, snapshot) => (
                            <table ref={provided.innerRef} style={{ backgroundColor: snapshot.isDraggingOver ? 'lightgray' : 'white' }} {...provided.droppableProps}>
                            {
                                Advertisements.data?.map((Advertisement,i) => (
                                    <Draggable key={Advertisement.id} draggableId={"draggable-"+Advertisement.id} index={i}>
                                        {(provided, snapshot) => (
                                            <tbody>
                                            <tr key={Advertisement.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{...provided.draggableProps.style, boxShadow: snapshot.isDragging && "0 0 .4rem #666", backgroundColor:'white', padding:'10px'}}>
                                            <td>{Advertisement.resourceName}</td>
                                            </tr>
                                            </tbody>
                                        )}
                                    </Draggable>
                                ))
                            }
                            </table>
                            )}
                        </Droppable>
                    </DragDropContext>
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
                Title  : this.state.title,
                StartAt: this.state.startAt,
                EndAt  : this.state.endAt,
                Status : 'active'
            }
        }
        else{
            campaign = {
                CampaignId :this.state.campaignId,
                Title      : this.state.title,
                StartAt    : this.state.startAt,
                EndAt      : this.state.endAt,
                Status : 'active'
            }
        }
        
        this.props.saveCampaign(campaign,action);

    }

    render() {

        // let content = this.renderAllAdvertisementTable(this.props.AdvertisementList);
        const institutionObj = this.state.institution;
        const buttonText = institutionObj ? "Update" : "Add";

        return (
            <div>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    <div className="col-md-12" style={{padding:'0px'}}>

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

                        {/* <div className="row form-group">
                            <div className='col-md-6'>
                            {content}
                            </div>
                        </div> */}

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