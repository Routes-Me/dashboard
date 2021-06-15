import React from 'react';
import { connect } from 'react-redux';
import * as AdvertisementAction from '../../../../Redux/Action';
import * as InstitutionAction from '../../../../Redux/Action';
import { Basic } from './Detail/Basic';
import { Extras } from './Detail/Extras';
import ReactPlayer from 'react-player';
import '../Advertisements/Advertisement.css';
import { config } from '../../../../constants/config';
import LoopCircleLoading from 'react-loadingg/lib/LoopCircleLoading';
import { advertisementsConstants } from '../../../../constants/advertisementConstants';
import { returnObjectForSelectedId } from '../../../../util/basic';


class AdvertisementsDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            imageUrl: "",
            videoUrl:"",
            tabIndex:1,
            advertisement:'',
            promotion:'',
            file : ''
        }
    }

    onChange = (event) => {
        const returnedValue = event.target.value;
        const returnedKey = event.target.name;

        // console.log(`Returned => ${returnedKey} : ${returnedValue}`);
        if(returnedKey === "campaigns")
        {
            const selected=[];
            let selectedOption=(event.target.selectedOptions);
            for (let i = 0; i < selectedOption.length; i++)
            {
                selected.push(selectedOption.item(i).value);
            }
            console.log('Selected ', selected);
            this.setState(prevState => ({ advertisement : {...prevState.advertisement, [returnedKey]:selected }}));
        }
        else if(returnedKey === 'institution')
            this.setState(prevState => ({ advertisement : { ...prevState.advertisement , institution: returnObjectForSelectedId(this.props.InstitutionList.data, returnedValue)}}));
        else
            this.setState(prevState => ({ advertisement : {...prevState.advertisement, [returnedKey]: returnedValue }}));
        
        // console.log('onChange Advertisement ', this.state.advertisement);
    }

    onPromotionChange = (event) => {
        const returnedValue = event.target.value;
        const returnedKey   = event.target.name;
        // console.log(`Promotions onChange Returned => ${returnedKey} : ${returnedValue}`);
        this.setState(prevState => ({ promotion : { ...prevState.promotion, [returnedKey] : returnedValue }}));
        // console.log('Promotion ', this.state.promotion);
    }

    fileChangedHandler = async(event) => {

        let file = event.target.files[0];

        if(file !== undefined)
        {
            this.setState({ file : file});
            var localFilePath = URL.createObjectURL(event.target.files[0]);
            file.type.includes('video') ?
            this.setState({ videoUrl:localFilePath, imageUrl: undefined })
            :this.setState({ videoUrl:undefined, imageUrl: localFilePath });    
        }

    }

    onChangeRadioButton = (event) => {
        const share = event.target.value === 'on' ? true: false;
        this.setState(prevState => ({ promotion : { ...prevState.promotion, shareQR : share }}));
    }

    componentDidMount(){
        this.props.getCampaigns(1);
        this.props.getDayIntervals();
        this.props.getInstitutions(1,config.DropDownLimit);
    }


    static getDerivedStateFromProps (props, state){

            if(props.advertisementToDisplay !== undefined)
            {
                if(props.advertisementToDisplay !== state.advertisement)
                {
                    console.log('Advertisement to display ', props.advertisementToDisplay);
                    return {
                        advertisement : props.advertisementToDisplay,
                        imageUrl: props.advertisementToDisplay.media?.mediaType === 'image'? props.advertisementToDisplay.media.url : '',
                        videoUrl: props.advertisementToDisplay.media?.mediaType === 'video'? props.advertisementToDisplay.media.url : ''
                    }
                }
                if(props.advertisementToDisplay.promotion !== state.promotion)
                {
                    return {
                        promotion : props.advertisementToDisplay.promotion
                    }
                }
            }

    }

    onTabClick = (index) => {
        console.log('Tab click Advertisement ', this.state.advertisement);
        console.log('Tab click Promotion ', this.state.promotion);
        this.setState({ tabIndex: index });
    }


    submitForm = (e) => {
        let advertisement ={
            advertisement : this.state.advertisement,
            promotion     : this.state.promotion,
            file         : this.state.file
        }
        this.props.saveAdvertisement(advertisement);
    }

    

    render() {


        const imageText = this.state.imageUrl === "" ? "160 X 600" : this.state.imageUrl;
        const videoText = this.state.videoUrl === "" ? "1280 X 720" : this.state.videoUrl;
        const tabIndex = this.state.tabIndex; 
        return (
            <div className="container-fluid" style={{paddingLeft:'0px'}}>
                <div className="row col-md-12 detail-form">
                    <div className="headerTabStyle">
                        <nav>
                            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <a className={`nav-item nav-link ${tabIndex === 1 && "active"}`}  id="nav-home-tab" data-toggle="tab" onClick={(e) => this.onTabClick(1)} role="tab" aria-controls="nav-home" aria-selected="true"> Basic</a>
                                <a className={`nav-item nav-link ${tabIndex === 2 && "active"}`} id="nav-profile-tab" data-toggle="tab" onClick={(e) => this.onTabClick(2)} role="tab" aria-controls="nav-profile" aria-selected="false"> QR Code Promotion</a>
                            </div>
                        </nav>
                    </div>
                    <div className="row col-md-12 detail-form">

                        <div className="col-md-6 col-sm-12" style={{paddingLeft:"0px"}}>
                            {this.state.tabIndex === 1 ? 
                            <Basic advertisementToDisplay={this.state.advertisement} onChange={this.onChange} fileChangedHandler={this.fileChangedHandler} /> : 
                            <Extras promotionToDisplay={this.state.promotion} onChange={this.onPromotionChange} onChangeRadioButton={this.onChangeRadioButton}/>}
                        </div>

                        <div className="col-md-6">
                            <div className="col-md-12 simulator">

                                <div className="container row topPanel">
                                    <div className="banner1">
                                    {
                                        this.state.videoUrl === "" ? videoText : videoText ===  advertisementsConstants.uploadProgress ?  <LoopCircleLoading color='#234391' style={{ width: '4em', height:'auto'}}/> :
                                            <ReactPlayer
                                                width='100%'
                                                height='100%'
                                                controls
                                                url={videoText}/>
                                    }
                                    </div>
                                    <div className="banner2">
                                            {this.state.imageUrl === "" ? imageText : 
                                                imageText ===  advertisementsConstants.uploadProgress ? <LoopCircleLoading color='#234391' style={{ width: '4em', height:'auto'}}/> : 
                                            <img className="img-fluid" alt="" src={imageText} />}
                                    </div>
                                </div>
                                <div className="container row bottomPanel">
                                    <div className="banner3"><p>{this.state.promotion?.title}</p><br/><p></p></div>
                                    <div className="banner4"></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="footerStyle">
                    <button type="submit" style={{ float: 'left' }} onClick={(e) => this.submitForm()}>{this.props.Loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />} <span>Create</span>  </button>
                    <button className={this.state.tabIndex !== 1 ? 'next' : 'btn btn-light' } style={{ marginLeft: '107px' }} onClick={(e) => this.onTabClick(1)}> <span className="glyphicon glyphicon-menu-left" aria-hidden="true" /> Previous</button>
                    <button className={this.state.tabIndex !== 2 ? 'next' : 'btn btn-light' } style={{ marginLeft: '7px' }} onClick={(e) => this.onTabClick(2)}> Next: Extras <span className="glyphicon glyphicon-menu-right" aria-hidden="true" /> </button>
                </div>

            </div>
        )
    }
}


//connect redux
const mapStateToProps = (state) => {

    return {
        InstitutionList  : state.InstitutionStore.Institutions,
        Loading : state.AdvertisementStore.loading,
        ApplicationState: state.AdvertisementStore.ActionState
    }

}

const actionCreators = {

    getCampaigns        : AdvertisementAction.getCampaigns,
    getDayIntervals     : AdvertisementAction.getDayIntervals,
    getInstitutions     : InstitutionAction.getInstitutions,
    saveAdvertisement   : AdvertisementAction.saveAdvertisement

}

const connectAdvertisementDetail = connect(mapStateToProps, actionCreators)(AdvertisementsDetail);
export { connectAdvertisementDetail as AdvertisementsDetail };