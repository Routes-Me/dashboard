import React from "react";
import { connect } from "react-redux";
import { Label } from "reactstrap";
import * as InstitutionAction from "../../../../Redux/Action";
import Form from "react-validation/build/form";
import PageHandler from "../PageHandler";

class InstitutionsDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      phoneNumber: "",
      services: [],
      institution: "",
      validationMsg: "",
    };
  }

  componentDidMount() {
    this.props.getServiceList(1, 5);
  }

  onChange = (event) => {
    if (event.target.name === "services") {
      let serv = event.target.value;
      {
        this.setState({ services: [...this.state.services, serv] });
      }
    } else this.setState({ [event.target.name]: event.target.value });
  };

  static getDerivedStateFromProps(props, state) {
    //console.log('Users : getDerivedStateFromProps called with NewProps', props.vehicleToDisplay);
    if (props.institutionToDisplay !== undefined) {
      if (props.institutionToDisplay !== state.institution) {
        return {
          institution: props.institutionToDisplay,
          id: props.institutionToDisplay.institutionId,
          name: props.institutionToDisplay.name,
          phoneNumber: props.institutionToDisplay.phoneNumber,
          services: props.institutionToDisplay.services,
        };
      }
    }
  }

  //Submit button action
  handleSubmit = (event) => {
    event.preventDefault();

    let action = "";
    let institution;

    {
      this.state.institution.institutionId
        ? (action = "save")
        : (action = "add");
    }

    if (action === "add") {
      institution = {
        Name: this.state.name,
        PhoneNumber: this.state.phoneNumber,
        CountryIso: "KW",
        Services: this.state.services,
      };
    } else {
      institution = {
        InstitutionId: this.state.institution.institutionId,
        Name: this.state.name,
        PhoneNumber: this.state.phoneNumber,
        CountryIso: "KW",
        Services: this.state.services,
      };
    }

    this.institutionValidation(institution, action);
  };

  institutionValidation = (i, action) => {
    let valid = false;

    if (i.Name == "") {
      valid = false;
      this.setState({ validationMsg: "Name is requerid!" });
    } else if (i.PhoneNumber == "") {
      valid = false;
      this.setState({ validationMsg: "Phone number is requerid!" });
    } else if (i.Services.length < 1) {
      valid = false;
      this.setState({ validationMsg: "Must choice one service at least!" });
    } else {
      valid = true;
      this.setState({ validationMsg: "" });
    }

    if (valid) this.props.saveInstitution(i, action);
  };

  showError = (cond, message) => {
    if (cond !== "") {
      return <span className="err-message">{message}</span>;
    } else return "";
  };

  render() {
    const institutionObj = this.state.institution;
    const buttonText = institutionObj ? "Update" : "Add";

    return (
      <div>
        <div className="row" style={{ padding: "0 15px" }}>
          {this.showError(this.state.validationMsg, this.state.validationMsg)}
          {this.showError(this.props.error, this.props.error?.message)}
        </div>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="col-md-12" style={{ padding: "0px" }}>
            <div className="row form-group">
              <div className="col-md-6">
                <Label>Name</Label>
                <br />
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-6">
                <Label>Phone</Label>
                <br />
                <input
                  type="text"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={this.onChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-6">
                <Label>Services</Label>
                <br />
                <select
                  className="custom-select"
                  multiple
                  size="5"
                  defaultValue={this.state.services}
                  name="services"
                  onChange={this.onChange}
                >
                  {this.props.servicesList.map((service, index) => (
                    <option key={index} value={service.serviceId}>
                      {service.name}
                    </option>
                  ))}
                </select>
                {/* <PageHandler page = {institutionsList.page} getList={this.props.getInstitutionsList}/> */}
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="footerStyle">
              <button type="submit" style={{ float: "left" }}>
                {this.props.savedSuccessfully && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                {buttonText}{" "}
              </button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

//connect redux
const mapStateToProps = (state) => {
  return {
    servicesList: state.InstitutionStore.Services,
    token: state.Login.token,
    savedSuccessfully: state.InstitutionStore.Loading,
    error: state.InstitutionStore.error,
  };
};

const actionCreators = {
  getServiceList: InstitutionAction.getServicesList,
  saveInstitution: InstitutionAction.saveInstitution,
};

const connectInstitutionDetail = connect(
  mapStateToProps,
  actionCreators
)(InstitutionsDetail);
export { connectInstitutionDetail as InstitutionsDetail };
