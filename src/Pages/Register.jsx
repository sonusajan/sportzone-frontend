import React, { useState } from 'react'
import { Button, FloatingLabel, Form, FormGroup, FormLabel, InputGroup, Modal } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { otpResend, registerAPI, verifyEmail } from '../Services/appAPI'
import Resend from './User/Resend'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [expired,setExpired] = useState('')
  const [buttons,setButtons] = useState('')

  const [details,setDetails] = useState({
    fname:'',
    lname:'',
    email:'',
    phone:'',
    address:'',
    password:''

  })
 
  const [otpverify,setotpVerify] = useState({
    email:'',
    otp:''
  }) 


  

  // console.log(details);
  

  // const validation=(e)=>{
  //   const{name,value} = e.target 
  //   if(name == "name"){
  //     if(!value.match(/^[A-z\s\.]+$/)){
  //       setName(value)
  //       setisNamevalid(false)
  //     }else{
  //       setName(value)
  //       setisNamevalid(true)
  //     }
  //   }else if(name == 'email'){
  //     if(!value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)){
  //       setEmail(value)
  //       setisEmailvalid(false)
  //     }else{
  //       setEmail(value)
  //       setisEmailvalid(true)
  //     }
  //   }else if(name == 'phone'){
  //     if(!value.match(/^[0-9]{10}$/)){
  //       setPhone(value)
  //       setisPhonevalid(false)
  //     }else{
  //       setPhone(value)
  //       setisPhonevalid(true)
  //     }
  //   }
  //   else if(name == 'password'){
  //     if(!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&amp;^])[A-Za-z\d@.#$!%*?&amp;]{8,15}$/)){
  //       setPassword(value)
  //       setisPasswordvalid(false)
  //     }else{
  //       setPassword(value)
  //       setisPasswordvalid(true)
  //     }
  //   }else if(name == 'address'){
  //     if(!value.match(/^[A-z\s\.0-9]+$/)){
  //       setAddress(value)
  //       setisAddressvalid(false)
  //     }else{
  //       setAddress(value)
  //       setisAddressvalid(true)
  //     }
  //   }else{
  //     alert("please complete the form ")
  //   }
  // }

  //placePattern=/^[A-z\s\.]+$/

  const display= async(e)=>{
    e.preventDefault()
    const {fname,lname,email,phone,address,password} = details
    if(!fname || !lname || !email || !phone || !address || !password){
      toast.warning("please fill the form");
    }
   else{
    const result = await registerAPI(details)
    console.log(result);
   
    if(result.status==200){
      alert("Registration Successful")
      setExpired(result.otpExpires)
      handleShow()
    }else{
      if(result.status==406)
      {
        alert("User already exist")
      }else{
      console.log(result);
      }
    }
   }
  }

 
  

  const otpVerification = async(e)=>{
    const {email,otp}  = otpverify
    if(!email || !otp){
      alert('please enter the data')
    }else{
        const result = await verifyEmail(otpverify)
        
        if(result.status == 200){
        
          alert('email verification successfully completed')
          handleClose()
          navigate('/login')
        }else{
          alert('otp mismatch')
        }
    }
  }
 
  




  return (
    <div id='logings' >

    <div id='register' style={{background:"grey", opacity:"0.8"}}>
         
      <div id='reg' style={{width:"50%" ,display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center", boxShadow:"2px 2px 2px 2px ", position:"relative", }}>
        <h3 style={{color:"black"}}>Register</h3>
         
            <Form className='w-100 ' style={{ display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
            <Form.Group id='input' className="w-75 mb-2" >
              <Form.Label style={{color:"black" , fontSize:"17px", fontWeight:""}}>Firstname</Form.Label>
              <Form.Control type="text" value={details.fname} name='fname' placeholder="Enter Firstname" onChange={(e)=>setDetails({...details,fname:e.target.value})}/>
          
            </Form.Group>
            <Form.Group id='input' className="w-75 mb-2" >
              <Form.Label style={{color:"black" , fontSize:"17px", fontWeight:""}}>Lastname</Form.Label>
              <Form.Control type="text" value={details.lname} name='lname' placeholder="Enter Lastname" onChange={(e)=>setDetails({...details,lname:e.target.value})}/>
           
            </Form.Group>
            <Form.Group id='input' className="w-75 mb-2">
              <Form.Label style={{color:"black" , fontSize:"17px", fontWeight:""}}>Email address</Form.Label>
              <Form.Control type="email" value={details.email} name='email' placeholder="Enter email" onChange={(e)=>setDetails({...details,email:e.target.value})}/>
          
            </Form.Group>
              
            <Form.Group id='input' className="w-75 mb-2">
              <Form.Label style={{color:"black" , fontSize:"17px", fontWeight:""}}>Phone Number</Form.Label>
              <Form.Control type="text" value={details.phone} name='phone' placeholder="Enter phone no." onChange={(e)=>setDetails({...details,phone:e.target.value})}/>
            </Form.Group>
            
            <Form.Group id='input' className="w-75 mb-2" >
            <FloatingLabel controlId="floatingTextarea2" style={{color:"black" , fontSize:"17px", fontWeight:""}}>Address</FloatingLabel>
        
       
          <Form.Control
            as="textarea"
            placeholder="Address"
            style={{ height: '60px' }}
            name='address'
            value={details.address}
            onChange={(e)=>setDetails({...details,address:e.target.value})}
          />
        
          
            </Form.Group>
  
      
       
            <Form.Group id='input' className="w-75 mb-2" controlId="formBasicPassword">
              <Form.Label style={{color:"black" , fontSize:"17px", fontWeight:""}}>Password</Form.Label>
              <Form.Control type="password" name='password' placeholder="Password" value={details.password} onChange={(e)=>setDetails({...details,password:e.target.value})} />
           
            </Form.Group>
            
            
        
              
              
                  <Button variant="primary" type="submit" className="mb-3"  onClick={(e)=>display(e)}>
                   Register
                  </Button>
                  
               <>
               <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Email verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup >
        <Form.Control
        className='mb-3'
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='Email'
          value={otpverify.email}
          onChange={(e)=>setotpVerify({...otpverify,email:e.target.value})}
        />
        <InputGroup >
        <Form.Control
          className='mb-3'
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder='OTP'
          value={otpverify.otp}
          onChange={(e)=>setotpVerify({...otpverify,otp:e.target.value})}
        />
        </InputGroup>
         <Button variant="primary" type="submit" className="mb-3"  onClick={(e)=>otpVerification(e)}>
                   Verify
                  </Button>
                
      </InputGroup>
                 <Resend/>
     
      </Modal.Body>
      </Modal>
      
               </>
              
            
            <h6 style={{color:"black", fontFamily:"bold", marginBottom:"20px"}}>Already have an account? <Link to={'/login'}><a href='#' style={{color:"blue" , fontSize:"15px", fontWeight:"bolder"}}> Login </a></Link></h6>
          </Form>
          
      </div>
    </div>
    <ToastContainer position="top-center" autoClose={5000}
                 hideProgressBar={false}           
                 newestOnTop={false}
                 closeOnClick
                 rtl={false}
                pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="light"
               />
    </div>
  )
}

export default Register
