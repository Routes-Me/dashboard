import React from 'react';
import { config } from '../constants/config';

function PageHandler({page, getList, style, institutionId}) {
    const firstIndex = calculateStartIndex(page);
    const lastIndex = calculateLastIndex(page);
    return (
        <div className='col-md-12' style={style ==='header'?{padding: '20px 80px', color:"#979797"} : {padding:'5px', paddingRight:'5px', border:'1px solid lightgrey', height:'40px', color:"#979797"}}>
            <div className='d-flex justify-content-between' style={{float:"right", fontSize:"18px"}}>
                <p> {firstIndex} - {lastIndex} of {page?.total}</p>
                <span class="glyphicon glyphicon-menu-left"  aria-hidden="true" style={{padding:'5px 0px 0px 20px', cursor:'pointer', verticalAlign:"middle"}} onClick={(e) => {page !== undefined && previousPage(page, getList, institutionId)}}/>
                <span class="glyphicon glyphicon-menu-right" aria-hidden="true" style={{padding:'5px 0px 0px 20px', cursor:'pointer', verticalAlign:"middle"}} onClick={(e) => {page !== undefined && nextPage(page, getList, institutionId)}}/>
            </div>
        </div>
    )
}

function calculateTotalPage(page)
{
    if(page !== undefined)
    {
        var total = page.total / page.limit;
        var add = page.total % page.limit > 0 ? 1 : 0;
        var totalPage = Math.floor(total) + add
        return totalPage;
    }
}

function calculateStartIndex(page){
    if(page !== undefined)
    {
        return (page.offset * page.limit) - (page.limit - 1);
    }
    return '-- '
}

function calculateLastIndex(page){
    if(page !== undefined){
        var lastIndex = (page.offset * page.limit) < page.total ? (page.offset * page.limit) : page.total;
        return lastIndex;
    }
    return ' --';
}

function nextPage(page, getList, institutionId){
    if(page !== undefined)
    {
        const offset = page.offset + 1;
        const totalPages = calculateTotalPage(page);

        if(offset <= totalPages)
        {
            institutionId !== undefined && getList(offset, page.limit, institutionId)
        }
    }
}


function previousPage(page, getList, institutionId){
    if(page !== undefined)
    {
        const offset = page.offset - 1;
        if(offset > 0)
        {
            institutionId !== undefined && getList(offset, page.limit, institutionId)
        }
    }
}

export default PageHandler
