import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Image, InputGroup, Modal, Row } from 'react-bootstrap'
import EditProfile from './EditProfile';

function Profile() {
  const [details,setDetails] = useState('')



  useEffect(()=>{
   displayProfile()
  },[])

 const displayProfile=()=>{
  const result = JSON.parse(sessionStorage.getItem('user'))
  setDetails(result)
 }
 console.log(details);
 
  

  return (
    <div id='profile'>


      <div style={{width:"80%" ,display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:"20px"}}>
        
        
     <div style={{width:"10%"}}> 
      
    
          <Image src={details.profilepicture} alt='image' roundedCircle style={{width:"100%"}}/>
          {/* <img src={preview?preview:'https://haryana.gov.in/wp-content/themes/sdo-theme/images/default/image-gallery.jpg'} alt="image" style={{width:"50%"}}  /> */}
        
    
      </div>
     <div className='mt-3'>
     <InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={details.fname}
        /></InputGroup>
        <InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={details.email}
        /></InputGroup>
         <InputGroup className='mb-3'>
         <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={details.address? details.address : 'Empty'}
        /></InputGroup>
         <InputGroup className='mb-3'>
         <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={details.phone? details.phone : 'Empty'}
        /></InputGroup>
        <InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          type='password'
          placeholder='Password'
        /></InputGroup>
        
       
        <InputGroup className='mb-3 ms-1'>
       <Button variant='outline' className='bg-primary'>Change Password</Button>
       </InputGroup>
    </div>
          <EditProfile details={details}/>
        
      </div>
    </div>
  )
}

export default Profile
