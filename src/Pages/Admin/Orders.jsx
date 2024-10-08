import React, { useEffect, useState } from 'react'
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap'
import { getOrderApi } from '../../Services/appAPI'
import { baseUrl } from '../../Services/baseUrl'

function Orders() {
  
     const [orders,setOrders] = useState([])

   useEffect(()=>{
      display()
   },[])

     const display=async()=>{
      const token = sessionStorage.getItem('token')
      if(token){
      const result = await getOrderApi()
      if(result.status == 200){
        setOrders(result.data)
        console.log(result);
        
      }else{
        alert('no orders')
      }
    }else{
      alert('error')
    }
     }
     console.log(orders);
     


  return (
    <div id='orderdetails'>
        <h3 style={{fontWeight:"bolder", margin:"10px"}}>Order Details</h3>
      <div style={{width:"90%", margin:"20px"}}>
           <Table variant='dark' className='bg-primary' responsive="sm" border={'bool'} hover>
            <thead>
              <tr>
              
                <th>User Id</th>
                <th>Payment Id</th> 
                <th>Product Name</th>   
                <th>Image</th>
                <th>Price</th>
                
              </tr>
            </thead>
            <tbody>
              { orders ?
                orders.map((item,index)=>(
                item.order.map((items)=>(
              <tr key={index}>
                <td>{item.userId}</td>
                <td>{item.paymentId}</td>
                <td>{items.pid.pname}</td>
                <td style={{width:"30%"}}><img src={items?`${baseUrl}/uploads/${items.pid.pimage}`:'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg'} alt="" style={{width:"30%"}}/></td>

                <td>{items.pid.pprice}</td>
            
                </tr>
                ))
              )):""
            }
              
              </tbody>
              </Table>
      </div>
    </div>
  )
}

export default Orders
