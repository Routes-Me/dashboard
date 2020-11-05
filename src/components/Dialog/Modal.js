import React from 'react';
import '../Style/home.css';
import '../Dialog/modal.scss';
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
                                    <tr style={{ paddingLeft: 39, textAlign: "left" }} key={obj.name} onClick={()=>{this.onselection(obj)}}>
                                        <td>{obj.name}</td>
                                    </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                </div>
            )
        }
    }

    returnIdforObjectType = (object, objectType) => objectType === vehicleConstants.searchDialogFor_Makers ? object.manufacturerId : object.modelId;

    onselection(obj){
        this.props.onSelect(obj);
    } 

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
                            </div>
                        </div>
                    </div>
                    {content}

                </div>
            </div>
        );
    }
}


export default Modal;
