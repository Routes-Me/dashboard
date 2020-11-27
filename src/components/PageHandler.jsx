import React from 'react';
import { config } from '../constants/config';

function PageHandler({page, getList}) {

    return (
        <div className='col-md-12' style={{padding: '20px 80px'}}>
            <div className='d-flex justify-content-between' style={{float:"right", fontSize:"18px", color:"#979797"}}>
                <p> {page?.offset} - {page?.limit} of {page?.total}</p>
                <span class="glyphicon glyphicon-menu-left" aria-hidden="true" style={{paddingLeft:'20px', color:'black'}} onClick={() => page !== undefined && previousPage(page, getList)}/>
                <span class="glyphicon glyphicon-menu-right" aria-hidden="true" style={{paddingLeft:'20px', color:'black'}} onClick={() => page !== undefined && nextPage(page, getList)}/>
            </div>
        </div>
    )
} 

function nextPage(page, getList){
    if(page !== undefined)
    {
        const limit = page.limit + config.Pagelimit;
        const offset = page.offset + config.Pagelimit;
        const total = page.total;

        if(offset < total && limit < total)
        {
          getList(1,offset,limit)
        }
    }
}


function previousPage({page, getList}){
    if(page !== undefined)
    {
        const limit = page.limit - config.Pagelimit;
        const offset = page.offset - config.Pagelimit;
        const total = page.total;
        
        if(offset < total && limit < total)
        {
          getList(1,offset,limit)
        }
    }
}

export default PageHandler
