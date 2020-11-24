﻿import React from 'react';
import { connect } from 'react-redux';
import * as AdvertisementAction from '../../Redux/Action';
import { Basic } from './Detail/Basic';
import { Extras } from './Detail/Extras';
import ReactPlayer from 'react-player';
import '../Advertisements/Advertisement.css';


class AdvertisementsDetail extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            imageUrl: "",
            videoUrl:"",
            mediaType:"",
            tabIndex:1,
            submitBasic:false,
            submitExtra:false,
            advertisement:'',
            addPromotion:false
        }
    }
    
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    static getDerivedStateFromProps (props, state){

        if(props.advertisementToDisplay !== undefined)
        {
            if(props.advertisementToDisplay !== state.advertisement)
            {
                return {
                    advertisement : props.advertisementToDisplay,
                    imageUrl: props.advertisementToDisplay.media.MediaType === 'image'? props.advertisementToDisplay.media.Url : '',
                    videoUrl: props.advertisementToDisplay.media.MediaType === 'video'? props.advertisementToDisplay.media.Url : ''
                }
            }
        }
        if (props.UploadedMedia!==undefined && (props.UploadedMedia !== ""))
        {
            if (props.UploadedMedia.Type !== state.mediaType) 
            {
                return props.UploadedMedia.Type === 'mp4'? { videoUrl: props.UploadedMedia.Url, mediaType:'mp4', imageUrl:""} : { imageUrl: props.UploadedMedia.Url, mediaType:"jpg" , videoUrl:""};
            }
        }
        if(state.submitBasic)
        {
            if(!props.Loading && props.NewAdvertisement !=='')
            {
                return {tabIndex :2};
            }
        }
        return null;
    }

    onTabClick = (index) => {
        this.setState({ tabIndex: index });
    }

    onCreate = (e) =>{                                                                                                                                                  
        this.setState({submitBasic:true, submitExtra:false, addPromotion:true});
    }

    submitPromotion = (e) => {
        if(this.state.tabIndex === 2)
        {
            this.setState({submitExtra:true, submitBasic:false })
        }
        else
        {
            this.setState({submitExtra:false, submitBasic:true})
        }
    }

    

    render() {


        const imageText = this.state.imageUrl === "" ? "160 X 600" : this.state.imageUrl;
        const videoText = this.state.videoUrl === "" ? "1280 X 720" : this.state.videoUrl;
        const tabIndex = this.state.tabIndex; 
        return (
            <div className="container-fluid">
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
                        <div className="col-md-6">
                            {this.state.tabIndex === 1 ? <Basic submitForm={this.state.submitBasic} advertisementToDisplay={this.state.advertisement} withPromotion={this.state.addPromotion}/> : <Extras submitForm={this.state.submitExtra} addForPromotion={this.props.NewAdvertisement}/>}
                        </div>
                        <div className="col-md-6">
                            <div className="col-md-12 simulator">
                                <div className="container row topPanel">
                                    <div className="banner1">
                                    {
                                        this.state.videoUrl === "" ? videoText :
                                            <ReactPlayer
                                                width='100%'
                                                height='100%'
                                                controls
                                                url={videoText}/>
                                    }
                                    </div>
                                    <div className="banner2">
                                            {this.state.imageUrl === "" ? imageText : <img className="img-fluid" alt="" src={imageText} />}
                                    </div>
                                </div>
                                <div className="container row bottomPanel">
                                    <div className="banner3"><p>{this.props.Title}</p><br /><p></p></div>
                                    <div className="banner4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="footerStyle">
                        <button type="submit" style={{ float: 'left' }} onClick={(e) => this.submitPromotion()}> Create </button>
                        <button className="btn btn-light" style={{ marginLeft: '107px' }} onClick={(e) => this.onTabClick(1)}> <span class="glyphicon glyphicon-menu-left" aria-hidden="true" /> Previous</button>
                        <button className="next" style={{ marginLeft: '7px' }} onClick={(e) => this.onCreate()}> Next: Extras <span class="glyphicon glyphicon-menu-right" aria-hidden="true" /> </button>
                    </div>
            </div>
        )
    }
}


//connect redux
const mapStateToProps = (state) => {

    return {
        Title: state.AdvertisementStore.Title,
        SubTitle: state.AdvertisementStore.SubTitle,
        Loading : state.AdvertisementStore.loading,
        NewAdvertisement : state.AdvertisementStore.Advertisement,
        UploadedMedia : state.AdvertisementStore.Media
    }

}

const actionCreators = {

    uploadMedia: AdvertisementAction.uploadMedia,
    saveAdvertisement: AdvertisementAction.addAdvertisement

}

const connectAdvertisementDetail = connect(mapStateToProps, actionCreators)(AdvertisementsDetail);
export { connectAdvertisementDetail as AdvertisementsDetail };