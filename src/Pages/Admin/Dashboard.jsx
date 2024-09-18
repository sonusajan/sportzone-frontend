import React, { useState } from 'react'
import { Button, Col, Row, Tab, Tabs } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Dashboard() {
    
    
  return (
    <div style={{width:"100%", marginBottom:"120px"}}>
     
   
        <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:"10px"}}>
            <h4 color='blue'>Welcome Admin</h4>
            <div>
               <div className='row m-3'>
                  <Col><Link to={'/users'}><Button variant="outline" className="bg-primary m-5 " style={{width:"300px",height:"200px"}}><i class="fa-solid fa-user" style={{color: "#FFD43B", fontSize:"30px"}}></i><br />Registered Users</Button></Link></Col>
                  <Col><Link to={'/productdetails'}><Button variant="outline" className="bg-primary m-5" style={{width:"300px",height:"200px"}}><i class="fa-solid fa-cart-shopping" style={{color: "#FFD43B" , fontSize:"30px"}}></i><br />Products </Button></Link></Col>
                <Col > <Link to={'/orderdetails'}><Button variant="outline" className="bg-primary m-5" style={{width:"300px",height:"200px"}}><i class="fa-solid fa-bag-shopping" style={{color: "#FFD43B" , fontSize:"30px" }}></i><br />Orders</Button></Link></Col>
               </div>
            </div>
           
        </div>
      
      
    </div>
  )
}

export default Dashboard
