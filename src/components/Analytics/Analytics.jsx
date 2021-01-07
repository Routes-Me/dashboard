import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

function Analytics(advertisementList) {


    const data =  
    [
        {name: 'Routes',            iOS: 18,         Android:4,           web: 8,   Windows: 11,         Mac:16},
        {name: 'Zain',              iOS: 1+5+5+2,    Android: 2+1+5,      web: 0,   Windows: 0+2+2+2,    Mac:0},
        {name: 'McDonalds',         iOS: 4+3+1+6,    Android: 0+1+3,      web: 2,   Windows: 0+1+1+5,    Mac:0},
        {name: 'Center Point',      iOS: 2+6+3+4,    Android: 2+1+2,      web: 0,   Windows: 0+1+1+4,    Mac:0},
        {name: 'City Center',       iOS: 2+3+6,      Android: 0+2+1+2,    web: 0,   Windows: 1+1+4,      Mac:0},
        {name: 'Xcite',             iOS: 1+1+2,      Android: 0+2+5,      web: 0,   Windows: 0+3+3,      Mac:0},
        {name: 'Best',              iOS: 1+1+2+1,    Android: 1+1+3,      web: 0,   Windows: 0+3+1,      Mac:0},
        {name: 'Huawei',            iOS: 1+1+1+2,    Android: 0+1,        web: 0,   Windows: 0+1,        Mac:0},
        {name: 'KFC',               iOS: 1,          Android: 0,          web: 0,   Windows: 0,          Mac:0}
    ];

    return (

        
            <div className="vehicles-page" style={{ height: "100vh", width: "100%" }}>
                    <div>
                        <div className="top-part-vehicles-search padding-lr-80">
                            <div className="header-add-butt">
                                <h3>Analytics</h3>
                                <label style={{float:'right', fontSize:'14px', fontFamily:'Roboto'}}>20-dec-2020 - 4-jan-2020</label>
                            </div>
                        </div>
                        <div style={{marginTop:'5%', marginLeft:'20%'}}>
                        <BarChart width={1000} height={900} data={data}
                              margin={{top: 0, right: 30, left: 0, bottom: 5}}>
                         <CartesianGrid strokeDasharray="3 3"/>
                         <XAxis dataKey="name"/>
                         <YAxis/>
                         <Tooltip/>
                         <Legend />
                         <Bar dataKey="Android" stackId="a" fill="#a4c639" barSize={30}/>
                         <Bar dataKey="iOS" stackId="a" fill="#a2aaad" barSize={30}/>
                         <Bar dataKey='web' stackId='a' fill='#375a9b' barSize={30}/>
                         <Bar dataKey='Windows' stackId='a' fill='#9b7837' barSize={30}/>
                         <Bar dataKey='Mac' stackId='a' fill='#90a3c4' barSize={30}/>
                        </BarChart>
                        <br/>
                        <br/>
                        <div className="table-list padding-lr-80" style={{width:'1000px'}}>
                        <table>
                        <thead>
                            <tr style={{height:'51px'}}>
                                <th>NAME</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(x =>
                            <tr> 
                                <td>{x.name}</td>
                                <td>{ parseInt(x.iOS) +  parseInt(x.Android) + parseInt(x.web) + parseInt(x.Windows) +parseInt(x.Mac)}</td>
                            </tr>)} 
                        </tbody>
                        </table>
                        <br/>
                        <br/>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Analytics
