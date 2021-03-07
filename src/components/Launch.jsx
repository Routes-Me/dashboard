import React from 'react';
import logo from '../../src/images/Routes_logo.svg'; 
import { SolarSystemLoading } from 'react-loadingg';

function Launch() {

    return (
            <div style={{position:'relative', width:'100%', height:'100vh', backgroundColor:'#fbfbfb', justifyContent:'center'}}>
					<img style={{position: 'relative', top:'50%', left:'50%', width: '10em', height:'10em', transform:'translate(-50%, -50%)'}} alt="" src={logo} />
                    <SolarSystemLoading color='#234391' style={{ position:'realtive', top:'50%', left:'50%', marginTop: '5em', transform:'translate(-50%, -50%)', width: '80px', height:'auto'}}/>
                    <p style={{position: 'absolute', bottom:'0', width:'100%', textAlign:'center', fontSize:'1vw'}}>Routes Company</p>
		    </div>
    )
}

export default Launch
