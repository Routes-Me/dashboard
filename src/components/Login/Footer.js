import React, { Component } from 'react';
import logo from '../../images/footer-icon.svg'; 

export class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div style={{display:'flex', marginRight:'40px'}}>
                 <a href="/home"><img className="footerIcon" alt="" src={logo} /></a>
                 <p>Routes ⓒ 2020</p>
                 </div>
                 <p>Call support  +965 22020406</p>
            </div>
        );
    }
}

export default Footer;