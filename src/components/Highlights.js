import React from 'react'

//react-bootstrap components
import {Row,Col,Card} from 'react-bootstrap'

export default function Highlights(object){

	/*console.log(object)*/

	return (

		<Row>
			<Col xs={12} md={4}>
				<Card className="cardHighlight">
					<Card.Body>
						<Card.Title>
							<h2>Learn from Home</h2>
						</Card.Title>
						<Card.Text>
							Lorem ipsum officia sunt sed ea dolor dolore veniam nulla irure id aliqua anim nostrud cillum in irure proident duis eiusmod eiusmod elit irure consectetur eiusmod mollit aliqua pariatur elit ut nostrud ea non commodo ad in ut.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
			<Col xs={12} md={4}>
				<Card className="cardHighlight">
					<Card.Body>
						<Card.Title>
							<h2>Study Now, Pay Later.</h2>
						</Card.Title>
						<Card.Text>
							Commodo eu sint velit adipisicing ad incididunt labore voluptate tempor elit sint laborum labore ut irure id officia.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
			<Col xs={12} md={4}>
				<Card className="cardHighlight">
					<Card.Body>
						<Card.Title>
							<h2>Be Part Of Our Community</h2>
						</Card.Title>
						<Card.Text>
							Dolore quis anim deserunt amet sed ea ullamco aute velit proident magna quis quis ut in deserunt officia dolor sunt nulla occaecat incididunt deserunt laboris sint sint consectetur nisi ea ut duis deserunt commodo ut nulla. Voluptate eiusmod velit voluptate adipisicing labore in ut irure laboris incididunt consectetur dolor cupidatat aliqua enim enim minim et excepteur sed non ullamco sunt sint ex do ad ad ut sit deserunt.
						</Card.Text>
					</Card.Body>
				</Card>
			</Col>
		</Row>



		)


}