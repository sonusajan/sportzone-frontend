import React, { useState } from 'react'
import { Button, FloatingLabel, Form, FormGroup, FormLabel } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI } from '../Services/appAPI'

function Register() {
  const navigate = useNavigate()

  const [details,setDetails] = useState({
    fname:'',
    lname:'',
    email:'',
    phone:'',
    address:'',
    password:''

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
      alert('please fill the form')
    }
   else{
    const result = await registerAPI(details)
    if(result.status==200){
      alert("Registration Successful")
      navigate('/login')
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



  return (
    <div id='logings' >

    <div id='register' style={{position:"relative",height:"650px"}}>
         <img src="https://slidechef.net/wp-content/uploads/2023/11/Simple-Sports-Background.jpg" alt=""  style={{position:'absolute', background:"cover",width:"100%",height:"700px"}}/>
      <div id='reg' style={{width:"50%" ,display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center", border:"1px", boxShadow:"2px 2px 2px 2px black", position:"relative"}}>
        <h3 style={{color:"white"}}>Register</h3>
         
            <Form className='w-100 ' style={{ display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
            <Form.Group id='input' className="w-75 mb-3" >
              <Form.Label style={{color:"white" , fontSize:"17px", fontWeight:""}}>Firstname</Form.Label>
              <Form.Control type="text" value={details.fname} name='fname' placeholder="Enter Firstname" onChange={(e)=>setDetails({...details,fname:e.target.value})}/>
          
            </Form.Group>
            <Form.Group id='input' className="w-75 mb-3" >
              <Form.Label style={{color:"white" , fontSize:"17px", fontWeight:""}}>Lastname</Form.Label>
              <Form.Control type="text" value={details.lname} name='lname' placeholder="Enter Lastname" onChange={(e)=>setDetails({...details,lname:e.target.value})}/>
           
            </Form.Group>
            <Form.Group id='input' className="w-75 mb-3">
              <Form.Label style={{color:"white" , fontSize:"17px", fontWeight:""}}>Email address</Form.Label>
              <Form.Control type="email" value={details.email} name='email' placeholder="Enter email" onChange={(e)=>setDetails({...details,email:e.target.value})}/>
          
            </Form.Group>
              
            <Form.Group id='input' className="w-75 mb-3">
              <Form.Label style={{color:"white" , fontSize:"17px", fontWeight:""}}>Phone Number</Form.Label>
              <Form.Control type="text" value={details.phone} name='phone' placeholder="Enter phone no." onChange={(e)=>setDetails({...details,phone:e.target.value})}/>
            </Form.Group>
            
            <Form.Group id='input' className="w-75 mb-3" >
            <FloatingLabel controlId="floatingTextarea2" style={{color:"white" , fontSize:"17px", fontWeight:""}}>Address</FloatingLabel>
        
       
          <Form.Control
            as="textarea"
            placeholder="Address"
            style={{ height: '60px' }}
            name='address'
            value={details.address}
            onChange={(e)=>setDetails({...details,address:e.target.value})}
          />
        
          
            </Form.Group>
  
      
       
            <Form.Group id='input' className="w-75 mb-3" controlId="formBasicPassword">
              <Form.Label style={{color:"white" , fontSize:"17px", fontWeight:""}}>Password</Form.Label>
              <Form.Control type="password" name='password' placeholder="Password" value={details.password} onChange={(e)=>setDetails({...details,password:e.target.value})} />
           
            </Form.Group>
            
            
        
              
              
                  <Button variant="primary" type="submit" className="mb-3"  onClick={(e)=>display(e)}>
                   Register
                  </Button>
               
              
            
            <h6 style={{color:"white", fontFamily:"bold", marginBottom:"20px"}}>Already have an account? <Link to={'/login'}><a href='#' style={{color:"white" , fontSize:"15px", fontWeight:"bolder"}}> Login </a></Link></h6>
          </Form>
          
      </div>
    </div>
    </div>
  )
}

export default Register
