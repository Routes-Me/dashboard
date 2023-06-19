import React, { Component } from "react";
import { connect } from "react-redux";
import * as TrackingAction from "../../../../Redux/Action";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import activeMarker from "../../../../images/active-marker.svg";
import selectedMarker from "../../../../images/idle-marker.svg";

import ClusterMarker from "./markers/ClusterMarker";
import SimpleMarker from "./markers/SimpleMarker";
import supercluster from "points-cluster";
import IdleTimer from "react-idle-timer";
import { parseJwt } from "../../../../util/encrypt";
import { restoreToken } from "../../../../util/localStorage";
import { trackingConstants } from "../../../../constants/trackingConstants";
import Modal from "../Dialog/Modal";
import { config } from "../../../../constants/config";
import { isSU } from "../../../../util/basic";

const MAP = {
  defaultZoom: 9,
  options: {
    minZoom: 8,
    maxZoom: 25,
    style: {
      position: "relative",
      margin: 0,
      padding: 0,
      flex: 1,
      height: "100vh",
      width: "100%",
    },
  },
};

class Tracking extends Component {
  constructor(props) {
    super(props);

    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);

    this.state = {
      loading: false,
      vehicles: [],
      closedVehicles: [],
      center: "",
      wheelLevel: "",
      zoom: this.props.zoom,
      hover: false,
      selectedId: "",
      currentPosition: false,
      mapOptions: {
        center: MAP.defaultCenter,
        zoom: MAP.defaultZoom,
      },
      clusters: [],
      timeout: 5 * 60 * 1000, //10000 * 20 * 1,
      showModal: false,
      isTimedOut: false,
      timeOffUnmount: "",
      activeCount: 0,
      toggleModel: false,
      status: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.movedVehicle !== undefined && props.movedVehicle !== "") {
      let i = state.vehicles.findIndex(
        (vehicle) => vehicle.id === props.movedVehicle.id
      );
      state.vehicles[i]
        ? (state.vehicles[i] = props.movedVehicle)
        : state.vehicles.push(props.movedVehicle);
      let vehicleList = state.vehicles;
      // console.log('Vehicle List Count', vehicleList.length);
      return {
        vehicles: vehicleList,
        activeCount: vehicleList.length,
      };
    }
  }

  //Clustering handled by 3rd Party Supercluster
  getClusters = () => {
    const clusters = supercluster(this.state.vehicles, {
      minZoom: 0,
      maxZoom: 16,
      radius: 60,
    });
    return clusters(this.state.mapOptions);
  };

  //Bounds are considered group markers : Radius & ZoomLevel
  createClusters = (props) => {
    //console.log("Map Bounds ==>", this.state.mapOptions.bounds)
    this.setState({
      clusters: this.state.mapOptions.bounds
        ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            text: numPoints,
            numPoints: numPoints,
            id: `${numPoints}_${points[0].id}`,
            points,
          }))
        : [],
    });
  };

  //Function called whenever there's an activity on the map
  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds,
        },
      },
      () => {
        this.createClusters();
      }
    );
  };

  handleScroll = (event) => {
    const delta = event?.deltaY;

    if (delta > 0) {
      // Zoom Out
      console.log("Zoom Out");
    } else if (delta < 0) {
      // Zoom In
      console.log("Zoom In");
    }
  };

  async componentDidMount() {
    let token = "";
    let user = "";
    if (this.props.token === "") {
      token = await restoreToken();
      user = token !== "" && parseJwt(token);
    } else {
      token = this.props.token;
      user = this.props.user;
    }

    this.props.connectTheHub(token);
    this.props.SubscribeToHub(this.props.role, user);
    this.props.getDevices(this.props.role, user);


  }

  componentWillUnmount() {
    this.setState({ timeOffUnmount: new Date().toLocaleTimeString() });
    //console.log('The unmounted time ==>', this.state.timeOffUnmount);
    this.props.UnSubscribeToHub();
    window.addEventListener("wheel", this.handleScroll);
  }

  //Time out Functionality
  _onAction(e) {
    if (this.state.isTimedOut) {
      this.props.SubscribeToHub(this.props.role, this.props.user);
    }
    this.setState({ isTimedOut: false });
  }

  //Time out Functionality
  _onActive(e) {
    if (this.state.isTimedOut) {
      this.props.SubscribeToHub(this.props.role, this.props.user);
    }
    this.setState({ isTimedOut: false });
  }

  //Time out Functionality
  _onIdle(e) {
    const isTimedOut = this.state.isTimedOut;
    if (!isTimedOut) {
      console.log("Timed Out!!!");
      // this.props.UnSubscribeToHub();
      // $('#exampleModal').modal("show");
      // this.setState({ showModal: true });
    } else {
      this.idleTimer.reset();
      this.setState({ isTimedOut: true });
    }
  }

  //current location check
  currentCoords = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    this.setState({
      center: { lat: latitude, lng: longitude },
      currentPosition: true,
    });
    this.forceUpdate();
    //console.log("Center function called ====> :", this.state.center);
  };

  //marker click
  onChildClick = (point) => {
    if (point.id === undefined) {
      return null;
    } else {
      let i = this.state.vehicles.findIndex(
        (vehicle) => vehicle.id === point.id
      );
      if (i > 0) {
        this.props.UpdateVehicle(this.state.vehicles[i]);
      } else {
        this.props.UpdateVehicle("");
      }
      this.setState({
        selectedId:
          this.props.idForSelectedVehicle === point.id ? "" : point.id,
      });

      this.props.UpdateTheSelectedMarker(
        this.props.idForSelectedVehicle === point.id ? "" : point.id
      );
    }
  };

  //style rendering
  markerStyleName(status, isGrouped, isSelected) {
    if (status === trackingConstants.IdleState) {
      return isGrouped
        ? "idle-cluster"
        : isSelected
        ? "select effect"
        : "idle-marker";
    } else {
      return isGrouped
        ? "active-cluster"
        : isSelected
        ? "select"
        : "active-marker";
    }
  }

  getIcon = (id) => {
    let icon = 1;
    if (this.props.idForSelectedVehicle !== undefined)
      icon =
        this.props.idForSelectedVehicle !== "" &&
        id !== this.props.idForSelectedVehicle
          ? 0.6
          : 1;
    return icon;
  };

  returnModel = (show, vehicleList) => {
    return (
      <Modal
        show={show}
        onClose={this.handleClose}
        objectType={this.state.status}
        objectList={vehicleList}
        onSelect={this.props.getVehiclesLog}
      />
    );
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  compare = () => {
    const lat = 29.3416346;
    const lng = 48.0922927;
    let items = [];
    const { vehicles } = this.state;

    for (let i = 0; i < this.state.vehicles.length; i++) {
      for (let j = i + 1; j < this.state.vehicles.length; j++) {
        // Compare array[i] with array[j]
        let dis = this.calculateDistance(
          vehicles[i].coordinates.lat,
          vehicles[i].coordinates.lng,
          vehicles[j].coordinates.lat,
          vehicles[j].coordinates.lng
        );

        if (dis.toFixed(0) <= 4) {
          items.push({
            ve1: vehicles[i],
            ve2: vehicles[j],
            distance: dis.toFixed(0),
          });
        }
      }
    }

    return items;
  };

  calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    const toRadians = (degrees) => {
      return (degrees * Math.PI) / 180;
    };

    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;
    return distance;
  };

  sortClosedItemsIntoGroups = (items) => {
    const sortedArrays = items.reduce((acc, item) => {
      // Find the array corresponding to the item's category
      const categoryArray = acc.find(
        (arr) => arr[0].distance === item.distance
      );

      if (categoryArray) {
        // Add the item to the existing category array
        categoryArray.push(item);
      } else {
        // Create a new category array and add the item to it
        acc.push([item]);
      }

      return acc;
    }, []);

    return sortedArrays;
  };

  removeDuplicateObjects = (array, identifier) => {
    const uniqueArray = [];
    const keys = new Set();

    array.forEach((obj) => {
      const key = obj.ve1[identifier];
      const key2 = obj.ve2[identifier];

      if (!keys.has(key) && !keys.has(key2)) {
        keys.add(key);
        keys.add(key2);
        uniqueArray.push(obj);
      }
    });
    return uniqueArray;
  };

   isScrolling = (event) => {
    console.log("X scroll direction:", event.deltaX);
    console.log("Y scroll direction:", event.deltaY);
    console.log("Z scroll direction:", event.deltaZ);
    console.log("Scroll Mode is:", event.deltaMode);
}

 handleWheel = (event) => {
  // Access the wheel event properties
  const { deltaX, deltaY } = event;

  // Perform desired logic based on wheel event properties
  console.log('Delta X:', deltaX);
  console.log('Delta Y:', deltaY);
};

  render() {
    if (this.state.vehicles.length == 120) {
      // let closed = this.compare();
      // let uniques = this.removeDuplicateObjects(closed, "id");
      // let sortedArrays = this.sortClosedItemsIntoGroups(uniques);
      // console.log("Markers groups are:", sortedArrays);
    }


    const position = [29.378586, 47.990341];
    //L.Marker.prototype.options.icon = activeIcon;
    //const { results } = this.props;
    const { center } = this.state.center;
    const { clusters, selectedId } = this.state;
    const vehicles = this.state.vehicles;
    const devicesCount = this.props.VehicleList.pagination?.total;
    const idleVehicleCount = devicesCount - this.state.activeCount;


    let activeIcon = L.icon({
      iconUrl: activeMarker,
      iconSize: [25, 25],
    });
    // https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
    return (
      <div  style={{ height: "100vh", width: "100%" }}>
        {this.returnModel(this.state.showModal, this.props.vehicleLog)}

        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={this.state.timeout}
        />

        <MapContainer
          center={position}
          
          zoom={10}
          maxZoom={20}
          minZoom={9}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%" }}
        >
          <div
            className="activeCount"
            onClick={(e) => {
              this.setState({ showModal: true, status: config.onlineVehicles });
            }}
          >
            <h4 style={{ margin: "10px" }}>{this.state.activeCount}</h4>
          </div>
          <div
            className="idleCount"
            onClick={(e) => {
              this.setState({
                showModal: true,
                status: config.offlineVehicles,
              });
            }}
          >
            {/*isSU(this.props.role) && */}
            <h4 style={{ margin: "10px" }}>
              {idleVehicleCount > 0 ? idleVehicleCount : 0}
            </h4>
          </div>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {vehicles.map((point) => (
            <Marker
              icon={activeIcon}
              key={point.id}
              opacity={this.getIcon(point.id)}
              position={[point.coordinates.lat, point.coordinates.lng]}
              eventHandlers={{
                click: () => {
                  this.onChildClick(point);
                },
              }}
            ></Marker>

            // <SimpleMarker
            //         style={this.markerStyleName(point.status, false, point.id === this.props.idForSelectedVehicle)}
            //         key={point.id}
            //         text={point.id}
            //         lat={point.coordinates.lat}
            //         lng={point.coordinates.lng} />
          ))}
        </MapContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //result: points,
    VehicleList: state.Tracking.IdleVehicles, //state.VehicleStore.Vehicles,
    idForSelectedVehicle: state.Tracking.idForSelectedVehicle,
    vehicleLog: state.Tracking.VehicleLog,
    movedVehicle: state.Tracking.MovedVehicle,
    token: state.Login.token,
    user: state.Login.user,
    role: state.Login.role,
  };
};

const actionCreators = {
  connectTheHub: TrackingAction.InitializeHub,
  getDevices: TrackingAction.getDevices,
  getVehiclesLog: TrackingAction.getVehiclesLog,
  SubscribeToHub: TrackingAction.SubscribeToHub,
  UnSubscribeToHub: TrackingAction.UnsubscribeFromHub,
  UpdateTheSelectedMarker: TrackingAction.updateSelectedMarker,
  UpdateVehicle: TrackingAction.updateVehicle,
};

const connectedTracking = connect(mapStateToProps, actionCreators)(Tracking);
export { connectedTracking as default };
