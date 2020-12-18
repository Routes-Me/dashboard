import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

function Analytics(advertisementList) {


    const data =  
    [
        {name: 'McDonalds',         iOS: 4,    Android: 0,    web: 2,   Windows: 0},
        {name: 'Center Point',      iOS: 2,    Android: 2,    web: 0,   Windows: 0},
        {name: 'Huawei',            iOS: 1,    Android: 0,    web: 0,   Windows: 0},
        {name: 'KFC',               iOS: 1,    Android: 0,    web: 0,   Windows: 0},
        {name: 'Xcite',             iOS: 1,    Android: 0,    web: 0,   Windows: 0},
        {name: 'Zain',              iOS: 1,    Android: 2,    web: 0,   Windows: 0},
        {name: 'Best',              iOS: 1,    Android: 1,    web: 0,   Windows: 0},
        {name: 'City Center',       iOS: 2,    Android: 0,    web: 0,   Windows: 1},
    ];

    return (

        
            <div className="vehicles-page" style={{ height: "100vh", width: "100%" }}>
                    <div>
                        <div className="top-part-vehicles-search padding-lr-80">
                            <div className="hehading-add-butt">
                                <h3>Analytics</h3>
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
                        </BarChart>
                    </div>
                </div>
            </div>
    )
}

export default Analytics
