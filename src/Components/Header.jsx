import React, { useContext, useEffect, useState } from 'react'
import { Badge, Button, Container, Form, Image, Modal, ModalBody, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link,  useNavigate } from 'react-router-dom'
import { headerContext } from '../context/header'
import { displayCartAPI } from '../Services/appAPI'


function Header() {
  const[token,setToken] = useState()
  const [userName,setuserName]= useState()
  const [role,setRole] = useState()
  const [picture,setPicture] = useState()
  const navigate = useNavigate()
  const {header,setHeader} = useContext(headerContext)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [count,setCount]= useState(0)
  const [products,setProducts]=useState([])

  useEffect(()=>{
    const user = sessionStorage.getItem('token')
    setToken(user)
      const userDetails = JSON.parse(sessionStorage.getItem('user'))
     
      setuserName(userDetails?.fname) 
      setPicture(userDetails?.profilepicture) 
      if(userDetails?.role == 1){
      setRole(userDetails?.role)
      }

  },[header])
  

   const logout =async()=>{
    sessionStorage.clear()
    setShow(false)
    setHeader('logout successfull')
    navigate('/login')
   }

   useEffect(()=>{
     cartcount()
   },[products,header])


   const cartcount = async()=>{
     const user = JSON.parse(sessionStorage.getItem('user'))
     const token = sessionStorage.getItem('token')
     if(token){
     const result = await displayCartAPI(user._id)
    
      setProducts(result?.data?.products)
      setCount(products?.length)
     }
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
                  <Link to={'/contact'} style={{textDecoration:"none"}}><Nav.Link href="#link" style={{fontWeight:"bolder"}}>Contact</Nav.Link></Link>
                 
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
        <ModalBody style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
          <Image src={picture} alt='image'  roundedCircle style={{width:"20%"}}/>
          {userName}
        <Link to={'/profile'}><i class="fa-solid fa-pen-to-square" onClick={handleClose}></i></Link>
        </ModalBody>
        <Modal.Footer>
          <Button variant="primary" onClick={(e)=>logout(e)} >Logout</Button>
        </Modal.Footer>
        </Modal>
             
             <Button variant='outline' className='bg-primary ms-auto' onClick={handleShow}>{userName}</Button>

             
             <Link to={'/cart'}> <Button variant='outline' className='bg-primary ms-auto'><i class="fa-solid fa-cart-shopping" style={{color: "#FFD43B"}}></i> Cart<Badge bg="secondary">{count}</Badge></Button></Link>
         
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