import React from 'react'

//import bootstrap components
import {Jumbotron,Row,Col} from 'react-bootstrap'

//import react router dom components
import {Link} from 'react-router-dom'

/*Link component allows us to navigate within our application. It allow us to switch pages to another page component without refresh.*/

export default function Banner({bannerProps}){

	/*console.log(bannerProps)*/

	/*Mini-Activity

		Import this component in App.js (main component) and render the component in our page.

	*/
	
	return (


			<Row>
				<Col>
					<Jumbotron>
						<h1>{bannerProps.title}</h1>
						<p>{bannerProps.description}</p>
						<Link to={bannerProps.destination} className="btn btn-primary">{bannerProps.label}</Link>
					</Jumbotron>
				</Col>
			</Row>


		)

}