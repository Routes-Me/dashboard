import React from "react";
import plateNumber from "../../../../images/plateNumber.svg";
import institution from "../../../../images/institution.svg";
import car from "../../../../images/car.svg";
import time from "../../../../images/time.svg";
import "../../../Style/home.scss";
import { validate } from "../../../../util/basic";

export const SecondaryList = ({ vehicle, dismissInfo }) => {
  return (
    <div className="menu">
      <ul className="list_x">
        {/* <li><a><img className="icon-30" alt="" src={plateNumber}/> {validate(vehicle?.plateNumber)}</a></li> */}
        {/* <li><a><img className="icon-30" alt="" src={car} /> {validate(vehicle.model?.name)}</a></li> */}
        {/* <li><a><img className="icon-30" alt="" src={time} /> {validate(vehicle.institution?.createdat)}</a></li> */}
        {/* <li><a><img className="icon-30" alt="" src={institution} /> {validate(vehicle.institution?.name)}</a></li> */}
        <li>
          <b>Plate Number</b>
        </li>
        <li>{validate(vehicle?.plateNumber)}</li>
        <li></li>
        <li>
          <b>Model</b>
        </li>
        <li>{validate(vehicle.model?.name)}</li>
        <li></li>
        <li>
          <b>Created At</b>
        </li>
        <li>{validate(vehicle.institution?.createdat)}</li>
        <li></li>
        <li>
          <b>Company</b>
        </li>
        <li>{validate(vehicle.institution?.name)}</li>
        <li style={{ marginTop: "20px" }}>
          <button
            style={{
              fontSize: "14px",
              color: "white",
              backgroundColor: "#18428f",
              border: "none",
              padding: "5px 10px",
            }}
            onClick={(e) => dismissInfo("")}
          >
            Dismiss
          </button>
        </li>
      </ul>
    </div>
  );
};
export default SecondaryList;
