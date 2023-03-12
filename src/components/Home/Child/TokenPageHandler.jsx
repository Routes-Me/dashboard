import React, { memo, useEffect, useState } from 'react'

// let previousToken = "";

 export const TokenPageHandler = ({ style, nextPageToken, pageSize, getList, authorize, pageName }) => {
    console.log(`Values => Page Token : ${nextPageToken} pageSize : ${pageSize} `);
    const [pageNumber, setPageNumber] = useState(0)


    useEffect(() => {

        if(window.localStorage.getItem("pageName") !== pageName) {
            window.localStorage.clear()
        }
        window.localStorage.setItem("pageName", pageName)
    }, [])
    

    const nextClick = () => {
        
        let currentNumber = pageNumber
        currentNumber = currentNumber + 1;
        setPageNumber(currentNumber); 
        window.localStorage.setItem(currentNumber, nextPageToken)
        getList(nextPageToken, pageSize, authorize) 
    }
    
    const previousClick = () => {
        let currentNumber = pageNumber;
        if (currentNumber > 1) {
            currentNumber= currentNumber -1;
            setPageNumber(currentNumber);
            let previousToken = window.localStorage.getItem(currentNumber)
            getList(previousToken, pageSize, authorize) 
        }
    }
    
    return (
        <div className='col-md-12' style={style === 'header' ? { padding: '20px 80px', color: "#979797" } : { padding: '5px', paddingRight: '5px', border: '1px solid lightgrey', height: '40px', color: "#979797" }}>
            <div className='d-flex justify-content-between' style={{ float: "right", fontSize: "18px" }}>
                <p> Page Size : {pageSize} - {pageNumber}</p>
                <span className="glyphicon glyphicon-menu-left" aria-hidden="true" style={{ padding: '5px 0px 0px 20px', cursor: 'pointer', verticalAlign: "middle" }} onClick={ previousClick} />
                <span className="glyphicon glyphicon-menu-right" aria-hidden="true" style={{ padding: '5px 0px 0px 20px', cursor: 'pointer', verticalAlign: "middle" }} onClick={nextClick} />
            </div>
            {/* {previousToken = nextPageToken} */}
        </div>
    )
}

