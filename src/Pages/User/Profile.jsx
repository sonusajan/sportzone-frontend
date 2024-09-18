import React from 'react'
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap'

function Profile() {
  return (
    <div id='profile'>
      <div style={{width:"80%" ,display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:"20px"}}>
        
        
     <div style={{width:"10%"}}> <Image src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" roundedCircle style={{width:"100%"}}/></div>
     <div className='mt-3'>
     <InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='User Name'
        /></InputGroup>
        <InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='E-Mail'
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
          
        
      </div>
    </div>
  )
}

export default Profile
