import React , {useState, useEffect, useContext }from 'react'
import UserContext from '../userContext'
import {Redirect, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import {Button, Container, Col, Form} from 'react-bootstrap'

export default function AddEntry() {

	const [amount, setAmount] = useState(0)
	
	const [category, setCategory] = useState('')
	const {user} = useContext(UserContext)
	const [update, setUpdate] = useState(false)
	// const [emptyCatUpdate, setEmptyCatUpdate] = useState(false)

	const [allCategories, setAllCategories] = useState([]);
	// const [activeCategories, setActiveCategories] = useState([])

useEffect(()=>{
	if ((amount ===0 || amount ==='') || (category ==='')){
		setUpdate(false)
	} else  {
		setUpdate(true)
	} 

	},[category, amount])


useEffect(()=>{

	fetch("http://afternoon-coast-98402.herokuapp.com/api/categories/",{
		method: 'GET',
		headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`		
	}})
	.then(res=> res.json())

	.then(data=>{
		console.log(data)
		// console.log("I'm here")
         // console.log("hey" +data)
            let expenseTemp = (data!=null)? data : [];
            

            let tempArray = [];
            
            if(typeof categoryTemp!=null){
            // if(true){
                 tempArray=expenseTemp.filter(expense =>{
                //enable this later
                // console.log("inside")
                return expense.type ==="expense";
                
            })
            }
            setAllCategories(tempArray)
})
},[])

function addEntry(e) {
	
	console.log({
			category:category,
			amount:parseInt(amount),
			type: "expense",
			id: user.userId
		})
	e.preventDefault()
	fetch("http://afternoon-coast-98402.herokuapp.com/api/entries/",{
		method: "POST",
		
		headers:{
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('token')}`
		},
		body:JSON.stringify({
			category:category,
			amount:parseInt(amount),
			type: "expense",
			id: user.userid
		})

	}).then(res =>res.json())
	.then(data => {
		console.log(data)
		if(data.message	){
			Swal.fire({

						icon: "success",
						title: "Entry Added!!",
						text: `An expense of P ${amount}  for ${category} has been added`

					})
		}


		})




}


let selectCategory = allCategories.map((categoryItem) =>{
	// console.log(categoryItem.name)
	return (
		<>
		<option key ={categoryItem._id} value ={categoryItem.name}>{categoryItem.name}</option>
		
		</>
		)
})

return (
	// emptyCatUpdate ?
	// 	<Redirect to="/expenses" />
	// 	:
		!user.email ?
			<Redirect to="/login" />
			:
			<>
			
				  <div className="row">
			<Col ></Col>
            <Col className="col-7">
            <Container className="rounded  bg-light">


			<Container>
			<Form  onSubmit = {e=>addEntry(e)}>
				<br />
				<h1 className="text-center">Add an Expense</h1>
				<br />
				<br />
				<Form.Group>
					<Form.Label>Category</Form.Label><br />
				<select 
					value ={category} 
					onChange={e=>setCategory(e.target.value)
					}>
					<option value ="">Choose a Category</option>
						{selectCategory}
				</select>
				</Form.Group>

				<Form.Group>
					<Form.Label>Amount</Form.Label>
					<Form.Control type ="number" onChange = {e=>setAmount(e.target.value)}></Form.Control>
				</Form.Group>

				



			<Link to = "/category" className ="btn btn-secondary" >Back</Link>
           {	update ?

            <Button variant="primary" type="submit">Save</Button>
            :
            <Button variant="secondary" disabled>Save</Button>
			}
	</Form>
	</Container>
		<br />
			</Container>
                 </Col>
                 <Col ></Col>
                 </div>
</>
)
}
