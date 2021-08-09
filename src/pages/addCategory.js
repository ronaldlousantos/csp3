import React , {useState, useContext, useEffect }from 'react'
import UserContext from '../userContext'
import {Redirect, Link} from 'react-router-dom'
import Swal from 'sweetalert2'
import {Button, Container, Col, Form} from 'react-bootstrap'


export default function AddCategory(){

	const {user} = useContext(UserContext)
	 const [categoryName, setCategoryName] = useState('')
    const [categoryType, setCategoryType] = useState( '' )
    const [willRedirect, setWillRedirect ] = useState(false)
    const [isActive, setIsActive] = useState(false)

	useEffect(()=>{

		if(categoryType !== '' && categoryName !== ''){

			setIsActive(true)

		} else {

			setIsActive(false)

		}

	},[categoryType, categoryName])

function addCategory(e){
e.preventDefault()
// console.log(e)
    // console.log(`${user.userId} ${categoryName} ${categoryType}`)
//--

fetch(`https://afternoon-coast-98402.herokuapp.com/api/categories/`,{

			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name:categoryName,
				type: categoryType,
				userId: user.userId
			})
		}).then(res =>res.json())
		  .then(data =>{
			setWillRedirect(true)

		  	Swal.fire({
		  		icon: "success",
				title: `${categoryName} has been added to Categories`
				
		  		})
		  })


}

return (
		!user.email?   
		<Redirect to="/category" />
		
		:
		willRedirect?
		<>
		<Redirect to="/category" />
		</>
		:
		<>
		  <div className="row">
			<Col ></Col>
	        <Col className="col-7">
	        <Container className="rounded  bg-light">
            

		 <Container>
		 <br /> 
        <h1 className="text-center">Add a Category</h1>
        <Form onSubmit = {(e)=>addCategory(e)}>
        <Form.Group controlId = "categoryType">
            <Form.Label>Type</Form.Label>
            <br />
                <select
	                value = {categoryType}
	           		 onChange={(e)=>setCategoryType(e.target.value)}
                > 
                <option value =''>Choose</option>
                <option value ="expense">Expense</option>
                <option value ="income">Income</option>
            </select> 
        </Form.Group>
        
        <Form.Group controlId="categoryName">
            <Form.Label>
                    Category Name
            </Form.Label>
            <Form.Control type="text" placeholder={categoryName}value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} required />
        </Form.Group>


            <Link to = "/category" className ="btn btn-secondary" >Back</Link>
            
            {isActive ? 

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