import React, { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { editUsers } from '../../Services/appAPI';

function EditProfile({details}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [preview,setPreview] = useState()


  
    const [editUser,setEditUser] = useState(
      {
        profilepicture:details.profilepicture,
        fname:details.fname,
        email:details.email,
        address:details.address,
        phone:details.phone
        
      }
    )
    console.log(editUser);


    useEffect(()=>{
      if(editUser.profilepicture){
        setPreview(URL.createObjectURL(editUser.profilepicture))
      }
    },[editUser.profilepicture])

    const updateUser=async()=>{
        const user = JSON.parse(sessionStorage.getItem('user'))
        const token = sessionStorage.getItem('token')
        const {profilepicture,fname,email,address,phone} = editUser
        if(!profilepicture || !fname || !email || !address || !phone)
        {
          alert('please enter the essential data')
        }else{
          
        if(!token){
          alert('not logged in')
        }else{
          var reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization" : `Bearer ${token}` 
          }
          const reqBody = new FormData()
          reqBody.append('fname',fname)
          reqBody.append('email',email)
          preview?  reqBody.append("profilepicture",profilepicture): reqBody.append("profilepicture",editUser.profilepicture)

          const result = await editUsers(user._id,editUser,reqHeader)
        }
      }
        
    }
    

  return (
    <div>
                <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
        <InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={editUser?.fname}
          onChange={(e)=>setEditUser({...editUser,fname:e.target.value})}

        /></InputGroup>

<InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={editUser?.email}
          readOnly
          
        /></InputGroup>

<InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={editUser?.address}
          onChange={(e)=>setEditUser({...editUser,address:e.target.value})}

        /></InputGroup>

<InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={editUser?.phone}
          onChange={(e)=>setEditUser({...editUser,phone:e.target.value})}

        /></InputGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
    </div>
  )
}

export default EditProfile
