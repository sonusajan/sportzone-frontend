import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div id='footer'  className='bg-primary'>


         <div className='row w-100 m-3'>
            <Col lg={4}>
             <h4 style={{color:"blue"}}><i class="fa-solid fa-volleyball" style={{color: "#c1aa15"}}></i> SportZone</h4>
              <p style={{fontWeight:"bolder", marginTop:"20px" }}>Designed to make the sports equipments available for every sports lovers</p>
          </Col>
       
               <Col lg={4}>
                  <h3 style={{color:"grey"}}>Links</h3>
               
                  <h5> <a href="#" style={{textDecoration:"none", color:""}}>Home</a></h5>
                     <Link to={'/about'} style={{textDecoration:"none"}}><h5><a href=""style={{textDecoration:"none" , color:""}}>About Us</a></h5></Link>
                     <h5><Link to={'/contact'} style={{textDecoration:"none"}}><a href=""style={{textDecoration:"none" , color:""}}>Contact Us</a></Link></h5>
                  
               </Col>
            
               <Col lg={4}>
                   <h3 style={{color:"grey"}}>Contact Us</h3> 
                     <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Enter Email"
                      className=" w-50 mb-2"
                      aria-label="Search"
                    />
                  <Link to={'https://www.youtube.com/?gl=IN'}><Button variant="outline" className='bg-dark m-2 ' style={{color: "#da0b49;"}}>Subscribe</Button></Link></Form>
                    <div className='icons w-100'>
                        <i class="fa-brands fa-facebook m-1" style={{fontSize:"20px", color:"#63E6BE" }}></i>
                        <i class="fa-brands fa-instagram m-1"style={{fontSize:"20px", color:"#63E6BE"}}></i>
                        <i class="fa-brands fa-x-twitter m-1" style={{fontSize:"20px", color:"#63E6BE"}}></i>
                        <i class="fa-brands fa-linkedin m-1" style={{fontSize:"20px", color:"#63E6BE"}}></i>
                    </div>
               </Col>
                   
                
          
         </div>
      
        <p>Copyright © 2024 Sportzone. Built with React.</p>
    </div>
  )
}

export default Footer


//<i class="fa-solid fa-house" style="color: #63E6BE;"></i>