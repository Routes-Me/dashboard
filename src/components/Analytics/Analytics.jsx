import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

function Analytics(advertisementList) {


    const data =  advertisementList.advertisementList.data?.map( x => ({name: x.resourceName, iOS: 0, Android: 0, amt: 0}));
//     [
//         {name: 'Mcdonalds', iOS: 4000, Android: 2400, amt: 2400},
//         {name: 'KFC', iOS: 3000, Android: 1398, amt: 2210},
//         {name: 'Routes', iOS: 2000, Android: 9800, amt: 2290},
//         {name: 'CityCenter', iOS: 2780, Android: 3908, amt: 2000},
//         {name: 'XCite', iOS: 1890, Android: 4800, amt: 2181},
//         {name: 'NBK', iOS: 2390, Android: 3800, amt: 2500},
//         {name: 'Alghanim', iOS: 3490, Android: 4300, amt: 2100},
//   ];

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
                        </BarChart>
                    </div>
                </div>
            </div>
    )
}

export default Analytics
