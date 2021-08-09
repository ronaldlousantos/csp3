//to make a component on our ReactApp we must import the core React module first
import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
/*import react-bootstrap components here*/
import {Container, Col} from 'react-bootstrap'

/*import react-router-dom components*/
import {BrowserRouter as Router} from 'react-router-dom'
import {Route,Switch} from 'react-router-dom'

/*import our components here*/
/*import Sample from './components/Sample'
import Profile from './components/myProfile'*/
import NavBar from './components/NavBar'
// import Banner from './components/Banner'
// import Highlights from './components/Highlights'
// import Course from './components/Course'
import Login from './pages/login'
// import Home from './pages/home'
// import Courses from './pages/courses'
// import NotFound from './pages/notFound'
import Register from './pages/register' 
import AddEntry from './pages/addEntry'
import AddEntryIncome from './pages/addEntryIncome'
import Category from './pages/categories'
import EditCategory from './pages/editCategory'
import AddCategory from './pages/addCategory'
import Home from './pages/home.js'
import Expenses from './pages/expenses.js'
import Savings from './pages/savings.js'
import EditEntry from './pages/editEntry.js'
import EditSavings from './pages/editSavings.js'
//import provider
import {UserProvider} from './userContext'




function App(){

  const [user,setUser] = useState({

    email: localStorage.getItem('email'),
    userId: localStorage.getItem('userId')
    // ,
    // isAdmin: JSON.parse(localStorage.getItem('isAdmin'))===true


  })

  // console.log(localStorage.getItem('email'))
  // console.log(localStorage.getItem('userId'))

function unsetUser(){
  localStorage.clear()

}
  return(

      <>

        <UserProvider value={{user,setUser,unsetUser}}>
          <Router>
          <NavBar />
          <br />
          <br />
          <br />
          <br />
          <Container>
          


                  <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/category" component={Category} />
                    <Route exact path="/addCategory" component={AddCategory}/> 
                    <Route exact path="/editCategory" component={EditCategory} />
                    <Route exact path="/addEntry" component={AddEntry} />
                    <Route exact path="/addSaving" component={AddEntryIncome} />
                    <Route exact path="/expenses" component={Expenses} />
                    <Route exact path="/savings" component={Savings} />
                    <Route exact path="/editExpense" component={EditEntry} />
                    <Route exact path="/editSavings" component={EditSavings} />
                    <Route exact path="/register" component={Register} /> 
                      

                    {/* <Route component={NotFound} /> */}
                  </Switch>
                  <br />
               </Container>
                 
            
          </Router>
        </UserProvider>
      </>

    )
}

export default App; 

