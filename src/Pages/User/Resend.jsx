import React, { useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { otpResend } from '../../Services/appAPI';
import { toast, ToastContainer } from 'react-toastify';

function Resend() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    
    const [otpMail,setOtpMail] = useState({
        email:''
      })

      const resendOtp = async()=>{
        const {email} = otpMail
        if(!email){
        //   alert('please enter email')
        toast('please enter email')
        }else{
         
          const result = await otpResend(otpMail) 
          console.log(result);
           
          if(result.status==200){

            alert('otp resend successfull')
            handleClose()
          }else{
            // alert('OTP already sent check your mail')
            toast('OTP already sent check your mail')
          }  
        }
      }


  return (
    <div>
      
      <>
          <Button id='Button' variant="primary" type="submit" className="mb-3" onClick={handleShow} > Resend </Button>
        
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
          value={otpMail.email}
          onChange={(e)=>setOtpMail({...otpMail,email:e.target.value})}
        />
         <Button variant="primary" type="submit" className="mb-3" onClick={(e)=>resendOtp(e)}> submit </Button>
        
        </InputGroup>
    
      </Modal.Body>
      </Modal>
      </>
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

export default Resend
