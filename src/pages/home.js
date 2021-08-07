
import React ,  {useState, useContext, useEffect } from 'react'
import UserContext from '../userContext'
import {Redirect} from 'react-router-dom'

import {Container} from 'react-bootstrap'
/*import banner and highlights components*/

export default function Home(){

const {user} = useContext(UserContext)
const [userName, setUserName] = useState("")
const [expenseTotal,setExpenseTotal] =useState([])
const [savingsTotal,setSavingsTotal] =useState([])
const [allExpenses, setExpenses] = useState([])
const [allSavings, setSavings] = useState([])
const [balanceFinal, setBalanceFinal] = useState(0)
const [update, setUpdate] = useState(false)

// console.log(user.userId)

useEffect(()=>{

fetch('http://afternoon-coast-98402.herokuapp.com/api/users/',
	{
		headers: {

			'Authorization': `Bearer ${localStorage.getItem('token')}`

					},
		user:{
			id:user.userId

		}

	}
	
		).then(res=>res.json())
		.then(data =>{

			setUserName(data.firstName)

		

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
        
        // setAllCategories(data)
        let categoryTemp = data;
        // let categoryTemp = (data==null)? [] : data;
        // console.log(categoryTemp instanceof Array)	
       let tempExpense = [];
       let tempSavings = [];
        if(categoryTemp instanceof Array){
            tempExpense = categoryTemp.filter(entry =>{
    		return entry.type ==="expense";
    	})
            tempSavings = categoryTemp.filter(entry =>{
    		return entry.type ==="income";
        })
         if((tempExpense instanceof Array) &&  tempSavings instanceof Array){
         	// console.log(tempExpense)
			setExpenses(tempExpense)        	
			setSavings(tempSavings)
         	setUpdate(true)
         	console.log("arf arf array is in")
         }else{
         	setUpdate(false)
         	console.log("bowow no array is in")
         }

        }
        
       
    })

})
})

useEffect(()=>{
	if(update === true &&(allExpenses.length>0)){
		let expense =(allExpenses.map(entry=> entry.amount)).reduce((x,y)=>x+y);
        setExpenseTotal(expense)

	} else{
		setExpenseTotal(0)
	}

	if(update === true &&(allSavings.length>0)){
        let savings =(allSavings.map(entry=> entry.amount)).reduce((x,y)=>x+y);
        setSavingsTotal(savings)
    } else{
        setSavingsTotal(0)
    }
 	if (update ===true ){
 	}
    
},[update])

useEffect(()=>{
	    let balance = savingsTotal - expenseTotal;
        setBalanceFinal(balance)
 	

},[expenseTotal, savingsTotal])












	

console.log("Hello")
	return (
			!user.email ?
			<>
			<Redirect to='/login' />
		</>
			:
			<>
			<Container className="rounded  bg-light">

				<br />
				<h1 className="text-center">Hi, {userName}!</h1>
				<Container className ="border rounded">
				<br />
				<br />
					<div className="row">
						<h4 className="col text-info">Your Savings: </h4>
						<h4 className="col text-info">P {savingsTotal}</h4>
					</div>
					<div className="row">
						<h4 className="col text-primary">Your Expenses:</h4>
						<h4 className="col text-primary"> P {expenseTotal}</h4>
					</div>
					<br />
					<div className="row">
						
						<h4 className="col border-top"> Your Balance: </h4>
						<h4 className ="col border-top">{
							(balanceFinal >=0) ? `P ${balanceFinal}`: `- P ${Math.abs(balanceFinal)}`	 
							}
						</h4>
					</div>
				</Container>
				</Container>
			</>	

		)

}