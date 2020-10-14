import React from 'react';
import { DialogVehicles } from '../Vehicles/DialogVehicles';
import '../Style/CustomStyle.css';
import { vehicleConstants } from '../../constants/vehicleConstants';

class Modal extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            vehicleToDisplay:"",
            modelId: "",
            modelYear: "",
            deviceId: "",
            plateNumber: "",
            InstitutionId: "",
            ModelList: [],
            selectedModel: "",
            validationError: "",
            loading: false
        }

    }

    showSearchList =(searchList)=>{
        if (searchList !== "") {
            return (
                <div className="table-responsive">
                    <table className="table">
                            <tbody>
                            {
                                searchList.map(obj => (
                                    <tr key={this.returnIdforObjectType(obj,this.props.objectType)}>
                                        <td style={{ paddingLeft: 39, textAlign: "left" }}>{obj.name}</td>
                                    </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                </div>
            )
        }
    }

    returnIdforObjectType = (object, objectType) => objectType === vehicleConstants.searchDialogFor_Makers ? object.manufactureId : object.modelId;

    render() {

        
        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }

        // The gray background
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

     

        // The modal "window"
        const modalStyle = {
            backgroundColor: '#fefefe',
            borderRadius: 5,
            maxWidth: 300,
            minHeight: 300,
            margin: '0 auto',
            padding: 20
        };

        

        let content = this.showSearchList(this.props.objectList);
        //const VehicleObj = this.props.objectToDisplay;
        const title = this.props.objectType;
        
        return (
            <div className="modalNew">
                <div class="modal-content" style={{ modalStyle }}>
                    
                    <div className="top-part-vehicles-search padding-lr-80">
                        <span class="closeBtn" style={{ float: "right", display:"block" }} onClick={this.props.onClose} />
                        <div className="hehading-add-butt">
                            <h3>{title}</h3>
                        </div>

                        <div className="search-part">
                            <div className="search-relative">
                                <input type="text" name="search" placeholder="Search" className="search" />
                                <i className="fa fa-search" aria-hidden="true" />
                                {/*<span className="cross-icon"><img src="../cross-image.png" /></span>*/}
                            </div>
                        </div>
                    </div>
                    {content}
                    {/*{this.props.objectType === userConstants.NavItem_Vehicles && <DialogVehicles vehicleToDisplay={VehicleObj}/>}*/}



                </div>
            </div>
        );
    }
}



export default Modal;