import React from "react";
import { connect } from "react-redux";
import { Label } from "reactstrap";
import * as InstitutionAction from "../../../../Redux/Action";
import * as AdvertisementAction from "../../../../Redux/Action";
import Form from "react-validation/build/form";
import { config } from "../../../../constants/config";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import cookie from "react-cookies";
import { getToken } from "../../../../util/localStorage";
import apiHandler from "../../../../util/request";
const apiURL = process.env.REACT_APP_APIDOMAIN;

var ads = "";
class CampaignsDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      campaignId: "",
      title: "",
      startAt: "",
      endAt: "",
      campaign: "",
      ads: [],
      loading: false,
      updated: false,
    };
    this.renderAllAdvertisementTable =
      this.renderAllAdvertisementTable.bind(this);
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Get advertisment list by campaign id
  componentDidMount() {
    apiHandler
      .get(`campaigns/${this.state.campaignId}/advertisements`)
      .then((res) => {
        this.setState({ ads: res.data.data });
      })
      .catch((err) => console.log(err));
  }

  static getDerivedStateFromProps(props, state) {
    if (props.campaignToDisplay !== undefined) {
      if (props.campaignToDisplay.campaignId !== state.campaignId) {
        return {
          campaign: props.campaignToDisplay,
          campaignId: props.campaignToDisplay.campaignId,
          title: props.campaignToDisplay.title,
          startAt: props.campaignToDisplay.startAt.substr(0, 10),
          endAt: props.campaignToDisplay.endAt.substr(0, 10),
        };
      }
    }
  }

  // On drag action
  handleOnDragEnd = (result) => {
    let token = cookie.load("token");
    this.setState({ loading: true, updated: false });
    if (!result.destination) return;
    // ordering the ads
    const items = this.state.ads;
    const destinationIndex = result.destination.index;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(destinationIndex, 0, reorderedItem);
    this.setState({ ads: items });

    // body of the rquest
    const body = {
      AdvertisementId: result.draggableId.substr(0, 11), // removing the index from the id to send send it clean
      Sort: destinationIndex,
    };
    console.log(body);
    /// Calling Sort API
    fetch(`${apiURL}campaigns/A1090709165/broadcasts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ loading: false, updated: true });
        console.log("Success:", data);
      })
      .catch((error) => {
        this.setState({ loading: true, updated: false });
        console.error("Error:", error);
      });
  };

  //Load Advertisements in a table
  renderAllAdvertisementTable() {
    return (
      <div
        className="table-list"
        style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
      >
        <div className="list-header">
          <h4>Sort the advertisements:</h4>
          <div>
            {this.state.updated && (
              <>
                <p>Playlist updated</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check-all"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
                </svg>
              </>
            )}
            {this.state.loading && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
        <DragDropContext onDragEnd={this.handleOnDragEnd}>
          <Droppable droppableId="drag">
            {(provided) => (
              <ul
                className="draggeble-ads"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.state.ads?.map(({ advertisementId, name }, index) => {
                  return (
                    <Draggable
                      key={index}
                      draggableId={advertisementId + `${index}`} // mergig the id with the index in order to take the id and send it in the request
                      test={"test"}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className="drag-item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <p>
                            {index + 1} - {name}
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }

  //Submit button action
  handleSubmit = (event) => {
    event.preventDefault();
    let action = "";
    let campaign = "";
    {
      this.state.campaign.campaignId ? (action = "save") : (action = "add");
    }
    if (action === "add") {
      campaign = {
        Title: this.state.title,
        StartAt: this.state.startAt,
        EndAt: this.state.endAt,
        Status: "active",
      };
    } else {
      campaign = {
        CampaignId: this.state.campaignId,
        Title: this.state.title,
        StartAt: this.state.startAt,
        EndAt: this.state.endAt,
        Status: "active",
      };
    }

    this.props.saveCampaign(campaign, action);
  };

  render() {
    // let content = this.renderAllAdvertisementTable(this.props.AdvertisementList);
    let token = cookie.load("token");
    console.log(token);
    const institutionObj = this.state.campaignId;

    const buttonText = institutionObj ? "Update" : "Add";
    console.log(this.state.ads);
    return (
      <div>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="col-md-12" style={{ padding: "0px" }}>
            <div className="row form-group">
              <div className="col-md-6">
                <Label>Title</Label>
                <br />
                <input
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-6">
                <Label>Start At</Label>
                <br />
                <input
                  type="date"
                  name="startAt"
                  value={this.state.startAt}
                  onChange={this.onChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-md-6">
                <Label>End At</Label>
                <br />
                <input
                  type="date"
                  name="endAt"
                  value={this.state.endAt}
                  onChange={this.onChange}
                  className="form-control"
                />
              </div>
            </div>

            <br />
            <br />
          </div>
          <div className="container-fluid">
            <div className="footerStyle">
              <button type="submit" style={{ float: "left" }}>
                {buttonText}
              </button>
            </div>
          </div>
        </Form>
        {this.state.campaignId && <this.renderAllAdvertisementTable />}
      </div>
    );
  }
}

//connect redux
const mapStateToProps = (state) => {
  return {
    AdvertisementList: state.AdvertisementStore.Advertisements,
    servicesList: state.InstitutionStore.Services,
    savedSuccessfully: state.InstitutionStore.Loading,
  };
};

const actionCreators = {
  getServiceList: InstitutionAction.getServicesList,
  saveCampaign: InstitutionAction.saveCampaign,
  getAdvertisementsForCampaign: AdvertisementAction.getAdvertisements,
};

const connectCampaignsDetail = connect(
  mapStateToProps,
  actionCreators
)(CampaignsDetail);
export { connectCampaignsDetail as CampaignsDetail };
