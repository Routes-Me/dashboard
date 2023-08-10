import React from "react";
import { connect } from "react-redux";
import * as AdvertisementAction from "../../../../Redux/Action";
import * as InstitutionAction from "../../../../Redux/Action";
import { Basic } from "./Detail/Basic";
import { Extras } from "./Detail/Extras";
import ReactPlayer from "react-player";
import "../Advertisements/Advertisement.css";
import { config } from "../../../../constants/config";
import LoopCircleLoading from "react-loadingg/lib/LoopCircleLoading";
import { advertisementsConstants } from "../../../../constants/advertisementConstants";
import { returnObjectForSelectedId } from "../../../../util/basic";

class AdvertisementsDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: "",
      videoUrl: "",
      imageUrlToDis: "",
      videoUrlToDis: "",
      tabIndex: 1,
      advertisementToDis: null,
      advertisement: {
        advertisementId: "",
        campaigns: [],
        institution: "",
        intervalId: "",
        InvertedTintColor: 0,
        resourceName: "",
        tintColor: "",
      },
      promotionToDis: "",
      promotion: {
        title: "",
        subtitle: "",
        code: "",
        weblink: "",
        androidLink: "",
        iOSLink: "",
        startDate: "",
        endDate: "",
        useageLimit: 0,
        shareQR: false,
        type: "",
      },
      validateMsg: "",
      file: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    let ad = props.advertisementToDisplay;
    if (ad !== undefined) {
      if (ad !== state.advertisement) {
        return {
          advertisementToDis: ad === undefined ? false : ad,
          imageUrlToDis: ad.media?.MediaType === "image" ? ad.media.Url : "",
          videoUrlToDis: ad.media?.MediaType === "video" ? ad.media.Url : "",
          promotionToDis: ad.promotion,
        };
      }
    }
  }

  fileChangedHandler = async (event) => {
    console.log("state updated 2");

    let file = event.target.files[0];
    if (file !== undefined) {
      console.log(file);
      this.setState({ file: file });
      var localFilePath = URL.createObjectURL(event.target.files[0]);
      file.type.includes("video")
        ? this.setState({ videoUrl: localFilePath, imageUrl: undefined })
        : this.setState({ videoUrl: undefined, imageUrl: localFilePath });
    }
  };

  uploadImage = async (event) => {
    let file = event.target.files[0];
    console.log("file", file);
    if (!file.type.includes("video")) {
      var localFilePath = URL.createObjectURL(file);
      this.setState({ file2: file });
      this.setState({ imageUrl: localFilePath });
    }
  };

  onChangeRadioButton = (event) => {
    const share = event.target.value === "on" ? true : false;
    this.setState((prevState) => ({
      promotion: { ...prevState.promotion, shareQR: share },
    }));
  };

  componentDidMount() {
    this.props.getCampaigns(1);
    this.props.getDayIntervals();
    this.props.getInstitutions(1, config.DropDownLimit);

    // Setting ad values to display
    if (this.state.advertisementToDis !== null) {
      this.setState({
        advertisement: {
          ...this.state.advertisement,
          resourceName: this.state.advertisementToDis.resourceName,
          advertisementId: this.state.advertisementToDis.id,
          institution:
            this.state.advertisementToDis?.institution?.institutionId,
          intervalId: this.state.advertisementToDis.intervalId,
          tintColor: this.state.advertisementToDis.tintColor,
          campaigns: this.state.advertisementToDis.campaigns,
        },
      });

      if (this.state.advertisementToDis.media.MediaType === "image") {
        this.setState({
          imageUrl: this.state.advertisementToDis?.media?.Url,
        });
      } else {
        this.setState({
          videoUrl: this.state.advertisementToDis?.media?.Url,
        });
      }

      this.setState({
        promotion: {
          ...this.state.promotion,
          title: this.state.promotionToDis?.Title,
          subtitle: this.state.promotionToDis?.Subtitle,
          code: this.state.promotionToDis?.code,
          weblink: this.state.promotionToDis?.weblink,
          androidLink: this.state.promotionToDis?.androidLink,
          iOSLink: this.state.promotionToDis?.iOSLink,
          startDate: this.state.promotionToDis?.CreatedAt,
          endDate: this.state.promotionToDis?.endDate,
          useageLimit: this.state.promotionToDis?.useageLimit,
          shareQR: this.state.promotionToDis?.shareQR,
          type: this.state.promotionToDis?.Type,
        },
      });
    }
  }

  // handle promotions inputs
  onPromotionChange = (event) => {
    const returnedValue = event.target.value;
    const returnedKey = event.target.name;

    this.setState((prevState) => ({
      promotion: { ...prevState.promotion, [returnedKey]: returnedValue },
    }));
  };

  // Handle basic ad inputs
  onChange = (event) => {
    const returnedValue = event.target.value;
    const returnedKey = event.target.name;

    if (returnedKey === "campaigns") {
      let camps = Array.isArray(this.state.advertisement.campaigns) ? [...this.state.advertisement.campaigns] : [];
      camps.push(returnedValue);
      this.setState((prevState) => ({
        advertisement: {
          ...prevState.advertisement,
          campaigns: camps,
        },
      }));
    }else {
      this.setState((prevState) => ({
        advertisement: {
          ...prevState.advertisement,
          [returnedKey]: returnedValue,
        },
      }));
    }
    // console.log('onChange Advertisement ', this.state.advertisement);
  };

  onTabClick = (index) => {
    this.setState({ tabIndex: index });
  };

  submitForm = (e) => {
    let advertisement = {
      advertisement: this.state.advertisement,
      promotion: this.state.promotion,
      file: this.state.file !== "" ? this.state.file : "",
    };

    this.formValidation(advertisement);
  };

  // Validation form
  formValidation = (advertisement) => {
    let ad = advertisement.advertisement;
    let valid = false;

    if (advertisement.file === "") {
      if (this.state.advertisementToDis?.media === undefined) {
        this.setState({ validateMsg: "File is required!" });
        valid = false;
      } else valid = true;
    }

    if (ad.resourceName === "" || ad.resourceName === undefined) {
      console.log("name missing");
      this.setState({ validateMsg: "Name field is required!" });
      valid = false;
    } else if (ad.intervalId === "" || ad.intervalId === undefined) {
      this.setState({ validateMsg: "Please select an Interval!" });
      valid = false;
    } else if (ad.campaigns.length === 0) {
      console.log("campaign here", ad.campaigns.length);
      this.setState({ validateMsg: "Campaign is missing! " });
      valid = false;
    } else if (ad.tintColor === "") {
      this.setState({ validateMsg: "Tint color is required!" });
      valid = false;
    } else if (ad.institution === "" || ad.institution === undefined) {
      this.setState({ validateMsg: "Please select an institution!" });
      valid = false;
    } else {
      this.setState({ validateMsg: "" });
      valid = true;
    }

    if (valid) {
      console.log("valid");
      this.setState({ validateMsg: "" });
      this.props.saveAdvertisement(
        advertisement,
        this.state.advertisementToDis?.media
      );
    }
  };

  render() {
    const imageText =
      this.state.imageUrl === "" ? "160 X 600" : this.state.imageUrl;
    const videoText =
      this.state.videoUrl === "" ? "1280 X 720" : this.state.videoUrl;
    const tabIndex = this.state.tabIndex;
    return (
      <div className="container-fluid" style={{ paddingLeft: "0px" }}>
        <div className="row col-md-12 detail-form">
          <div className="headerTabStyle">
            <nav>
              <div
                className="nav nav-tabs nav-fill"
                id="nav-tab"
                role="tablist"
              >
                <a
                  className={`nav-item nav-link ${tabIndex === 1 && "active"}`}
                  id="nav-home-tab"
                  data-toggle="tab"
                  onClick={(e) => this.onTabClick(1)}
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Basic
                </a>
                <a
                  className={`nav-item nav-link ${tabIndex === 2 && "active"}`}
                  id="nav-profile-tab"
                  data-toggle="tab"
                  onClick={(e) => this.onTabClick(2)}
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  QR Code Promotion
                </a>
              </div>
            </nav>
          </div>
          <div className="row col-md-12 detail-form">
            <div className="col-md-6 col-sm-12" style={{ paddingLeft: "0px" }}>
              {this.state.tabIndex === 1 ? (
                <Basic
                  advertisementToDisplay={this.state.advertisement}
                  onChange={this.onChange}
                  fileChangedHandler={this.fileChangedHandler}
                  uploadImage={this.uploadImage}
                />
              ) : (
                <Extras
                  promotionToDisplay={this.state.promotion}
                  onChange={this.onPromotionChange}
                  onChangeRadioButton={this.onChangeRadioButton}
                />
              )}
            </div>

            <div className="col-md-6">
              <div className="col-md-12 simulator">
                <div className="container row topPanel">
                  <div className="banner1">
                    {this.state.videoUrl === "" ? (
                      videoText
                    ) : videoText === advertisementsConstants.uploadProgress ? (
                      <LoopCircleLoading
                        color="#234391"
                        style={{ width: "4em", height: "auto" }}
                      />
                    ) : (
                      <ReactPlayer
                        width="100%"
                        height="100%"
                        controls
                        url={videoText}
                      />
                    )}
                  </div>
                  <div className="banner2">
                    {this.state.imageUrl === "" ? (
                      imageText
                    ) : imageText === advertisementsConstants.uploadProgress ? (
                      <LoopCircleLoading
                        color="#234391"
                        style={{ width: "4em", height: "auto" }}
                      />
                    ) : (
                      <img className="img-fluid" alt="" src={imageText} />
                    )}
                  </div>
                </div>
                <div className="container row bottomPanel">
                  <div className="banner3">
                    <p>{this.state.promotion?.title}</p>
                    <br />
                    <p></p>
                  </div>
                  <div className="banner4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footerStyle">
          <button
            type="submit"
            style={{ float: "left" }}
            onClick={(e) => this.submitForm()}
          >
            {this.props.Loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            ) : (<span>Create</span>)}
            
          </button>

          {this.state.validateMsg !== "" && (
            <span className="err-message">{this.state.validateMsg}</span>
          )}

          <button
            className={this.state.tabIndex !== 1 ? "next" : "btn btn-light"}
            style={{ marginLeft: "107px" }}
            onClick={(e) => this.onTabClick(1)}
          >
            <span
              className="glyphicon glyphicon-menu-left"
              aria-hidden="true"
            />{" "}
            Previous
          </button>
          <button
            className={this.state.tabIndex !== 2 ? "next" : "btn btn-light"}
            style={{ marginLeft: "7px" }}
            onClick={(e) => this.onTabClick(2)}
          >
            {" "}
            Next: Extras
            <span
              className="glyphicon glyphicon-menu-right"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    );
  }
}

//connect redux
const mapStateToProps = (state) => {
  return {
    InstitutionList: state.InstitutionStore.Institutions,
    Loading: state.AdvertisementStore.loading,
    ApplicationState: state.AdvertisementStore.ActionState,
  };
};

const actionCreators = {
  getCampaigns: AdvertisementAction.getCampaigns,
  getDayIntervals: AdvertisementAction.getDayIntervals,
  getInstitutions: InstitutionAction.getInstitutions,
  saveAdvertisement: AdvertisementAction.saveAdvertisement,
};

const connectAdvertisementDetail = connect(
  mapStateToProps,
  actionCreators
)(AdvertisementsDetail);
export { connectAdvertisementDetail as AdvertisementsDetail };
