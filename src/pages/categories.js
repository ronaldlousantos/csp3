import React, {useState, useContext, useEffect } from 'react';
// import Banner from '../components/Banner';
// import Category from '../components/Category';
import {Table, Container} from 'react-bootstrap'
import UserContext from '../userContext'
// import Swal from 'sweetalert2'
import {Redirect, Link} from 'react-router-dom'


export default function Categories(){

    const [allCategories, setAllCategories] = useState([]);
	const {user} = useContext(UserContext)
    // const [activeCategories, setActiveCategories] = useState([])
    // const [update, setUpdate] =useState("")
    // const [categoryName, setCategoryName] = useState("");
    // const [categoryType, setCategoryType] = useState("expense")

useEffect(()=>{

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
        setAllCategories(data)
        // console.log("hey" +data)
        let categoryTemp = (data==null)? [] : data;
        // console.log(categoryTemp)
       let tempArray = [0];
       tempArray.pop();
        if((typeof categoryTemp)==Object){
       tempArray =categoryTemp.filter(category =>{
        //     //enable this later
            return category.type ==="income";
        })}
        // setActiveCategories(tempArray)
        // console.log(tempArray )
    })
})
// },[update])
//putting allCategories in the dependency array would cause an inf loop 



let categoryRows = allCategories.map( categories=>{
    // console.log(categories)
    return (
        <>
      
            
        <tr key={categories._id}>
            {/* <td>{categories._id}</td> */}
            <td>{categories.name}</td>
            <td className={(categories.type==="expense")? "text-primary": "text-info"}>{(categories.type==="expense") ? "Expense": "Income"}</td>
            
            <td>
              <Link className ="btn btn-primary" to={{pathname: "/editCategory",state:categories}}>Edit</Link>
            </td>
        </tr>
       
        </>
    )
})




    return (
        user.email ?
        
        <>
        <Container className="rounded  bg-light">

        <br />  
        <h1 className="text-center">Categories</h1>
        
        <br />  
            <Link className = "btn btn-primary" to ="/addCategory">Add Category </Link>
        <br />  
        <br />  
        <Table striped bordered hover>
            <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
              {categoryRows}
                    
                </tbody>
              
        </Table>
        <br />
        </Container>
        </>
        :
        <>
        <Redirect to = "/login" />
        </>
    )
}

