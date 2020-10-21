import React from 'react';
import active from '../../../images/active.svg';
import canceled from '../../../images/canceled.svg'

const Status = () => {
    return (
        <div style={{display:"inline-block"}}>
            <image src={active}/>
            <label>Active</label>
        </div>
    );
};

export default Status;