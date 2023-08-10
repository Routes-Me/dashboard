import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isSU } from '../../../../util/basic';

class SecondaryVehicles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Vehicles: [],
            optionsIndex:0
        }
    }

    openSubMenu = (e, deviceId) => {
        e.preventDefault();
        this.setState({ optionsIndex: this.state.optionsIndex === deviceId? 0:deviceId });
    }

    render() {
        return (
            <div className="search-main">
                {isSU(this.props.role) && <div className="table-list">
                <caption style={{fontSize:'16px', marginTop:'47px'}}>Devices</caption>
                <table>
                    <tbody>
                        {this.props?.devices?.map(device => 
                        <tr style={{height:'51px'}}>
                            <td>{device.deviceId}</td>
                            <td className="width44" onClick={e => this.openSubMenu(e, device.deviceId)}>
                                <div className="edit-popup">
                                    <div className="edit-delet-butt" onClick={e => this.openSubMenu(e, device.deviceId)}>
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                    {/* <ul className="edit-delet-link" style={{ display: this.state.optionsIndex === device.deviceId ? 'inline-block' : 'none' }}>
                                        <li><a onClick={e => this.showDetailScreen(e, device)}>Unlink</a></li>
                                    </ul> */}
                                </div>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
                </div>}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        devices: state.VehicleStore.Devices,
        role   : state.Login.role
    }
}

const connectSecondaryVehicles = connect(mapStateToProps, null)(SecondaryVehicles);
export { connectSecondaryVehicles as SecondaryVehicles };