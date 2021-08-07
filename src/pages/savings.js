import React, {useState, useContext, useEffect } from 'react';
// import Banner from '../components/Banner';
// import Category from '../components/Category';
import {Table  , Container } from 'react-bootstrap'
import UserContext from '../userContext'
// import Swal from 'sweetalert2'
import {Redirect, Link} from 'react-router-dom'

export default function Entries() {
    // const [allCategories, setAllCategories] = useState([])
	const {user} = useContext(UserContext)
    const [activeCategories, setActiveCategories] = useState([])
    // const [update, setUpdate] =useState("")
    // const [categoryName, setCategoryName] = useState("")
    // const [categoryType, setCategoryType] = useState("expense")

useEffect(()=>{

    fetch("http://afternoon-coast-98402.herokuapp.com/api/entries/"    ,{

			method: 'GET',
			headers: {
		
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		}
        )
    .then(res=>res.json())
    .then(data=>{
    	// console.log(user)
        // -
        // setAllCategories(data)
        
        let categoryTemp = (data==null)? [] : data;
        // console.log(categoryTemp instanceof Array)	
       let tempArray = [];
        if(categoryTemp instanceof Array){
            tempArray =categoryTemp.filter(entry =>{
    		// console.log(entry)
            return entry.type ==="income";
        })}
        setActiveCategories(tempArray)
        // console.log(tempArray )
    })
// },[update])
})
let categoryRows = activeCategories.map( categories=>{
    // console.log(categories)
     let date = new Date(categories.createdAt)
    // console.log(date)
    let textdate =date.toDateString();
    return (
        <>
      
            
        <tr key={categories._id}>
            {/* <td>{categories._id}</td> */}
            <td>{categories.category}</td>
            <td className={(categories.type==="expense")? "text-danger": "text-info"}>{(categories.type==="expense") ? "Expense": "Income"}</td>
            <td >P{categories.amount}</td>
            <td >{textdate}</td>
            
            <td>
              <Link className ="btn btn-primary" to={{pathname: "/editSavings",state:categories}}>Edit</Link>
            </td>
        </tr>
       
        </>
    )
})

return(
	        user.email ?
        
        <>
        <Container className="rounded  bg-light">

        <br />      
        <h1 className="text-center">Savings</h1>
            
        <br />      
        <br />      
        <Table striped bordered hover>
            <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        
                        <th>Amount</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
              {categoryRows}
                </tbody>
        </Table>
        </Container>
        </>
        :
        <>
        <Redirect to = "/login" />
        </>



	)
}