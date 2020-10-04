import React, { Component } from 'react';
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
            if (props.institutionToDisplay !== state.institutionToDisplay) {
                return {
                    institution: props.institutionToDisplay,
                    id: props.institutionToDisplay.institutionId,
                    name: props.institutionToDisplay.name,
                    phoneNumber: props.institutionToDisplay.phoneNumber
                }
            }
        }
    }

    

    //Submit button action
    handleSubmit = (event) => {

        event.preventDefault();

        const institution = {
            CountryIso: "KW",
            PhoneNumber: this.state.phoneNumber,
            createdAT: "",
            Name: this.state.name
        }

        this.props.saveInstitution(institution);
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
                                    placeholder={institutionObj === undefined ? "" : institutionObj.name}
                                    value={institutionObj.name}
                                    onChange={this.onChange}
                                    className="form-control" />
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Phone</Label><br />
                                <input type="text" name="phoneNumber"
                                    placeholder={institutionObj === undefined ? "" : institutionObj.phoneNumber}
                                    defaultValue={institutionObj.phoneNumber}
                                    onChange={this.onChange}
                                    className="form-control" />
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-4">
                                <Label>Services</Label><br />
                                <select multiple class="custom-select" size="3" defaultValue={institutionObj.services}>
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

    const servicesList = state.InstitutionStore.Services;

    return {
        servicesList: state.InstitutionStore.Services
    }

}

const actionCreators = {
    getServiceList: InstitutionAction.getServicesList,
    saveInstitution: InstitutionAction.saveInstitution
};

const connectInstitutionDetail = connect(mapStateToProps, actionCreators)(InstitutionsDetail);
export { connectInstitutionDetail as InstitutionsDetail };