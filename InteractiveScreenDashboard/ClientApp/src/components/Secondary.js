import React, { Component } from 'react';
import axios from 'axios';
import alarem from './image/alarem.png';
import bank from './image/bank.png';
import carnew from './image/carnew.png';
import phone from './image/phone.png';
import SecondaryList from './SecondaryList';

export class Secondary extends Component {

    constructor(props) {
        super(props);

        this.state = {

            Vehicles: [],
            loading: true,
            failed: false,
            error: '',
            selectedIndex:2
        };

    }

    componentDidMount() {
        this.populateVehicleData();
    }

    populateVehicleData() {
        axios.get("http://localhost:55205/api/Vehicles").then(result => {
            const response = result.data;
            this.setState({ Vehicles: response, loading: false, failed: false, error: "" });
        }).catch(error => {
            this.setState({ vehicles: [], loading: false, failed: true, error: "Vehicles could not be loaded" });
        });
    }

    toggleItem(index) {
        this.setState({ selectedIndex: index });
    }

    renderAllVehicles(Vehicles) {
        console.log('Selected Index :', this.state.selectedIndex)
        return (
            <div>
            {
              Vehicles.map(Vehicle => (
                        <div onClick={(e) => this.toggleItem(Vehicle.id)}>
                        <SecondaryList vehicle={Vehicle} index={Vehicle.id} selectedIndex={this.state.selectedIndex} />
                        </div>
              ))
            }
            </div>
        )
    }

    render() {

        let content = this.state.loading ?
            <div><br /><br /><p><em> Loading...</em> </p></div> :
            this.state.failed ?
                <div className="text-danger"><br /><br />
                    <em>{this.state.error}</em>
                </div> :
                this.renderAllVehicles(this.state.Vehicles);

        return (

           
            <div className="search-main">
                <div className="result-not-found">
                    <p>No results found</p>
                    <p><b>DUTY OFF</b>has 1 reult</p>
                </div>

                <div className="search-result">
                    <p>Free</p>
                    {content}
                    

                    <p>occupied</p>
                    <ul className="manual-menu">

                        <li><a href="#">Fulan Abu Flan</a></li>
                        <li><a href="#">Mohammad All</a></li>
                        <li><a href="#">Saad Mue</a></li>
                        <li><a href="#">Waseem Noor</a></li>
                    </ul>
                </div>

                <div className="search-part">
                    <div className="search-relative">
                        <input type="text" autoComplete="off" name="search" placeholder="Search" className="search"></input>
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <span className="cross-icon"><img src="../cross-image.png" /></span>
                    </div>
                </div>
            </div>
            
            );
    }
}