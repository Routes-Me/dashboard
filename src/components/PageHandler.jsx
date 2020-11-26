import React from 'react';
import { connect } from 'react-redux';
import { config } from '../constants/config';
import * as AdvertisementAction from '../Redux/Action';

function PageHandler({page}) {

    return (
        <div className='col-md-12' style={{padding: '20px 80px'}}>
            <div className='d-flex justify-content-between' style={{float:"right", fontSize:"18px", color:"#979797"}}><p> {page?.offset} - {page?.limit} of {page?.total}</p><span class="glyphicon glyphicon-menu-left" aria-hidden="true" style={{paddingLeft:'20px'}}/><span class="glyphicon glyphicon-menu-right" aria-hidden="true" style={{paddingLeft:'20px'}}/></div>
        </div>
    )
}

// function nextPage({page}){

//   const limit = page.limit + config.Pagelimit;
//   const offset = page.offset + config.Pagelimit;
//   const total = page.total;
  
//   if(offset < total)
//   {
      
//   }
    
// }


// function previousPage({page}){
  
// }

export default PageHandler
