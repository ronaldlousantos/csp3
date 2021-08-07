import React, {useState,useEffect} from 'react'

import {Card,Button} from 'react-bootstrap'

export default function Category({categoryProp}){

	

	/*Array destructuring*/
	const [count,setCount] = useState(0)
	const [seats,setSeats] = useState(30)
	const [isActive,setIsActive] = useState(true)

	/*Will check if seats is 0, set the isActive state to false and conditionally render the button as disabled every time our component re-renders.*/

	useEffect(()=>{

		if(seats === 0){
			setIsActive(false)
		}

	},[seats])

	/*
		count =  is the state variable
		setCount = is the function to update our state.
		The value passed as argument in useState() becomes our initial value.
	*/

/*	let sampleVar = 0
	console.log(sampleVar)*/

	/*console.log(count)*/

	function enroll(){

			setCount(count + 1)
			setSeats(seats - 1)

/*			if(seats === 0){
				setIsActive(false)
			}*/

	/*		sampleVar = sampleVar + 1*/

	}

	/*console.log("This console log will run whenever a state is updated using its set function.")*/

	/*using the set function to update a state outside of a function or a useEffect will cause infinite loop*/
	/*setCount(count+1)*/


	/*
		Rendering

		Rendering is the process of running our components and showing our elements. Whenever we update a state with the set function it came with, we re-render our component. Meaning to say, we run the function again. 

		When our component runs and shows our elements for the first time, we call that as our initial render.

		Conditional Rendering

		Conditional rendering is when we render or not render an element based on a condition.


	*/

	/*
		Mini-Activity:


		Create a new state and name the state variable as seats and its set function as setSeats. The initial value of the state is 30.

		Whenever the enroll function is run by clicking on our button, the seats state should be updated and decrease by 1.

		In a Card.Text component conditionally render a span.
			
			If the seats state is equal to zero, show a span with a red colored text:
			"No More Seats Available."
			
			Else, show a span with a green colored text showing the value of the seats 
			state.

	*/
	/*

		Activity
		
		Conditionally render buttons for our enrollment.

		If the seats count finally hits zero, show a button that is disabled and has no onClick event anymore.

		If the seats is more than zero, show a button that is accessible and is working as intended.

		Pushing instructions
		Add your changes to your s45-s50 repo: git add .
		Commit your changes: git commit -m "includes mini-activities and activity 2 states"
		push your updates: git push origin master


	*/
	return (


			<Card>
				<Card.Body>
					<Card.Title>
						<h2>{categoryProp.categoryName}</h2>
					</Card.Title>
					<Card.Text>
						{categoryProp.description}
					</Card.Text>
					<Card.Text>
						Price: {categoryProp.price} PHP
					</Card.Text>
					<Card.Text>
						Enrollees: {

							count === 0 

							? <span className="text-danger">No Enrollees Yet. </span>

							: <span className="text-success">{count}</span>

						}
					</Card.Text>
					<Card.Text>
						Seats: {

							seats === 0

							? <span className="text-danger">No more seats available</span>
							: <span className="text-success">{seats}</span>

						}
					</Card.Text>
					{
						isActive === false

						? <Button variant="primary" disabled>Enroll</Button>
						: <Button variant="primary" onClick={enroll}>Enroll</Button>
					}
					
				</Card.Body>
			</Card>



		)

}