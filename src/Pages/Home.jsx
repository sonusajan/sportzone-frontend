import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Carousel, Col, Dropdown, Form, OverlayTrigger,Tooltip } from 'react-bootstrap'
import { addCartAPI, getProduct } from '../Services/appAPI'
import { baseUrl } from '../Services/baseUrl';
import { Link, useNavigate } from 'react-router-dom';


function Home() {

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add to Cart
    </Tooltip>
  );

  const navigate = useNavigate()

  const[products,setProducts]=useState([])
  const[displayProducts,setDisplayProducts]=useState([])
  const[pcount,setpCount] = useState(1)
  const[user,setUser] = useState("")

  useEffect(()=>{
    display()
  },[])
  

    const display=async()=>{
      const result = await getProduct()
      // console.log(result.data);
      setProducts(result?.data)
      setDisplayProducts(result.data)
     }

    const addToCart=async(pid)=>{
      
       const userToken = sessionStorage.getItem('token')
       const users = JSON.parse(sessionStorage.getItem('user'))
       if(pid && pcount){
        const reqBody = new FormData()
        reqBody.append("pid",pid)
        reqBody.append("pcount",pcount)
        console.log(reqBody);
 
        if(userToken){
         var reqHeader = {
           "Content-Type": "application/json",
           "Authorization" : `Bearer ${userToken}`
         }
        
         const result = await addCartAPI(users._id,reqBody,reqHeader)
         if(result.status == 200){
           navigate('/cart')
         }else{
           alert('error')
         }
        //  console.log(result);
 
        }else{
         alert('not logged in')
         navigate('/login')
        }
       }
       
    }

    const categoryItems=(name)=>{
         setProducts(displayProducts.filter(item=>item.pcategory.includes(name))) 
         console.log(products);     
    }




  return (
    <div id='home'>
      <div>
          <Carousel fade>
          <Carousel.Item>
            <img src="https://media.istockphoto.com/id/1442660791/photo/soccer-jerseys.jpg?s=612x612&w=0&k=20&c=3naCqVa1pUqnOcRx_4Y5aYP6LsqV2dr3KmOsNvTuag0=" alt="" style={{width:"100%", height:"600px"}}/>
            <Carousel.Caption style={{marginBottom:"60px"}}>
              <h2 style={{color:"wheat", fontFamily:"bolder"}}>70% Off on Football Kits</h2>
              <p style={{fontFamily:"bolder", fontSize:"20px"}}>Offer at it highest Shop Now !</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://media.gq.com/photos/607725bcd01dd085eed5149c/master/pass/jerseys.jpg=" alt="" style={{width:"100%", height:"600px"}}/>
            <Carousel.Caption style={{marginBottom:"60px"}}>
              <h2 style={{color:"wheat", fontFamily:"bolder"}}>New Arrivals </h2>
              <p style={{fontFamily:"bolder" ,fontSize:"20px"}}>Get Ready to Don the new kits</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://images.herzindagi.info/image/2023/Nov/Sports-Shoes.jpg" alt="" style={{width:"100%", height:"600px"}} />
            <Carousel.Caption style={{marginBottom:"60px"}}>
              <h2 style={{color:"wheat", fontFamily:"bolder"}}>Get Ready to Sprint</h2>
              <p style={{fontFamily:"bolder", fontSize:"20px"}}>
                60% Off on Footwears
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          
           {/* <Carousel.Item>
            <img src="https://i.ytimg.com/vi/p9J0OZ8pEvE/maxresdefault.jpg" alt="" style={{width:"100%", height:"600px" }} />
            <Carousel.Caption style={{marginBottom:"10px"}}>
              <h2 style={{color:"white", fontFamily:"bolder"}}>Live Now!...</h2>
              <p style={{fontFamily:"bolder", fontSize:"20px"}}>
                Shop now
              </p>
            </Carousel.Caption>
          </Carousel.Item>   */}
        </Carousel>
      </div>
      <div>

         <Form.Select aria-label="Category" 
          onChange={(e)=>categoryItems(e.target.value)} style={{width:"20%", fontSize:"100%",marginTop:"10px", border:"none", color:"green", fontWeight:"bolder",position:"relative"}}>
           <img src=" https://dm0qx8t0i9gc9.cloudfront.net/watermarks/image/rDtN98Qoishumwih/abstract-sports-background_f17TaJ1F_SB_PM.jpg" alt="" style={{width:"100%", position:"absolute", height:"300px"}}/>
         <option hidden style={{fontFamily:'fantasy'}}>Choose Your Sport</option>
         <option value="All">All</option>
         <option style={{position:"relative"}}  value="Badminton">Badminton</option>
         <option style={{position:"relative"}}  value="BaseBall">BaseBall</option>
         <option style={{position:"relative"}}  value="BasketBall">BasketBall</option>
         <option style={{position:"relative"}} value="Cricket">Cricket</option>
         <option style={{position:"relative"}}  value="FootBall">FootBall</option>
         <option style={{position:"relative"}} value="Golf">Golf</option>
         <option style={{position:"relative"}}  value="Hockey">Hockey</option>
         <option style={{position:"relative"}}  value="Table Tennis">Table Tennis</option>
         <option style={{position:"relative"}}  value="Tennis">Tennis</option>
         </Form.Select>



                <div style={{width:"100%"}}>
                    <div className='row w-100'>
                        {
                          products.map((item,index)=>
                            
                            <Col lg={3} md={3} sm={12}>
                              <Card style={{margin:"10px" , display:"flex", justifyContent:"center",alignItems:"center"}} key={index} >
                                <Card.Img variant="top" src={item?`${baseUrl}/uploads/${item.pimage}`:'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg'} style={{width:"150px", height:"140px"}}/>
                                <Card.Body>
                                  <Card.Title>{item.pname}</Card.Title>
                                  <Card.Text>
                                    {item.pdescription}
                                  </Card.Text>
                                  <Card.Text>
                                  ₹ {item.pprice}
                                  </Card.Text>
                                 <div className='d-flex '>
                                    <OverlayTrigger
                                     placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                   >
                                    <Button variant="outline" className='bg-primary me-3 ' onClick={()=>addToCart(item._id)}><i class="fa-solid fa-cart-shopping" style={{color: "#FFD43B"}}></i></Button>
                                    </OverlayTrigger>
                                    <Button variant="outline" className='bg-primary '>Buy Now</Button>
                                 </div>
                                </Card.Body>
                              </Card>
                              
                            </Col>
                            )
                          }

                    </div>
                  
                </div>
 
      </div>
    </div>
  )
}

export default Home


