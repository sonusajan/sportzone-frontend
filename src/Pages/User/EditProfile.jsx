import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { editUsers } from '../../Services/appAPI';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../Services/baseUrl';
import { headerContext } from '../../context/header';

function EditProfile({details}) {

    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [preview,setPreview] = useState()
    const {header,setHeader} = useContext(headerContext)
    
  //  const [picture,setPicture]= useState({
  //   profilepicture : JSON.parse(sessionStorage.getItem('user')).profilepicture
  //  }
  // )
     
     
    //  const [details,setDetails] = useState([])
    // const data = JSON.parse(sessionStorage.getItem('user'))
    // setDetails(data)
    // console.log(data);
    
    const [editUser,setEditUser] = useState(
      {
        
        fname:JSON.parse(sessionStorage.getItem('user')).fname,
        lname:JSON.parse(sessionStorage.getItem('user')).lname,
        address:JSON.parse(sessionStorage.getItem('user')).address,
        phone:JSON.parse(sessionStorage.getItem('user')).phone,
        profilepicture:""
      }
    )

    // const [editUser,setEditUser] = useState(
    //   {
        
    //     fname:'',
    //     lname:"",
    //     address:"",
    //     phone:"",
    //     profilepicture:''
    //   }
    // )

   

  //  const display=async()=>{
  //   const result = JSON.parse(sessionStorage.getItem('user'))
  //   setDetails(result)
  //  }


    useEffect(()=>{
      if(editUser.profilepicture){
        setPreview(URL.createObjectURL(editUser.profilepicture))
        
      }
     },[editUser.profilepicture])

    const updateUser=async()=>{
        const user = JSON.parse(sessionStorage.getItem('user'))
        const token = sessionStorage.getItem('token')
        const {fname,lname,address,phone,profilepicture} = editUser
        if( !fname || !lname || !address ||!phone )
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
          reqBody.append('lname',lname)
          
          reqBody.append('address',address)
          reqBody.append('phone',phone)
          
           preview?  reqBody.append("profilepicture",profilepicture): reqBody.append("profilepicture",editUser.profilepicture)

          const result = await editUsers(user?._id,reqBody,reqHeader)
          if(result.status == 200){
            alert('updated successfully')
            sessionStorage.setItem('user',JSON.stringify(result.data))
            setShow(false)
            setHeader(result)
            navigate('/profile')
          }else{
            alert('error')
          }
        }
      }
        
    }


  //   const updateUser=async()=>{
  //     const user = JSON.parse(sessionStorage.getItem('user'))
  //     const token = sessionStorage.getItem('token')
  //     const {fname,lname,address,phone} = editUser
  //     const {profilepicture} = picture
  //     if( !fname || !lname || !address ||!phone )
  //     {
  //       alert('please enter the essential data')
  //     }else{
        
  //     if(!token){
  //       alert('not logged in')
  //     }else{
  //       var reqHeader = {
  //         "Content-Type": "multipart/form-data",
  //         "Authorization" : `Bearer ${token}` 
  //       }
  //       const reqBody = new FormData()
  //       reqBody.append('fname',fname)
  //       reqBody.append('lname',lname)
        
  //       reqBody.append('address',address)
  //       reqBody.append('phone',phone)
        
  //        preview?  reqBody.append("profilepicture",profilepicture): reqBody.append("profilepicture",picture.profilepicture)

  //       const result = await editUsers(user?._id,reqBody,reqHeader)
  //       if(result.status == 200){
  //         alert('updated successfully')
  //         sessionStorage.setItem('user',JSON.stringify(result.data))
  //         setShow(false)
  //         setHeader(result)

  //         navigate('/profile')
  //       }else{
  //         alert('error')
  //       }
  //     }
  //   }
      
  // }


    

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
        
      
        {/* <InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={details?.fname}
          placeholder='fname'
          onChange={(e)=>setEditUser({...editUser,fname:e.target.value})}

        /></InputGroup>
        <InputGroup  className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={details?.lname}
          placeholder='lname'
          onChange={(e)=>setEditUser({...editUser,lname:e.target.value})}

        /></InputGroup>


<InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={details?.address}
          placeholder='address'
          onChange={(e)=>setEditUser({...editUser,address:e.target.value})}

        /></InputGroup>

<InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={details?.phone}
          placeholder='phone'
          onChange={(e)=>setEditUser({...editUser,phone:e.target.value})}

        /></InputGroup>

<InputGroup className='mb-3'>
       <label>
          <input type="file"  style={{display:'none'}}  onChange={(e)=>setEditUser({...editUser,profilepicture:e.target.files[0]})}/>
          <img src={preview?preview: `${baseUrl}/uploads/${editUser.profilepicture}`} alt="image" style={{width:"30%"}}/>
       </label>
       </InputGroup> */}

<InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={editUser?.fname}
          placeholder='fname'
          onChange={(e)=>setEditUser({...editUser,fname:e.target.value})}

        /></InputGroup>
        <InputGroup  className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={editUser?.lname}
          placeholder='lname'
          onChange={(e)=>setEditUser({...editUser,lname:e.target.value})}

        /></InputGroup>


<InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={editUser?.address}
          placeholder='address'
          onChange={(e)=>setEditUser({...editUser,address:e.target.value})}

        /></InputGroup>

<InputGroup className='mb-3'>
       <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={editUser?.phone}
          placeholder='phone'
          onChange={(e)=>setEditUser({...editUser,phone:e.target.value})}

        /></InputGroup>

<InputGroup className='mb-3'>
       <label>
          <input type="file"  style={{display:'none'}}  onChange={(e)=>setEditUser({...editUser,profilepicture:e.target.files[0]})}/>
          <img src={preview?preview: `${baseUrl}/uploads/${editUser.profilepicture}`} alt="image" style={{width:"30%"}}/>
       </label>
       </InputGroup>
 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={(e)=>updateUser(e)}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
    </div>
  )
}

export default EditProfile
