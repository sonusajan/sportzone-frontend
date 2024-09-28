import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { resetPasswordApi } from '../../Services/appAPI'
import { jwtDecode } from 'jwt-decode'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

function ResetPassword() {
   
   const{token} = useParams()
   const [message,setMessage] = useState('')
   const navigate = useNavigate()

    const [newPass,setNewPass] = useState({
        password:'',
        conpassword:''
    })

    useEffect(()=>{

        const decode = jwtDecode(token)
        const currentTime = Date.now()/1000

        if(decode.exp<currentTime){
            setMessage('Link Expired')
            setTimeout(()=>{
                navigate('/forgetpassword')
            })
        }
    })


    const reset = async()=>{
        const {password,conpassword} = newPass
        if(!password || !conpassword){
            // alert('fill the data')
            toast.warning('fill the data')
        }else{
            const result = await resetPasswordApi(token,password)
            console.log(result);
            
            if(result.status == 200){
                console.log('Password Reset Successfull');
                navigate('/login')
            }else{
                console.log('error');
                
            }
        }
    }

    console.log(newPass);
    
     

  return (
    <div style={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}} className='m-5'>
      
      <div style={{width:'50%',display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center",height:"350px"}}>
          <Form className='w-100 ' style={{ display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
            <h3>Reset Password</h3>
                <Form.Group id='input' className="w-75 mb-3" >           
                  <Form.Control type="password" value={newPass.password} onChange={(e)=>setNewPass({...newPass,password:e.target.value})} className='m-3' placeholder="New Password" />
                  <Form.Control type="password"  className='m-3' value={newPass.conpassword} onChange={(e)=>setNewPass({...newPass,conpassword:e.target.value})} placeholder="Confirm Password" />
                </Form.Group>
                <Button onClick={(e)=>reset(e)}>Reset</Button>
                </Form>
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

export default ResetPassword
