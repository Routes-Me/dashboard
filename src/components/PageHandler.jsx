import React from 'react';
import { config } from '../constants/config';

function PageHandler({page, getList}) {
    const totalPage = calculateTotalPage(page);
    return (
        <div className='col-md-12' style={{padding: '20px 80px'}}>
            <div className='d-flex justify-content-between' style={{float:"right", fontSize:"18px", color:"#979797"}}>
                <p> {page?.offset} - {totalPage} of {page?.total}</p>
                <span class="glyphicon glyphicon-menu-left"  aria-hidden="true" style={{paddingLeft:'20px', color:'black', cursor:'pointer'}} onClick={() => {page !== undefined && previousPage(page, getList)}}/>
                <span class="glyphicon glyphicon-menu-right" aria-hidden="true" style={{paddingLeft:'20px', color:'black', cursor:'pointer'}} onClick={() => {page !== undefined && nextPage(page, getList)}}/>
            </div>
        </div>
    )
}

function calculateTotalPage(page)
{
    if(page !== undefined)
    {
        var total = page.total / config.Pagelimit;
        var add = page.total % config.Pagelimit > 0 ? 1 : 0;
        var totalPage = Math.floor(total) + add
        return totalPage;
    }
}

function nextPage(page, getList){
    if(page !== undefined)
    {
        const offset = page.offset + 1;
        const totalPages = calculateTotalPage(page);

        if(offset <= totalPages)
        {
          getList(offset)
        }
    }
}


function previousPage(page, getList){
    if(page !== undefined)
    {
        const offset = page.offset - 1;
        if(offset > 0)
        {
          getList(offset)
        }
    }
}

export default PageHandler
