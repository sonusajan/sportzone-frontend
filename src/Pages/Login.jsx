import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import React, { useContext, useState } from 'react'
import { Button, Col, Form, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { googleLoginAPI, loginAPI } from '../Services/appAPI';
import { headerContext } from '../context/header';

function Login() {

  const {setHeader} = useContext(headerContext)

   const navigate = useNavigate()
   const [loginDetails,setLoginDetails] = useState({
    email:'',
    password:''
   })

   const [userToken,setUserToken] = useState('')
   const [user,setUser] = useState('')

   const [glogin,setGlogin] = useState([])

   const login=async(e)=>{
    e.preventDefault()
    const{email,password} = loginDetails
    if(!email||!password){
      alert('invalid username or password')
    }else{
      const result = await loginAPI(loginDetails)
      if(result.status==200){
        alert("login successfull")
        setHeader(result)
        sessionStorage.setItem('user',JSON.stringify(result.data.member))
        sessionStorage.setItem('token',result.data.token)
        console.log(result);
        setLoginDetails('')
        if(result.data.member.role==1){
           navigate('/dashboard')
        }else{
            navigate('/')
        }
      }else{
        alert('Invalid username or password')
      }
    }
   }

   const googleSignin=async(credDecode)=>{
       console.log(credDecode);
       
       const id =credDecode.jti
       const fname=credDecode.given_name
       const lname=credDecode.family_name
       const email=credDecode.email
       const profilepicture=credDecode.picture
        console.log(id,fname,lname,email,profilepicture);
        

        if(!id || !fname || !lname || !email){
          alert('unsuccessfull')
        }
        else{
        const result = await googleLoginAPI(credDecode)
        console.log(result);
        
        if(result.status == 200){
          setHeader(result)
          sessionStorage.setItem('user',JSON.stringify(result.data.user))
          setUserToken(sessionStorage.setItem('token',result.data.token))
          navigate('/')
          console.log(glogin);
        }else{
          alert('error')
        }
      }

   }

  return (
    <div id='logings' >
       <div id='login' style={{position:"relative",height:"700px"}}>
        <img src="https://slidechef.net/wp-content/uploads/2023/11/Simple-Sports-Background.jpg" alt=""  style={{position:'absolute', background:"cover",width:"100%",height:"700px"}}/>
          
     <div style={{width:"40%" ,display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center", border:"1px", boxShadow:"2px 2px 2px 2px black", position:"relative"}}>
        <h2 style={{color:"white"}}>Login</h2>
     <Form  className='w-75' style={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}} >
      <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
        <Form.Label style={{color:"white" , fontWeight:"bolder"}}>Username</Form.Label>
        <Form.Control type="text" value={loginDetails.email} placeholder="Enter Username"  onChange={(e)=>setLoginDetails({...loginDetails,email:e.target.value})}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{color:"white" ,  fontWeight:"bolder"}}>Password</Form.Label>
        <Form.Control type="password" value={loginDetails.password} placeholder="Password" onChange={(e)=>setLoginDetails({...loginDetails,password:e.target.value})}/>
      </Form.Group>
       
     
        <Button variant="primary" type="submit" onClick={(e)=>login(e)}>
          Login
        </Button>
     <br/>
      
      <FormGroup className='mb-3'><FormLabel><Link to={'/forgetpassword'}><a href="#" style={{color:"white" ,fontWeight:"bolder"}} >Forgot Password?</a></Link><br /></FormLabel></FormGroup>
      
         {/* <div id='sign' style={{width:"100%", display:'flex', justifyContent:"center",alignItems:"center", height:"100px"}}> */}
            <GoogleLogin 
            
              onSuccess={credentialResponse => {
               const credDecode = jwtDecode(credentialResponse?.credential)
              
               console.log(credDecode.name)
              
               googleSignin(credDecode)
             }}
             onError={() => {
              console.log('Login Failed');
             }} 
             
            />;
         {/* </div> */}
      
      <h6 style={{marginBottom:"30px",color:"white" }}>Don't have an account? <Link to={'/register'}><a href='#' style={{color:"white" ,  fontWeight:"bolder"}}> Create Account </a></Link></h6>
    </Form>
    </div>
    </div>
    </div>
  )
}

export default Login
