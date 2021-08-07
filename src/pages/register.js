import React, {useState,useEffect} from 'react'

/*bootstrap components*/
import {Form,Button, Col,Container} from 'react-bootstrap'

/*sweetalert*/
import Swal from 'sweetalert2'

//import redirect: this component allows redirection from one page to the other
import {Redirect} from 'react-router-dom'

export default function Register(){


	/*Review
		
		Props

			Props is a way to pass data from a parent component to child component. It is used like HTML attributes and the data to be passed is in a curly brace. Prop names are user defined. 

		States

			States provide a way to store information within the component. This information can then be updated within the component. When a state is updated through its setter function, it will re-render the component.

		Hooks
			Special/react-defined methods/functions that allow us to do certain tasks: create states or create effects.

		useState
			useState() is a hook to create states. useState returns an array with 2 items. The first item is the state variable and the second is the setter function. We destructure this array and assign variables for our state and its setter function:

			const [stateName,setStateName] = useState(initialValue of State)

		useEffect

			useEffect() is a hook to create effects. These effects will allow us to run a function or task based on when our effect will run. Our useEffect is able to run on initial render and when the component re-renders IF there is no dependency array. IF there is a dependency array but it is empty, the useEffect will ONLY run on iniital render. If there is a dependency array AND there is a state inside the dependency array the useEffect will run anytime the state in the dependency array is updated.

		Mini-Activity

		Create states for the following:

			firstName
			lastName
			email
			mobileNo
			password
			confirmPassword

		Let all states have an empty string as initial value.

	*/

	/*states to store value of form inputs*/
	const [firstName,setFirstName] = useState("")
	const [lastName,setLastName] = useState("")
	const [email,setEmail] = useState("")
	const [mobileNo,setMobileNo] = useState("")
	const [password,setPassword] = useState("")
	const [confirmPassword,setConfirmPassword] = useState("")

	/*conditional rendering for button*/
	const [isActive,setIsActive] = useState(false)
	const [willRedirect,setWillRedirect] = useState(false)

	/*
		Two-Way Binding

			In react, one way to create forms is with the use of two-way binding. Wherein, we bind the value of our input to its appropriate state. That is to ensure that we can save the value of our input in our states.
			
			After binding the state with the value of an input, we cannot type into input element. Because the current value of the input is bound and the same as the initial value of our state. Therefore, we add an onChenge event so that on change of the value of our input, we will update the state with the current value of the input.
			
			<Form.Control type="inputType" value={inputState} onChange={e=>{setInputeState(e.target.value)}} />

			e - event, there was on change event. e is the event and can be receieved by the function within our inline event.

			target - is the element WHERE the event happened.

			value - value is the current value of the element where the event happened.

	*/

	/*
		
		useEffect(()=>{

			useEffect will allow us to run a function or task on initial render and whenever our component re-renders IF there is no dependency array.
			useEffect will run on initial render only IF there is an EMPTY dependency array.
			useEffect will run on initial render and whenever the state in its dependency array is updated.
			useEffect will always run on initial render regardless if there is a dependency array or not.
			console.log("I will only run on initial render and when sample1 state updates.")

		},[sample1])

	*/
/*	console.log(firstName)
	console.log(lastName)
	console.log(email)
	console.log(mobileNo)
	console.log(password)
	console.log(confirmPassword)*/

	/*This useEffect is able to check our states as we type and update it with our input.*/

	useEffect(()=>{

		if( (password.length >= 8) &&  ( firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" &&password !== "" && confirmPassword !== "") && (password === confirmPassword) && (mobileNo.length === 11)){

			setIsActive(true)
			console.log("ok")
		} else {
			
			setIsActive(false)
			console.log("nope")
		}

	},[firstName,lastName,email,mobileNo,password,confirmPassword])

	/*
		Mini-Activity:

		Create an input element for each of the other states we created. They should all be in a Form.Group:

			lastName
			email
			mobileNo
			password
			confirmPassword

		All states should be bound to their appropriate input.
		All input should have an onChange event to update the states.
		All input should have type appropriate for their states.

		Note: add a console log for each state so you can see if you've bound the state into the input correctly.

	*/

	function registerUser(e){

		/*Submit event has a default behavior, for now, it will refresh the page and therefore, we lose our information*/
		e.preventDefault()
		console.log("The page will no longer refresh because of submit.")
		/*Good Practice: Check the states before passing to fetch*/		
/*		console.log(firstName)
		console.log(lastName)
		console.log(email)
		console.log(mobileNo)
		console.log(password)*/

		/*

		Fetch is javascript which will allow us to process requests and receive responses from our api.

		fetch(<urlInString>,{options

			method: "requestMethod",
			headers: {
				
				'Content-Type': 'application/json'

			},
			body: JSON.stringify({
				
				key: value

			})

		})

		*/

		fetch('http://afternoon-coast-98402.herokuapp.com/api/users/',{

			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({

				firstName: firstName,
				lastName: lastName,
				email: email,
				mobileNo: mobileNo,
				password: password,
				confirmPassword: confirmPassword

			})

		//response should be parsed into an object to be used in javascript, that is with the use of .json()
		})
		.then(response => response.json())
		.then(data => {

			//actual response from the server/api
			console.log(data)
			//if there is an error like same email or undefined property within the body
			/*
				{message: "message"}

			*/
			if(data.message){

				Swal.fire({

					icon: "error",
					title: "Registration Failed.",
					text: data.message

				})

			} else {

				Swal.fire({

					icon: "success",
					title: "Registration Successful!",
					text: "Thank you for registering."

				})

				//update the willRedirect state to true after user registers successfully.
				setWillRedirect(true)

			}

		})

		//reset input states/ states bound to input to their initial values
		setFirstName("")
		setLastName("")
		setMobileNo("")
		setEmail("")
		setPassword("")
		setConfirmPassword("")

	}
	return (
		
		willRedirect
		?
		<Redirect to="/" />
		:
		<>
			  <div className="row">
			<Col ></Col>
            <Col className="col-7">
            <Container className="rounded  bg-light">
            
		<Form onSubmit={e=>registerUser(e)}>
		<br />
			<h2 className="text-center">Register</h2>
			<br />
			<br />

			<Form.Group>
				<Form.Label>First Name:</Form.Label>
				<Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={e=>{setFirstName(e.target.value)}} required/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Last Name:</Form.Label>
				<Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={e=>{setLastName(e.target.value)}} required/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Email:</Form.Label>
				<Form.Control type="email" placeholder="Enter Email" value={email} onChange={e=>{setEmail(e.target.value)}} required/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Mobile Number:</Form.Label>
				<Form.Control type="number" placeholder="Enter 11 Digit Mobile No." value={mobileNo} onChange={e=>{setMobileNo(e.target.value)}} required/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Password:</Form.Label>
				<Form.Control type="password" placeholder="Enter Password (Minimum of 8 Characters)" value={password} onChange={e=>{setPassword(e.target.value)}} required/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Confirm Password:</Form.Label>
				<Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e=>{setConfirmPassword(e.target.value)}} required/>
			</Form.Group>
			{
				isActive
				? <Button variant="primary" type="submit">Submit</Button>
				: <Button variant="secondary" disabled>Submit</Button>
			}
			
		</Form>
            <br />
			</Container>
                 </Col>
                 <Col ></Col>
                 </div>
		</>
		)

}