import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Image, Modal, ModalBody, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link,  useNavigate } from 'react-router-dom'


function Header() {
  const[token,setToken] = useState()
  const [userName,setuserName]= useState()
  const [picture,setPicture] = useState()
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  useEffect(()=>{
    const user = sessionStorage.getItem('token')
    setToken(user)
      const userDetails = JSON.parse(sessionStorage.getItem('user'))
     
      setuserName(userDetails?.fname) 
      setPicture(userDetails) 
  },[])
  

   const logout =()=>{
    sessionStorage.clear()

   }
  


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
            <Modal
            size='sm'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <ModalBody><Image src={picture.profilepicture} alt='image'  roundedCircle style={{width:"10%"}}/></ModalBody>
        <Modal.Footer>
          <Button variant="primary" onClick={(e)=>logout(e)} >Place Order</Button>
        </Modal.Footer>
        </Modal>
             
             <Button variant='outline' className='bg-primary ms-auto' onClick={handleShow}>{userName}</Button>

             
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