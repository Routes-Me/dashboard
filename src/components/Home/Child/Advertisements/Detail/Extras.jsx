import React from "react";
import { connect } from "react-redux";
import { Label } from "reactstrap";
import * as AdvertisementAction from "../../../../../Redux/Action";
import Form from "react-validation/build/form";
import "../../Advertisements/Advertisement.css";

class Extras extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 1,
    };
  }

  onTabClick = (index) => {
    this.setState({ tabIndex: index });
  };

  render() {
    const tabIndex = this.state.tabIndex;
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Routes enables you to add a promoted QR code connected to the
          advertisement
        </label>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="row form-group">
              <div className="col-md-12">
                <Label>Title</Label>
                <br />
                <input
                  type="text"
                  name="title"
                  value={this.props.promotionToDisplay?.title}
                  onChange={this.props.onChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-12">
                <Label>Subtitle</Label>
                <br />
                <input
                  type="text"
                  name="subtitle"
                  value={this.props.promotionToDisplay?.subtitle}
                  onChange={this.props.onChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-12">
                <Label>Promotion Code</Label>
                <br />
                <input
                  type="text"
                  name="code"
                  value={this.props.promotionToDisplay?.code}
                  onChange={this.props.onChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="headerTabStyle">
              <nav>
                <div
                  className="nav nav-tabs nav-fill"
                  id="nav-tab"
                  role="tablist"
                >
                  <a
                    className={`nav-item nav-link ${
                      tabIndex === 1 && "active"
                    }`}
                    id="nav-home-tab"
                    data-toggle="tab"
                    onClick={(e) => this.onTabClick(1)}
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    {" "}
                    Links
                  </a>
                  <a
                    className={`nav-item nav-link ${
                      tabIndex === 2 && "active"
                    }`}
                    id="nav-profile-tab"
                    data-toggle="tab"
                    onClick={(e) => this.onTabClick(2)}
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    {" "}
                    Coupons
                  </a>
                </div>
              </nav>
            </div>

            <div
              style={{ display: this.state.tabIndex === 1 ? "block" : "none" }}
            >
              <div className="row form-group">
                <div className="col-md-12">
                  <Label>Web Link</Label>
                  <br />
                  <input
                    type="text"
                    name="weblink"
                    value={this.props.promotionToDisplay?.weblink}
                    onChange={this.props.onChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row form-group">
                <div className="col-md-12">
                  <Label>Android Link</Label>
                  <br />
                  <input
                    type="text"
                    name="androidLink"
                    value={this.props.promotionToDisplay?.androidLink}
                    onChange={this.props.onChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row form-group">
                <div className="col-md-12">
                  <Label>iOS Link</Label>
                  <br />
                  <input
                    type="text"
                    name="iOSLink"
                    value={this.props.promotionToDisplay?.iOSLink}
                    onChange={this.props.onChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div
              style={{ display: this.state.tabIndex === 2 ? "block" : "none" }}
            >
              <div className="row form-group">
                <div className="col-md-12">
                  <Label>Starts At</Label>
                  <br />
                  <input
                    type="date"
                    name="startDate"
                    value={this.props.promotionToDisplay?.startDate}
                    onChange={this.props.onChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row form-group">
                <div className="col-md-12">
                  <Label>Ends At</Label>
                  <br />
                  <input
                    type="date"
                    name="endDate"
                    value={this.props.promotionToDisplay?.endDate}
                    onChange={this.props.onChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row form-group">
                <div className="col-md-12">
                  <Label>Useage Limit</Label>
                  <br />
                  <input
                    type="number"
                    name="useageLimit"
                    value={this.props.promotionToDisplay?.useageLimit}
                    onChange={this.props.onChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row form-group">
                <div className="col-md-12">
                  <Label>Enable Share QR Code</Label>
                  <label className="radio-inline">
                    <input
                      type="radio"
                      name="shareQR"
                      onChange={this.props.onChangeRadioButton}
                      checked={this.state.shareQR}
                    />{" "}
                    Yes
                  </label>
                  <label className="radio-inline">
                    <input
                      type="radio"
                      name="shareQR"
                      onChange={this.props.onChangeRadioButton}
                      checked={!this.state.shareQR}
                    />{" "}
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

//connect redux
const mapStateToProps = (state) => {
  return {
    DayInterval: state.AdvertisementStore.DayIntervals,
    Campaigns: state.AdvertisementStore.Campaigns,
    InstitutionId: state.Login.user.institution.institutionid,
  };
};

const actionCreators = {
  updateTitle: AdvertisementAction.onTitleChange,
  updateSubtitle: AdvertisementAction.onSubTitleChange,
  savePromotion: AdvertisementAction.savePromotions,
};

const connectAdvertisementDetail = connect(
  mapStateToProps,
  actionCreators
)(Extras);
export { connectAdvertisementDetail as Extras };
