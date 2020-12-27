import React, { Component } from 'react';
import logo from '../../images/footer-icon.svg'; 

export class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div style={{display:'flex', marginRight:'5%'}}>
                 <a href="/home"><img style={{width: '22px', height: '22px', marginRight: '2%'}} alt="" src={logo} /></a>
                 <p>Routes ⓒ 2020</p>
                 </div>
                 <p>Call support  +965 22020406</p>
            </div>
        );
    }
}

export default Footer;