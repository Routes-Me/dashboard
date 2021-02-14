import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import * as InstitutionAction from '../../Redux/Action';
import Form from 'react-validation/build/form';

class PolicyDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: "",
            name: "",
            policy: ""
        }
    }

    componentDidMount() {
        // this.props.getServiceList(1,5);
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

 
    

    //Submit button action
    handleSubmit = (event) => {

        event.preventDefault();
        
   

    }

    render() {


        return (
            <div>
                <Form onSubmit={e => this.handleSubmit(e)}>
                
                    <div class="col-md-12">

                    <div className="row form-group">
                            <div className="col-md-6">
                                <h4>Test Policy</h4><br />
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-md-12">
                                <Label>Phone</Label><br />
                                <input type="text" name="phoneNumber"
                                    value={this.state.phoneNumber}
                                    onChange={this.onChange}
                                    className="form-control" />
                            </div>
                        </div>


                    </div>
            <div className="container-fluid">
                    <div className="footerStyle">
                        <button type="submit" style={{ float: 'left' }}> Add </button>
                    </div>
             </div>
             </Form>
            </div>
        )
    }
}


//connect redux
const mapStateToProps = (state) => {

    return {
    }

}


const connectPolicyDetail = connect(mapStateToProps, null)(PolicyDetails);
export { connectPolicyDetail as PolicyDetails };