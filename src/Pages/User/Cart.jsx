import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Modal, ModalBody, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { clearCartApi, displayCartAPI, order, removefromCartAPI } from '../../Services/appAPI';
import { baseUrl } from '../../Services/baseUrl';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Cart() {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Remove from Cart
        </Tooltip>
      );
      const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);
     const [show, setShow] = useState(false);
     const[ResponseId,setResponseId]= useState("")
      const [display,setDisplay] = useState([])


     useEffect(()=>{
      displayCart()
     },[display])

     const[sum,setSum] = useState(0)

     const totalSum=()=>{
     if(display?.length>0)
      {
       var total = display.map(n=>Number(n.pid.pprice))
       setSum(total.reduce((n1,n2)=>n1+n2))
       console.log(total);
     }
     }

     useEffect(()=>{
     totalSum()
     },[display])
       
      const displayCart=async()=>{
          const userToken = sessionStorage.getItem('token')
          const users = JSON.parse(sessionStorage.getItem('user')) 
           const items = await displayCartAPI(users._id)
           setDisplay(items?.data?.products)
      }
      console.log(display);

      const cartDelete=async(pid)=>{
        const userToken = sessionStorage.getItem('token')
        const users = JSON.parse(sessionStorage.getItem('user'))
        if(userToken){
          var reqHeader = {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${userToken}`
          }
         
          
          const remove = await removefromCartAPI(users._id,pid,reqHeader)
          if(remove.status == 200){
        
          alert('item deleted')
          displayCart()
          }else{
            alert('error')
          }
          console.log(remove);
          
        }else{
          alert('not logged in')
        }
        
      }


      const clear=async()=>{
        const uid = JSON.parse(sessionStorage.getItem('user'))
        const token = sessionStorage.getItem('token')
        console.log(uid);
        
        if(token)
        {
          var  reqHeader={
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
          }
            const result=  await clearCartApi(uid._id,reqHeader)
            console.log(result);
          if(result.status==200)
          {
            alert('success')
            displayCart()
          }
          else{
            alert("Error")
          }
           
        }
      }
      
       
      const loadScript=(src)=>{
        return new Promise((resolve)=>{
      const script= document.createElement("script")
      script.src = src
      
      script.onload=()=>{
      resolve(true)
      }
      
      script.onerror=()=>{
      resolve(false)
      }
      document.body.appendChild(script);
        })
      }
      
      const razorPayOrder=(amount)=>{
      let data = {
      amount:amount*100,
      currency:"INR"
      }
      
      
      let config={
      method: "post",
      maxBodyLength:Infinity,
      url:" http://localhost:4000/orders",
      header:{
      'Content-Type':'application/json',
      },
      data:data
      }
      
      
      axios.request(config)
      .then((response)=>{console.log(JSON.stringify(response.data));
      handleRazorPayScreen(response.data.amount)
      })
      .catch((error)=>
      {
      console.log('error',error);
      
      })
      }
      
      const handleRazorPayScreen=async(amount)=>{
        const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js")
      
      if(!res)
      {
      alert("Some error at razorpay loading")
      return;
      }
      
      const options={
      key:'rzp_test_YWob3NoKy2p5h6',
      amount:amount,
      currency:'INR',
      
      handler:function(response)
      {
      placeOrder(response.razorpay_payment_id)
      },
      
      theme:{
      color:"#F4C430"
      }
      }
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
      
      }
      console.log(ResponseId);
      
      
      const placeOrder=async(id)=>{  
         const uid = JSON.parse(sessionStorage.getItem('user'))
         const token = sessionStorage.getItem('token')
         
      if(id){
        if(token){
        var  reqHeader={
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
          }
          console.log(token);
          
      
      
          const reqBody = {
          paymentId : id,
          products : display,
          amount : sum
          }
      
        const result = await order(uid._id,reqBody,reqHeader)
      
        if(result.status==200)
        {
          alert("success")
          handleClose()
          clear()
         console.log(result);
         
        }
        else{
          alert("error")
        }
      }
      }
      }
      
    


      

  return (
    <div id='cart'>
        
        
     <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <ModalBody>Total:{sum}</ModalBody>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>razorPayOrder(sum)} >Place Order</Button>
        </Modal.Footer>
      </Modal>
            
            <h3 style={{position:"relative",textAlign:"center", color:"wheat", fontWeight:"bolder"}}>Mycart</h3>
        <div className='m-5' style={{width:"80%", position:"relative"}}>
            <div className='row w-100'>
            {
               display?.length > 0 ?(
                display.map((item,index)=>
                  <Col lg={3} md={3} sm={12}>
               
                    <Card style={{margin:"10px" , display:"flex", justifyContent:"center",alignItems:"center"}} key={index}>
                    <Card.Img variant="top" src={item?`${baseUrl}/uploads/${item.pid.pimage}`:'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg'} style={{width:"150px", height:"140px"}}/>
                      <Card.Body>
                        <Card.Title>{item.pid.pname}</Card.Title>
                        <Card.Text>
                          {item.pid.pdescription}
                        </Card.Text>
                        <Card.Text>
                          {item.pid.pprice}
                        </Card.Text>
                        <OverlayTrigger
                         placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                       >
                        <Button variant="outline" className='bg-primary ' onClick={()=>cartDelete(item?.pid._id)}><i class="fa-solid fa-trash" style={{color: "#FFD43B"}}></i></Button>
                        </OverlayTrigger>
                      </Card.Body>
                      
                    </Card>
                </Col>
                 )):
                 (
                  <div id='items' style={{position:"relative",height:"700px", width:"100%"}}>
                    {/* <img src="https://png.pngtree.com/thumb_back/fh260/background/20230613/pngtree-little-shopping-cart-on-a-keyboard-that-could-enhance-your-online-image_2975660.jpg" alt="" style={{position:'absolute', background:"cover",width:"100%",height:"700px"}} />
                     */}
                     <h2 style={{color:"grey", fontWeight:'bolder'}}>Cart Empty</h2>
                  </div>
                 )} 
                
             { display.length>0 ?
             
             (<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
  
              <Button  style={{margin:'20px'}} variant="primary" onClick={handleShow}>makepayment</Button>
  
              <Link to={'/userorders'}><Button>Order Details</Button></Link>
                </div> ):''
                } 
            </div>
        </div>
        </div>

  )
}

export default Cart
