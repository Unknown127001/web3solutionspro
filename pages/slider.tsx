import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

export default class NextJsCarousel extends Component {
	render() {
		return (
			<div>
			<h2>NextJs Carousel - GeeksforGeeks</h2>
			<Carousel>
				<div>
					<Image src="/1.png" alt="image1" width={300}  height={400}/>
					<p className="legend">Image 1</p>

				</div>
				<div>
					<Image src="/2.png" alt="image2" width={300}  height={400}/>
					<p className="legend">Image 2</p>

				</div>
				<div>
					<Image src="/3.png" alt="image3" width={300}  height={400}/>
					<p className="legend">Image 3</p>

				</div>
				<div>
					<Image src="/4.png" alt="image4" width={300}  height={400}/>
					<p className="legend">Image 4</p>

				</div>
				<div>
					<Image src="/5.png" alt="image5" width={300}  height={400}/>
					<p className="legend">Image 5</p>

				</div>
			</Carousel>
			</div>
		);
	}
};
