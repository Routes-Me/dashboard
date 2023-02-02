import React from "react";
import { connect } from "react-redux";
import { Label } from "reactstrap";
import Form from "react-validation/build/form";
import * as AdvertisementAction from "../../../../../Redux/Action";
import * as InstitutionAction from "../../../../../Redux/Action";
import "../../Advertisements/Advertisement.css";
import { config } from "../../../../../constants/config";
import PageHandler from "../../PageHandler";

class Basic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getCampaigns(1, config.DropDownLimit);
    this.props.getDayIntervals();
    this.props.getInstitutions(1, config.DropDownLimit);
  }

  checkIfHex = (value) => {
    const colorStr = value.toString(16);
    return colorStr.startsWith("#") ? colorStr : `#${colorStr}`;
  };

  render() {
    // {this.state.submit && this.handleSubmit()}
    return (
      <div className="container-fluid" style={{ paddingLeft: "0px" }}>
        <label>
          Create an advertisment that runs interactively on taxi screens,
          Complete the Basics tab then Create to add the advertisment or review
          each tab for full customization
        </label>
        <br />
        <Form
          onSubmit={(e) => this.handleSubmit(e)}
          style={{ marginBottom: "40px" }}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="row form-group">
                <div className="col-md-12">
                  <Label>Name</Label>
                  <br />
                  <input
                    type="text"
                    name="resourceName"
                    value={this.props.advertisementToDisplay.resourceName}
                    onChange={this.props.onChange}
                    required
                    className="form-control"
                  />
                  <span className="form-error is-visible">
                    {this.state.errorText}
                  </span>
                </div>
              </div>

              <div className="row form-group">
                <div className="col-md-12">
                  <Label>Day Interval</Label>
                  <br />
                  <select
                    defaultValue={this.props.advertisementToDisplay.intervalId}
                    className="custom-select my-1 mr-sm-2"
                    required
                    name="intervalId"
                    onChange={this.props.onChange}
                  >
                    {this.props.DayInterval.map((interval) => (
                      <option
                        className="dropdown-item"
                        value={interval.intervalId}
                      >
                        {interval.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row form-group">
                <div className="col-md-12">
                  <Label>Upload File</Label>
                  {/*<div className="progress">
                                    <div className="progress-bar progress-bar-striped progress-bar-animated"
                                        role="progressbar"
                                        aria-valuenow={this.props.onProgress}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: this.props.onProgress + "%" }}>
                                        {this.props.onProgress}%
                                    </div>
                                    </div>*/}
                  <div className="form-group files">
                    <input
                      type="file"
                      required
                      className="form-control"
                      onChange={this.props.fileChangedHandler}
                    />
                  </div>
                </div>
              </div>

              {/* <div className="row form-group">
                <div className="col-md-12">
                  <Label>Upload Image</Label>

                  <div className="form-group files">
                    <input
                      type="file"
                      required
                      className="form-control"
                      onChange={this.props.uploadImage}
                    />
                  </div>
                </div>
              </div> */}

              <div className="row form-group">
                <div className="col-md-12">
                  <Label>Campaigns</Label>
                  <br />
                  <select
                    className="custom-select"
                    required
                    size="6"
                    value={
                      this.props.advertisementToDisplay.campaigns.lenght > 0
                        ? this.props.advertisementToDisplay.campaigns[0]
                        : this.props.advertisementToDisplay.campaigns
                    }
                    name="campaigns"
                    onChange={this.props.onChange}
                  >
                    <option key={0} className="dropdown-item" value={0}>
                      Select a campaign
                    </option>
                    {this.props.Campaigns.data?.map((campaign) => (
                      <option
                        className="dropdown-item"
                        value={campaign.campaignId}
                      >
                        {campaign.title}
                      </option>
                    ))}
                  </select>
                  <PageHandler
                    page={this.props.Campaigns?.page}
                    getList={this.props.getCampaigns}
                  />
                </div>
              </div>

              <div className="row form-group">
                <div className="col-md-12">
                  <Label>Tint Color</Label>
                  <br />
                  <input
                    type="color"
                    name="tintColor"
                    required
                    value={
                      this.props.advertisementToDisplay.tintColor &&
                      this.checkIfHex(
                        this.props.advertisementToDisplay.tintColor
                      )
                    }
                    onChange={this.props.onChange}
                    className="form-control"
                  />
                  <span className="form-error is-visible">
                    {this.state.errorText}
                  </span>
                </div>
              </div>

              {/* <div className="row form-group">
                                <div className="col-md-12">
                                    <Label>Inverted Tint Color</Label><br />
                                    <input type="color" name="invertedTintColor"
                                        value={this.state.invertedTintColor}
                                        onChange={this.onChange}
                                        className="form-control"/>
                                    <span className="form-error is-visible">{this.state.errorText}</span>
                                </div>
                            </div> */}

              <div className="row form-group" style={{ marginBottom: "40px" }}>
                <div className="col-md-12">
                  <Label>Institution</Label>
                  <br />
                  <input
                    type="text"
                    name="institution"
                    required
                    value={
                      this.props.advertisementToDisplay.institution
                        ? this.props.advertisementToDisplay.institution.name
                        : "Please select a institution"
                    }
                    onChange={this.onChange}
                    className="form-control"
                  />
                  <select
                    className="custom-select"
                    size="6"
                    value={
                      this.props.advertisementToDisplay.institution
                        ?.institutionId
                    }
                    name="institution"
                    onChange={this.props.onChange}
                  >
                    <option key={0} className="dropdown-item" value={0}>
                      Select an Institution
                    </option>
                    {this.props.InstitutionList.data?.map((institution) => (
                      <option
                        className="dropdown-item"
                        value={institution.institutionId}
                      >
                        {institution.name}
                      </option>
                    ))}
                  </select>
                  <PageHandler
                    page={this.props.InstitutionList?.page}
                    getList={this.props.getInstitutions}
                  />
                </div>
              </div>
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
    DayInterval: [
      config.selectDayInterval,
      ...state.AdvertisementStore.DayIntervals,
    ],
    Campaigns: state.AdvertisementStore.Campaigns,
    InstitutionList: state.InstitutionStore.Institutions,
    onProgress: state.AdvertisementStore.progress,
  };
};

const actionCreators = {
  getCampaigns: AdvertisementAction.getCampaigns,
  getDayIntervals: AdvertisementAction.getDayIntervals,
  getInstitutions: InstitutionAction.getInstitutions,
};

const connectAdvertisementDetail = connect(
  mapStateToProps,
  actionCreators
)(Basic);

export { connectAdvertisementDetail as Basic };
