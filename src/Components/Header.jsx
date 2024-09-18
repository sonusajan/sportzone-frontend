import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link,  useNavigate } from 'react-router-dom'


function Header() {
  const[token,setToken] = useState()
  const [userName,setuserName]= useState()
 
  useEffect(()=>{
    const user = sessionStorage.getItem('token')
    setToken(user)
      const userDetails = JSON.parse(sessionStorage.getItem('user'))

      setuserName(userDetails?.fname)  
  },[])
  

  


  return (
    <div className='header'>
      <Navbar expand="lg" className="bg-primary" >
      <Container >
      <Link to={'/'} style={{textDecoration:"none"}}><Navbar.Brand href="#home" style={{color:"blue"}}><i class="fa-solid fa-volleyball" style={{color: "#c1aa15"}}></i> SportZone</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto " >
                  <Link to={'/about'} style={{textDecoration:"none"}}><Nav.Link href="#link" style={{fontWeight:"bolder"}}>About</Nav.Link></Link>
                  
                  <NavDropdown style={{fontWeight:"bolder", position:"relative"}} title="Sports" id="basic-nav-dropdown">
                    <img src=" https://dm0qx8t0i9gc9.cloudfront.net/watermarks/image/rDtN98Qoishumwih/abstract-sports-background_f17TaJ1F_SB_PM.jpg" alt="" style={{width:"100%", position:"absolute", height:"300px"}}/>
                    <Link to={'/items'} style={{textDecoration:"none"}}>
                    <NavDropdown.Item href="#action/3.1" style={{position:"relative"}}>Badminton</NavDropdown.Item></Link>
                    <NavDropdown.Item href="#action/3.2" style={{position:"relative"}}>BaseBall</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3" style={{position:"relative"}}>BasketBall</NavDropdown.Item>            
                    <NavDropdown.Item href="#action/3.3" style={{position:"relative"}}>Cricket</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3" style={{position:"relative"}}>FootBall</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3" style={{position:"relative"}}>Golf</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3" style={{position:"relative"}}>Hockey</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3" style={{position:"relative"}}>Table Tennis</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3" style={{position:"relative"}}>Tennis</NavDropdown.Item>
      
                    <NavDropdown.Item href="#action/3.4">
                      
                    </NavDropdown.Item>
                  </NavDropdown>
          </Nav>
          
        {
          token ?(
          <div>
             <Link to={'/profile'}> <Button variant='outline' className='bg-primary ms-auto' >{userName}</Button></Link>
             
             <Link to={'/cart'}> <Button variant='outline' className='bg-primary ms-auto'><i class="fa-solid fa-cart-shopping" style={{color: "#FFD43B"}}></i> Cart</Button></Link>
         
          </div>   ):(
            <Link to={'/login'}><Button variant='outline' className='bg-primary ms-auto' ><i class="fa-solid fa-right-to-bracket" style={{color: "#FFD43B"}} ></i> Login</Button></Link>
          )
        }
        
          
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header


// https://dm0qx8t0i9gc9.cloudfront.net/watermarks/image/rDtN98Qoishumwih/abstract-sports-background_f17TaJ1F_SB_PM.jpg