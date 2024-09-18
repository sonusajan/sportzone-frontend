import React, { useEffect, useState } from 'react'
import { Button, Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { displayCartAPI, removefromCartAPI } from '../../Services/appAPI';
import { baseUrl } from '../../Services/baseUrl';

function Cart() {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Remove from Cart
        </Tooltip>
      );

      const [display,setDisplay] = useState([])


     useEffect(()=>{
      displayCart()
     },[])

      const displayCart=async()=>{
          const userToken = sessionStorage.getItem('token')
          const users = JSON.parse(sessionStorage.getItem('user')) 
           const items = await displayCartAPI(users._id)
           setDisplay(items.data.products)
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
      

  return (
    <div id='cart'>
        
        
            
            <h3 style={{position:"relative",textAlign:"center", color:"wheat", fontWeight:"bolder"}}>Mycart</h3>
        <div className='m-5' style={{width:"80%", position:"relative"}}>
            <div className='row w-100'>
            {
               display.length > 0 ?(
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
                    <img src="https://png.pngtree.com/thumb_back/fh260/background/20230613/pngtree-little-shopping-cart-on-a-keyboard-that-could-enhance-your-online-image_2975660.jpg" alt="" style={{position:'absolute', background:"cover",width:"100%",height:"700px"}} />
                  </div>
                 )} 
            </div>
        </div>
        </div>

  )
}

export default Cart
