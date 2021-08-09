import React, {useState,useEffect,useContext} from 'react'
import {Form,Button, Col, Container} from 'react-bootstrap'

//import Swal
import Swal from 'sweetalert2'

//import user context
import UserContext from '../userContext'

//import redirect: this component allows redirection from one page to the other
import {Redirect} from 'react-router-dom'

export default function Login(){

	const {user,setUser} = useContext(UserContext)
	// const {userId, setUserId} = useState('')
	//States for Email and Password
	const [email,setEmail] = useState("")
	const [password,setPassword] = useState("")
	//State for conditionally rendering our button
	const [isActive,setIsActive] = useState(false)
	//State for redirection
	const [willRedirect,setWillRedirect] = useState(false)

	useEffect(()=>{

		if(email !== "" && password !== ""){

			setIsActive(true)

		} else {

			setIsActive(false)

		}

	},[email,password])

	function loginUser(e){

		e.preventDefault()


		fetch('https://afternoon-coast-98402.herokuapp.com/api/users/login',{

			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log("user id is "+ data.userId)
			console.log("data message" +data.message)
			if(data.err ){
				Swal.fire({
					icon: "error",
					title: "Login failed.",
					text: data.err

				})

			} else {
				console.log(data)

				/*localStorage is a way for us to store data in our browsers. It can be found in our application tab in the dev tools.*/
				localStorage.setItem('token',data.accessToken)

				fetch('https://afternoon-coast-98402.herokuapp.com/api/users/',{

					headers: {

						Authorization: `Bearer ${data.accessToken}`

					}


				})
				.then(res => res.json())
				.then(data => {

					console.log(data)
					/*
						Mini-Activity:

						Set your user's email and isAdmin properties in our localStorage.

						To save data into localStorage:

						localStorage.setItem('key',data)


					*/
					localStorage.setItem('email',data.email)
					localStorage.setItem('userId',data._id)

					setUser({
						email: data.email,
						userId: data._id //isAdmin - bool
					})

					//update the willRedirect state after logging in.
					setWillRedirect(true)
					
					Swal.fire({

						icon: "success",
						title: "Successful Log In!",
						text: `Thank you for logging in, ${data.firstName}`

					})

					//window.location.replace refreshes page as we relocate
/*					window.location.replace('/courses')
*/


					/*{data:[{
						
						userDetails

					}]}*/

				})

			}

		
		})


		setEmail("")
		setPassword("")
	
	}

	return (

			user.email || willRedirect
			?
			<Redirect to='/'/>
			//should go to account later
			:
			<>
			  <div className="row">
			<Col ></Col>
            <Col className="col-7">
            <Container className="rounded  bg-light">

			<Form onSubmit={e => loginUser(e)}>
				<Form.Group controlId="userEmail">
				<br />
					<h1 className="text-center">Login</h1>
				<br />
				<br />


					<Form.Label>
						Email
					</Form.Label>
					<Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
				</Form.Group>
				<Form.Group controlId="userPassword">
					<Form.Label>
						Password
					</Form.Label>
					<Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}required />
				</Form.Group>
				{

					isActive
					?
					<Button variant="primary" type="submit">Submit</Button>
					:
					<Button variant="primary" disabled>Submit</Button>

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
