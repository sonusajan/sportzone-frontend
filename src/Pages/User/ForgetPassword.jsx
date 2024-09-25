import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { forgetPasswordApi } from '../../Services/appAPI'

function ForgetPassword() {
    const [data,setData] = useState({
        email :''
    })
    const forgetPass = async()=>{
        const {email} = data
        if(!email){
            alert('please fill the data')
        }
        else{
          const result = await forgetPasswordApi(data)
          if(result.status == 200){
            alert('email sent successfully , Check your Gmail')
          }else{
            alert('user not found')
          }
        }
    }
    console.log(data);
    
  return (
    <div style={{display:"flex", justifyContent:'center',alignItems:'center'}}>
      <div style={{width:"50%", margin:"50px", height:"50vh"}}>
      <Form className='w-100 ' style={{ display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
        <h3 className='m-3'>Forgot Password ?</h3>
        <p className="w-75 mb-5">Enter your Registered Email Id for resetting your password.After submitting check your email for password reset link.Visit this link and reset your password</p>
            <Form.Group id='input' className="w-50 mb-3" >           
              <Form.Control type="email"  placeholder="Enter Mail" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
              </Form.Group>

              <Button onClick={(e)=>forgetPass(e)}>Send</Button>
            
            </Form>
      </div>
    </div>
  )
}

export default ForgetPassword
