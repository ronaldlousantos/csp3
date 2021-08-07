import React from 'react'

import Banner from '../components/Banner'

export default function NotFound(){

	let bannerContent={

		title: 'Page not Found',
		description: "For affordable courses, go back to our home page.",
		label: "Back to Home",
		destination: "/",
	}

	return (


			<Banner bannerProps={bannerContent}/>


		)

}