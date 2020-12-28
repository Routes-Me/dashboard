import React from 'react';
import logo from '../../src/images/Routes_logo.svg'; 
import { SolarSystemLoading } from 'react-loadingg';

function Launch() {

    return (
        <div>
            <div style={{position:'relative', width:'100%', height:'100vh', backgroundColor:'#fbfbfb', justifyContent:'center'}}>
					<a><img style={{position: 'relative', top:'50%', left:'50%', width: '150px', height:'150px', transform:'translate(-50%, -50%)'}} alt="" src={logo} /></a>
                    <SolarSystemLoading color='#234391' style={{top:'50%', left:'50%', marginTop: '5%', transform:'translate(-50%, -50%)', width: '80px', height:'80px'}}/>
                    <p style={{position: 'absolute', bottom:'0', width:'100%', textAlign:'center', fontSize:'20px'}}>Routes Company</p>
		    </div>
        </div>
    )
}

export default Launch
