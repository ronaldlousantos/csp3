import React , {useState,useEffect, useContext }from 'react'
import UserContext from '../userContext'
import { Link, withRouter } from 'react-router-dom'
// import Swal from 'sweetalert2'
import {Button, Container,Col,  Form} from 'react-bootstrap'



// export default withRouter(EditCategory)





const EditCategory =function(props){

    const [categoryName] = useState('' )
    // const [update, setUpdate] = useState("")
    
    const [categoryType] = useState( 'expense' )

    // console.log(props.location.state.userId)
    // let catName =props.location.state.name || null;
    // let catType =props.location.state.type ||null;
    // console.log(props.location.state)
    // const [userId , setUserId] = useState(user.userId)
    const {user} = useContext(UserContext)
    const [amount, setAmount] = useState(0)
    // const [willRedirect, setWillRedirect ] = useState()
    const [activeCategories, setActiveCategories] = useState([])
    // const [type, setType] = useState('expense')
    const [itemId, setItemId] = useState('')
    useEffect(()=>{
        // console.log("user is "+user.userId)

        fetch("https://afternoon-coast-98402.herokuapp.com/api/categories/"
            ,{

                method: 'GET',
                headers: {
            
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }}
            )
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            // console.log(localStorage.getItem('token'))
            //-
            // setAllCategories(data)
            // console.log("hey" +data)
            let categoryTemp = (data!=null)? data : [];
            

            let tempArray = [];
            
            // if(typeof categoryTemp!=null){
            if(true){
                 tempArray=categoryTemp.filter(category =>{
                //enable this later
                // console.log("inside")
                return (category.userId ===user.userId &&category.type==="income");
                
            })
            }
            // console.log(tempArray)
            setActiveCategories(tempArray)
            // console.log("tempArray: " +tempArray )
            
        })
    }) 

    // console.log(props, props)
    function editCategory(e){
	e.preventDefault()
    // console.log("item Id " +itemId)
    let entryHolder = activeCategories.filter(entry=>{
        return entry._id === itemId
    })
    // console.log(entryHolder)


    // console.log({
    //             category:entryHolder[0].name,
    //             amount:amount,
    //             userId:user.userId,
    //             type: entryHolder[0].type
               
    //         })
    fetch(`https://afternoon-coast-98402.herokuapp.com/api/entries/${props.location.state._id}`,{

			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
              category:entryHolder[0].name,
                amount:amount,
                userId:user.userId,
                type: entryHolder[0].type
               
			})
		})
        .then(res => res.json())
		.then(data => {
            // console.log(data)
        //     let swaltext = (catType != categoryType) ? `${categoryName} is now an ${categoryType}`: "";
        //     Swal.fire({

        //                 icon: "success",
        //                 title: `${catName} has been changed to ${categoryName}`,
        //                 text: swaltext
        // })

        // setWillRedirect(true);
        })
        // this.props.history.push('/category')
        // window.location.href = "/category"
    }

        let selectCategory = activeCategories.map((categoryItem, index) =>{
            // console.log(activeCategories)
            // console.log(index)
            return (
                <>
                <option key ={categoryItem._id} value={categoryItem._id} >{categoryItem.name}</option>
                
                </>
                )


        })



    return (
   //       willRedirect
			// ?
			// <Redirect to='/category'/>
			// //should go to account later
			// :
        <>
          <div className="row">
            <Col ></Col>
            <Col className="col-7">
            <Container className="rounded  bg-light">

        <Container>
        <br />
        <h1 className="text-center">Edit Saving</h1>
        <Form onSubmit = {(e)=>editCategory(e)}>
        <Form.Group controlId="categoryName">
            <Form.Label>
                    Amount
            </Form.Label>
            <Form.Control type="number"  onChange={(e)=>setAmount(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId = "categoryType">
            <Form.Label>Type</Form.Label>
            <br />
            <select value ={itemId} onChange={e=>{setItemId(e.target.value)}}>
                    {selectCategory}
            </select>
            {categoryName}
            {categoryType}
        </Form.Group>
        

            <Link to = "/savings" className ="btn btn-secondary" >Back</Link>
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