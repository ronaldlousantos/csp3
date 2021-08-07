import React , {useState }from 'react'
// import UserContext from '../userContext'
import {Redirect, Link, withRouter } from 'react-router-dom'
// import Swal from 'sweetalert2'
import {Button, Container,Col, Form} from 'react-bootstrap'



// export default withRouter(EditCategory)

const EditCategory =function(props){
    // let catName =props.location.state.name || null;
    // let catType =props.location.state.type ||null;
    const [categoryName, setCategoryName] = useState('' )
    const [categoryType, setCategoryType] = useState( 'expense' )
    // console.log(props.location.state.userId)
    // console.log(props.location.state)
    // const {user} = useContext(UserContext)
    const [willRedirect, setWillRedirect ] = useState()



    function editCategory(e){
	// e.preventDefault()

    fetch(`http://afternoon-coast-98402.herokuapp.com/api/categories/${props.location.state._id}`,{

			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				name:categoryName,
				type: categoryType
			})
		})
        .then(res => res.json())
		.then(data => {
            console.log(data)
        //     let swaltext = (catType != categoryType) ? `${categoryName} is now an ${categoryType}`: "";
        //     Swal.fire({

        //                 icon: "success",
        //                 title: `${catName} has been changed to ${categoryName}`,
        //                 text: swaltext
        // })

        setWillRedirect(true);
        })
        this.props.history.push('/category')
        // window.location.href = "/category"
    }


    return (
         willRedirect
			?
			<Redirect to='/category'/>
			//should go to account later
			:
        <>
          <div className="row">
            <Col ></Col>
            <Col className="col-7">
            <Container className="rounded  bg-light">


        <Container>
        <br />
        <h1 className="text-center">Edit This Category</h1>
        <Form onSubmit = {(e)=>editCategory()}>
        <Form.Group controlId="categoryName">
            <Form.Label>
                    Category Name
            </Form.Label>
            <Form.Control type="text" placeholder={categoryName}value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId = "categoryType">
            <Form.Label>Type</Form.Label>
            <br />
                <select
                value = {categoryType}
            onChange={(e)=>setCategoryType(e.target.value)}
                > 
                <option value ="expense">Expense</option>
                <option value ="income">Income</option>
            </select> 
        </Form.Group>
        

            <Link to = "/category" className ="btn btn-secondary" >Back</Link>
            <Button variant="primary" type="submit">Save Changes</Button>

				


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
export default withRouter(EditCategory)


//https://levelup.gitconnected.com/how-to-pass-additional-data-while-redirecting-to-different-route-f7bf5f95d48c