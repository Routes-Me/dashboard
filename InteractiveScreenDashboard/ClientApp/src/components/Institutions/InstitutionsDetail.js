import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as UserAction from '../../Redux/Action';
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


    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    static getDerivedStateFromProps(props, state) {
        console.log('Users : getDerivedStateFromProps called with NewProps', props.vehicleToDisplay);
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


    handleSubmit = (event) => {

        event.preventDefault();

        const vehicle = {
            CountryIso: "IN",
            PhoneNumber: this.state.phone,
            createdAT: "2020-06-29T10:54:53",
            Name: this.state.name
        }

        this.props.saveUser(vehicle);
    }

    render() {
        const institutionObj = this.state.institution;
        const buttonText = institutionObj ? "Update" : "Add";

        return (
            <div className="row col-md-12 detail-form">
                <Form onSubmit={e => this.handleSubmit(e)}>
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
                            {/*VehicleObj.model.id
                            <div className="col-md-4">
                                <Label>application</Label><br />
                                <select defaultValue={institutionObj ? institutionObj.model.id : "Select a model"} className="form-control" name="modelId" onChange={this.onChange}>
                                    {this.props.ModelList.map(model => (<option className="dropdown-item" value={model.id}>{model.name}</option>))}
                                </select>
                            </div>*/}
                        </div>



                        <br /><br />

                        <div className="align-self-end ml-auto" style={{ textAlign: "end" }}><button type="submit" className="btn btn-primary"> {buttonText} </button></div>

                    </div>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    const modelList = state.VehicleStore.Models;
    console.log('DialogVehicles: Mapped State Vehicle Array returned :', modelList);

    return {
        ModelList: modelList
    }

}

const actionCreators = {
    saveUser: UserAction.saveUser
};

const connectInstitutionDetail = connect(mapStateToProps, actionCreators)(InstitutionsDetail);
export { connectInstitutionDetail as InstitutionsDetail };