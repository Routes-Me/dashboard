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
        this.props.getServiceList();
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
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
                CountryIso: "KW",
                PhoneNumber: this.state.phoneNumber,
                createdAT: "",
                Name: this.state.name,
                Services: [this.state.services]
            }
            this.props.saveInstitution(this.props.token,institution,action);
        }
        else{
            const institution = {
                institutionId:this.state.institution.institutionId,
                CountryIso: "KW",
                PhoneNumber: this.state.phoneNumber,
                createdAT: "",
                Name: this.state.name,
                Services: [this.state.services]
            }
            this.props.saveInstitution(this.props.token,institution,action);
        }

        
       
        
    }

    render() {
        const institutionObj = this.state.institution;
        const buttonText = institutionObj ? "Update" : "Add";

        return (
            <div className="container-fluid">
                <Form onSubmit={e => this.handleSubmit(e)}>
            <div className="row col-md-12 detail-form">
                
                    <div class="col-md-10">

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
                                <select multiple class="custom-select" size="3" value={this.state.services} name="services" onChange={this.onChange}>
                                    {this.props.servicesList.map(service => (<option value={service.id}>{service.value}</option>))}
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
        token : state.Login.token
    }

}

const actionCreators = {
    getServiceList: InstitutionAction.getServicesList,
    saveInstitution: InstitutionAction.saveInstitution
};

const connectInstitutionDetail = connect(mapStateToProps, actionCreators)(InstitutionsDetail);
export { connectInstitutionDetail as InstitutionsDetail };