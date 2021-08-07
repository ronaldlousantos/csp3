import React,{useContext} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {NavLink, Link} from 'react-router-dom'
import UserContext from '../userContext'
export default function NavBar(){
    const {user,unsetUser,setUser} = useContext(UserContext)

function logout(){
	unsetUser()
	setUser({

		email:null,
		isAdmin:null

	})

	window.location.replace('/login')
}

return (


    <Navbar className="fixed-top" bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/" >Budgeteer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                
                {
                    user.email
                    ? 
                    
                    <>
                        <Nav.Link as={NavLink} to="/">Your Account</Nav.Link>
                        <Nav.Link as={NavLink} to="/addEntry">Add Expense</Nav.Link>
                        <Nav.Link as={NavLink} to="/addSaving">Add Saving</Nav.Link>
                        <Nav.Link as={NavLink} to="/category">Categories</Nav.Link>
                        <Nav.Link as={NavLink} to="/expenses">Expenses</Nav.Link>
                        <Nav.Link as={NavLink} to="/savings">Savings</Nav.Link>

                        
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    </>
                    : 
                    <>
                        <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                    </>
                }

            </Nav>
        </Navbar.Collapse>
    </Navbar>


    )

}