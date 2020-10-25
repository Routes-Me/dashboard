import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as InstitutionAction from '../../Redux/Action';
import Form from 'react-validation/build/form';

class InstitutionsDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: "",
            name: "",
            phoneNumber: "",
            services:[],
            institution: ""
        }
    }

    componentDidMount() {
        this.props.getServiceList(this.props.token);
    }

    onChange = (event) => {
        if(event.target.name === "services")
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
        this.setState({ [event.target.name]: event.target.value})
    }

    static getDerivedStateFromProps(props, state) {
        //console.log('Users : getDerivedStateFromProps called with NewProps', props.vehicleToDisplay);
        if (props.institutionToDisplay !== undefined) {
            if (props.institutionToDisplay !== state.institution) {
                return {
                    institution: props.institutionToDisplay,
                    id: props.institutionToDisplay.institutionId,
                    name: props.institutionToDisplay.name,
                    phoneNumber:props.institutionToDisplay.phoneNumber,
                    services:props.institutionToDisplay.services
                }
            }
        }
    }

    

    //Submit button action
    handleSubmit = (event) => {

        event.preventDefault();
        
        let action ="";

        {this.state.institution.institutionId? action = "save": action = "add"}

        if(action==="add"){
            const institution = {
                Name: this.state.name,
                PhoneNumber: this.state.phoneNumber,
                CountryIso: "KW",
                Services: this.state.services
            }
            this.props.saveInstitution(institution,action);
        }
        else{
            const institution = {
                InstitutionId:this.state.institution.institutionId,
                Name: this.state.name,
                PhoneNumber: this.state.phoneNumber,
                CountryIso: "KW",
                Services: this.state.services
            }
            this.props.saveInstitution(institution,action);
        }

    }

    render() {

        // Render nothing if the "show" prop is false
        // if (this.props.savedSuccessfully && !this.props.show) {
        //     return null;
        // }

        const institutionObj = this.state.institution;
        const buttonText = institutionObj ? "Update" : "Add";

        return (
            <div className="container-fluid">
                <Form onSubmit={e => this.handleSubmit(e)}>
            <div className="row col-md-12 detail-form" style={{padding:"0px"}}>
                
                    <div class="col-md-12">

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Name</Label><br />
                                <input type="text" name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    className="form-control" />
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Phone</Label><br />
                                <input type="text" name="phoneNumber"
                                    value={this.state.phoneNumber}
                                    onChange={this.onChange}
                                    className="form-control" />
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Services</Label><br />
                                <select class="custom-select" multiple size="3" defaultValue={this.state.services} name="services" onChange={this.onChange}>
                                    {this.props.servicesList.map(service => (<option value={service.serviceId}>{service.name}</option>))}
                                </select>
                            </div>
                        </div>

                        <br /><br />

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
        servicesList: state.InstitutionStore.Services,
        token : state.Login.token,
        savedSuccessfully : state.InstitutionStore.Loading
    }

}

const actionCreators = {
    getServiceList: InstitutionAction.getServicesList,
    saveInstitution: InstitutionAction.saveInstitution
};

const connectInstitutionDetail = connect(mapStateToProps, actionCreators)(InstitutionsDetail);
export { connectInstitutionDetail as InstitutionsDetail };