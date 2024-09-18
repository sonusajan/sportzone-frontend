import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { getProduct } from '../../Services/appAPI';
import { baseUrl } from '../../Services/baseUrl';

function Items() {

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Add to Cart
        </Tooltip>
      );

      const[products,setProducts]=useState([])
      useEffect(()=>{
        display()
      },[])
      
      
        
        const display=async()=>{
          const result = await getProduct()
          console.log(result.data);
          setProducts(result.data)
          
         }
         console.log(products);
         
      
  return (
    <div>
      <div style={{display:"flex",flexDirection:"column" ,justifyContent:"center", alignItems:"center"}}>
            
        <h3 style={{position:"relative",textAlign:"center", color:"wheat", fontWeight:"bolder"}}>Items</h3>
       <div style={{display:"flex", width:"40%"}}>
          <Form.Control
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                  style={{marginRight:"10px"}}
                />
                <Button variant='outline' className='bg-primary'>Search</Button>
       </div>
      </div>
         <div id='items' style={{position:"relative", width:"100%"}}>
         
        <div className='row m-5' style={{width:"80%", position:"relative"}}>
            
                {
                  products.map((item,index)=>
                  <div className='col-3'>
                    <Card style={{ width: '18rem'}} key={index} >
                      <Card.Img variant="top" src={item?`${baseUrl}/uploads/${item.pimage}`:'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg'} style={{width:"100%"}} />
                      <Card.Body>
                        <Card.Title>{item.pname}</Card.Title>
                        <Card.Text>
                          {item.pdescription}
                        </Card.Text>
                        <Card.Text>
                          {item.pprice}
                        </Card.Text>
                       <div className='d-flex '>
                          <OverlayTrigger
                           placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                         >
                          <Button variant="outline" className='bg-primary me-3 '><i class="fa-solid fa-cart-shopping" style={{color: "#FFD43B"}}></i></Button></OverlayTrigger>
                          <Button variant="outline" className='bg-primary '>Buy Now</Button>
                       </div>
                      </Card.Body>
                    </Card>
                    </div>
                    )
                  }
                
        </div>
        </div>
    </div>
  )
}

export default Items
