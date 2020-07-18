import React, { Component } from 'react';
import axios from 'axios';

export class Vehicles extends Component {

    constructor(props) {
        super(props)

        this.state = {
            Vehicles: [],
            loading: true,
            failed: false,
            error: '',
            activePage: 15
        };
    }

    componentDidMount() {
        this.populateVehicleData();
    }

    //Load Vehicles from API
    populateVehicleData() {
        axios.get("http://localhost:55205/api/Vehicles").then(result => {
            const response = result.data;
            this.setState({ Vehicles: response, loading: false, failed: false, error: "" });
        }).catch(error => {
            this.setState({ vehicles: [], loading: false, failed: true, error: "Vehicles could not be loaded" });
        });
    }

    //Page Selection
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }


    //Load Vehicles in a table
    renderAllVehicleTable(Vehicles) {
        return (
            <div className="table-list-vehicles">
                <div className="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Plate</th>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Office</th>
                                <th>Year</th>
                                <th className="width44" />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Vehicles.map(Vehicle => (
                                    <tr key={Vehicle.id}>
                                        <td>{Vehicle.plate}</td>
                                        <td>{Vehicle.make}</td>
                                        <td>{Vehicle.model}</td>
                                        <td>{Vehicle.office}</td>
                                        <td>{Vehicle.year}</td>
                                        <td className="width44" >
                                            <div className="edit-popup">
                                                <div className="edit-delet-butt">
                                                    <span />
                                                    <span />
                                                    <span />
                                                </div>
                                                <ul className="edit-delet-link">
                                                    <li><a href="#">Edit</a></li>
                                                    <li><a href="#">Delet</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }



    render() {

        let content = this.state.loading ?
            <div><br /><br /><p><em> Loading...</em> </p></div> :
            this.state.failed ?
                <div className="text-danger"><br /><br />
                    <em>{this.state.error}</em>
                </div> :
                this.renderAllVehicleTable(this.state.Vehicles);

        return (
            <div className="vehicles-page">
                <div className="top-part-vehicles-search padding-lr-80">
                    <div className="hehading-add-butt">
                        <h3>Vehicles</h3>
                        <a href="#" className="vehicle-add-butt"><i className="fa fa-plus-circle" aria-hidden="true" /> Add Vehicle</a>
                    </div>

                    <div className="search-part">
                        <div className="search-relative">
                            <input type="text" name="search" placeholder="Search" className="search" />
                            <i className="fa fa-search" aria-hidden="true" />
                            <span className="cross-icon"><img src="../cross-image.png" /></span>
                        </div>
                    </div>
                </div>

                {content}
            </div>
        );
    }

}