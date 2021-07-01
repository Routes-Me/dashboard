import React from 'react'

let previousToken = "";

export const TokenPageHandler = ({ style, nextPageToken, pageSize, getList }) => {
    return (
        <div className='col-md-12' style={style === 'header' ? { padding: '20px 80px', color: "#979797" } : { padding: '5px', paddingRight: '5px', border: '1px solid lightgrey', height: '40px', color: "#979797" }}>
            <div className='d-flex justify-content-between' style={{ float: "right", fontSize: "18px" }}>
                <p> Page Size : {pageSize}</p>
                <span className="glyphicon glyphicon-menu-left" aria-hidden="true" style={{ padding: '5px 0px 0px 20px', cursor: 'pointer', verticalAlign: "middle" }} onClick={(e) => getList(previousToken, pageSize)} />
                <span className="glyphicon glyphicon-menu-right" aria-hidden="true" style={{ padding: '5px 0px 0px 20px', cursor: 'pointer', verticalAlign: "middle" }} onClick={(e) => getList(nextPageToken, pageSize)} />
            </div>
            {previousToken = nextPageToken}
        </div>
    )
}