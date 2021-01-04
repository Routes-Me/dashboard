import React from 'react';
import active from '../../../images/active.svg'
import canceled from '../../../images/canceled.svg'

const Status = ({text}) => {
    return (
        <div style={{display:"inline-block"}}>
            <img style={{width:"18px", height:"18px", margin:"7px"}} alt="" src={text ==="active"? active:canceled} />
            <label>{text ==="active"? 'Active':'Canceled'}</label>
        </div>
    );
};

export default Status;