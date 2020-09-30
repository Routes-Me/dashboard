import React, { Component } from 'react';
import img1 from '../image/5.jpg'; // Tell webpack this JS file uses this image
import leftarrow from '../image/left-arrow.png'; // Tell webpack this JS file uses this image
import img3 from '../image/3.jpg';
import img4 from '../image/4.jpg';
import uparrow from '../image/up-arrow.png';
import right from '../image/right.png';



export class Banner extends Component {


	render() {
	/*className="main"*/
		return (
			<div>  
				<div className="container-custom">
					<div className="row">
						<div className="col-md-12">
							<div className="box">
								<div className="box-row">
									<div className="images-text-part img-part">
										<img alt="" src={img1} className="imgsize responsive c3" />
										<img className="left-arrow" alt="" src={leftarrow} />
									</div>
									<div className="images-text-part text-part">
										<h5 className="allh5">ALL AROUND KUWAIT</h5>
										<p className="text1">A nationwide image for all types of advertisement campaigns all over Kuwait metropolises.</p>
									</div>
									<div className="images-text-part img-part">
										<img alt="" src={img3} className="imgsize responsive c6" />
										<img className="up-arrow" src={uparrow} alt="" />
									</div>
									<div className="images-text-part text-part">
										<h5 className="allh52">OUR TECHNOLOGY</h5>
										<p className="text3">Utilizing fully customizable 11.6” interactive touch screens with payment solutions, featuring<br />smart applications to run your advertisement and enable the audience to interact with it.</p>
									</div>
									<div className="images-text-part img-part">
										<img src={img4} alt="" className="imgsize responsive c9" />
										<img className="right-arrow" alt="" src={right} />
									</div>
									<div className="images-text-part text-part">
										<h5 className="allh53">REVOLUTIONIZE PUBLIC TRANSPORTATION</h5>
										<p className="text2">We believe that public transportation advertising is one of the most efficient media in Marketing and Media.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="call">
					Call support  +965 22020406
        </div>
			</div>
		);
	}
}