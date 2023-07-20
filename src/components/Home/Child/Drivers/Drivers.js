import React, { useEffect, useMemo, useRef, useState } from "react";
import * as DriversAction from "../../../../Redux/Action/DriversAction";
import * as getInstitutions from "../../../../Redux/Action/InstitutionAction";
import "./driver.css";
import { connect } from "react-redux";
import PageHandler from "../PageHandler";

const editIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-pencil-square"
    viewBox="0 0 16 16"
  >
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
    <path
      fill-rule="evenodd"
      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
    />
  </svg>
);

function Drivers(props) {
  const [name, setName] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [institutionId, setInstitutionId] = useState();
  const [institutions, setInstitutions] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [comingTotal, setComingTotal] = useState(20);
  const [drivers, setDrivers] = useState({});
  const [errorMsg, setErrMsg] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [nextPage, setNextPage] = useState(null);
  const [somethingWrong, setSomeThingWrong] = useState(false);
  const ref = useRef();
  const dModalref = useRef();

  useEffect(() => {
    getData();
  }, []);

  const getData = (current=1) => {
    props.getInstitutions(1, 20);
    props.getDrivers(current, 20);
  };

  const handleSubmit = () => {
    const driver = {
      PhoneNumber: phonenumber,
      InstitutionId: 3, // fake data
      Name: name,
    };
    validation(driver);
  };

  const validation = (driver) => {
    if (selectedDriver === undefined) {
      // Post mode
      if (name === undefined) setErrMsg("Name is required!");
      else if (phonenumber === undefined) setErrMsg("Phone number missing!");
      else if (institutionId === undefined)
        setErrMsg("Select institution please!");
      else if (
        name !== undefined &&
        phonenumber !== undefined &&
        institutionId !== undefined
      ) {
        setErrMsg();
        props.postDriver(driver);
      }
    } else {
      // Edit mode
      if (name === undefined) setErrMsg("Name is required!");
      else if (phonenumber === undefined) setErrMsg("Phone number missing!");
      if (name !== undefined && phonenumber !== undefined) {
        let newData = {
          DriverId: selectedDriver.driverId,
          ...driver,
        };
        props.editDriver(newData);
      }
    }
  };
  useEffect(() => {
    setSomeThingWrong(props.DriversList.hasError);
    if (props.hasSuccesed.posthasSuccesed === true) {
      closeM();
      getData();
    }
  }, [props]);

  useEffect(() => {
    setInstitutions(props.institutionList?.data);
  }, [props.institutionList]);



  useEffect(() => {
    setDrivers(props.DriversList?.Drivers)
    calculatePages(props.DriversList?.Drivers)

  }, [props.DriversList?.Drivers]);


  const handleEdit = (driver) => {
    showM();
    setSelectedDriver(driver);
    setName(driver?.name);
    setPhoneNumber(driver?.phoneNumber);
  };

  const closeM = () => {
    ref.current.classList.remove("show");
    dModalref.current.classList.remove("show");
  };
  const showM = () => {
    ref.current.classList.add("show");
  };

  const showDModal = (driver) => {
    setSelectedDriver(driver);
    dModalref.current.classList.add("show");
  };

  const handleDelete = () => {
    props.deleteDriver(selectedDriver?.driverId);
  };

  setTimeout(() => {
    setSomeThingWrong(false);
  }, 5000);

  const hasErr = () => {
    return somethingWrong ? (
      <div
        style={{ width: "400px", margin: "10px auto" }}
        class="alert alert-danger"
        role="alert"
      >
        something went wrong, please try again!
      </div>
    ) : (
      ""
    );
  };

  // Search functionality
  const handleSearch = () => {
    props.searchDriver(searchTerm);
  };

  const handleNextPagination = () => {
    let current = currentPage
    current++
    getData(current)
    setCurrentPage(current)
    setNextPage(true)
  }
  const handlePrevPagination = () => {
    let current = currentPage
    current--
    getData(current)
    setCurrentPage(current)
    setNextPage(false)
  }

  setTimeout(() => {
    setNextPage(null)
  }, 2000);

  const calculatePages = (comesData) => {
    const getPrevValue = (prev) => (Number.isNaN(prev) ? 0 : prev);
    setComingTotal((prev) => {
      const prevValue = getPrevValue(prev);
      const dataLength = comesData?.data?.length || 0;
  
      if (nextPage) {
        return prevValue + dataLength;
      } else {
        if (prevValue - dataLength < 40) {
          return 20;
        } else {
          return prevValue - dataLength;
        }
      }
    });
  };
  

const pagination = () => {
  return (
    <div className="row">
      <div className="col">
        <div className="pagination d-flex justify-content-end ">
          <h4>{currentPage} - </h4> 
          <h4>{comingTotal} - </h4>
          <h4>{props.DriversList.Drivers?.total} - </h4>

          <div className="d-flex align-items-center btns">
            <div onClick={handlePrevPagination}>&lt;</div>
            <div onClick={handleNextPagination}>&gt;</div>
          </div>
        </div>
      </div>
    </div>
  )
}

  const showDrivers = () => {
    if (drivers?.total !== 0) {
      return drivers?.data?.map((driver) => (
        <tr key={driver.driverId} className="table-row">
          <th scope="row">{driver.name}</th>
          <td>{driver.phoneNumber}</td>
          <td>{driver.driverId}</td>
          <td>{driver.institutionId}</td>
          <td>{driver.createdAt}</td>
          <td className="edit-icon">
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Actions
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" onClick={() => handleEdit(driver)}>
                  Edit
                </a>
                <a class="dropdown-item" onClick={() => showDModal(driver)}>
                  Delete
                </a>
              </div>
            </div>
          </td>
        </tr>
      ));
    } else  {
      return (
        <div className="m-5 w-100 ">No Drivers!</div>
      )
    };
  };
  return (
    <div className="drivers" style={{ width: "100%", height: "100vh" }}>
      {/* Delete driver modal */}
      <div ref={dModalref} class="modal d">
        <div className="d-modal">
          {props.DriversList.Loading ? (
            <div className="spin-container">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="d-modal-content">
              <h3>Are you sure you want to delete?</h3>
              <p>
                NOTICE: If this driver has a related car you have to delete it
                first!
              </p>

              <div className="btns-container">
                <button onClick={handleDelete}>Delete</button>
                <button onClick={closeM}>Cancel</button>
              </div>
            </div>
          )}
        </div>
        {hasErr()}
      </div>
      {/* Delete driver modal */}
      {/*Post Modal start */}
      <div ref={ref} class="modal d ">
        <div class="model-body">
          <div class="modal-header">
            <h5 class="modal-title">Register a driver</h5>
          </div>
          {errorMsg !== undefined && (
            <p class="alert-driver" role="alert">
              {errorMsg}
            </p>
          )}
          {props.DriversList.Loading ? (
            <div className="spin-container">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div class="modal-body">
              {/* Modal form */}
              <form onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="name" class="col-form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    class="form-control"
                    id="name"
                  />
                </div>
                <div class="form-group">
                  <label for="phonenumber" class="col-form-label">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    value={phonenumber}
                    class="form-control"
                    id="phonenumber"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></input>
                </div>
                <div class="form-group">
                  <label for="institution" class="col-form-label">
                    Institution:
                  </label>
                  <div>
                    <select
                      class="form-select p-1"
                      id="institution"
                      aria-label="Default select example"
                      onChange={(e) => setInstitutionId(e.target.value)}
                    >
                      <option selected>Please choose an institution</option>
                      {institutions?.map((ins) => (
                        <option value={ins.institutionId}>{ins.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
              {/* Modal form end */}
            </div>
          )}
          <div class="modal-footer">
            <button
              onClick={closeM}
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              type="button"
              class="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
        {hasErr()}
      </div>
      {/* Modal end */}
      <div className="container">
        <div className="row header ">
          <div className="col">
            <h3>Drivers</h3>
          </div>
          <div className="col d-flex justify-content-end align-items-center">
            <div class="input-group d-flex ">
              <input
                type="text"
                class="form-control"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Name or phone number..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  onClick={handleSearch}
                  style={{ borderColor: "#333333" }}
                  type="button"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-end align-items-center">
            <button type="button" class="btn btn-primary" onClick={showM}>
              Register a Driver
            </button>
          </div>
        </div>
{pagination()}
        <div className="row">
          <div className="col">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col ">Name</th>
                  <th scope="col">Phone number</th>
                  <th scope="col">Driver ID</th>
                  <th scope="col">Institution ID</th>
                  <th scope="col">Created at</th>
                </tr>
              </thead>
              <tbody>{showDrivers()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    DriversList: state.Drivers,
    institutionList: state.InstitutionStore.Institutions,
    hasSuccesed: state.Drivers,
  };
};

const actionCreators = {
  postDriver: DriversAction.PostDriver,
  getInstitutions: getInstitutions.getInstitutions,
  getDrivers: DriversAction.getDrivers,
  deleteDriver: DriversAction.deleteDriver,
  editDriver: DriversAction.editdriver,
  searchDriver: DriversAction.searchDriver,
};

const connectedDrivers = connect(mapStateToProps, actionCreators)(Drivers);
export { connectedDrivers as default };
