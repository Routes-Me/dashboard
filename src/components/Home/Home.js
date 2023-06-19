import React, { Component } from "react";
import Master from "./Master/Master";
import { Child } from "./Child/Child";
import "../../components/Style/home.scss";
import { connect } from "react-redux";
import { showPanelAction } from "../../Redux/Action";

 class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }
  render() {
    const  isOpen  = this.props.count.AdvertisementStore.showPanel;

    return (
      <div className="homePage">
        <div
          className={`show-arrow ${isOpen ? "open" : ""}`}
          ref={"ref"}
          onClick={() => this.props.showPanelAction(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            class="bi bi-caret-right-fill"
            viewBox="0 0 16 16"
          >
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
          </svg>
        </div>
        <Master isShow={isOpen} />
        <Child />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state
  };
};

const mapDispatchToProps = {
  showPanelAction
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);